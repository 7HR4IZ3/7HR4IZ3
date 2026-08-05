"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CartographyPoster } from "@/components/cartography-poster";
import type { ScrollSignal } from "@/components/scroll-signal";

const SignalCartography = dynamic(
  () => import("@/components/signal-cartography").then((module) => module.SignalCartography),
  { ssr: false, loading: () => <CartographyPoster /> },
);

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch { return false; }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

class NativeScrollSignal implements ScrollSignal {
  #value = 0;
  get = () => this.#value;
  set(value: number) { this.#value = value; }
}

const chapterLabels = ["INIT", "SPAWN", "KAIZEN CODE", "SNAPSHOT", "VRMAC", "MOTION CUES", "OPENCODE ANNOTATE", "STACKJET", "MERGE"] as const;

export function MachineStage() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [active, setActive] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [progress] = useState(() => new NativeScrollSignal());
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setWebgl(supportsWebGL()));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-workbench-chapter]"));
    const syncChapter = () => {
      const focusLine = window.innerHeight * 0.48;
      const visible = elements
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return { element, rect, distance: Math.abs(rect.top + rect.height / 2 - focusLine) };
        })
        .filter(({ rect }) => rect.bottom > 0 && rect.top < window.innerHeight)
        .sort((a, b) => a.distance - b.distance)[0];
      if (!visible) return;
      const current = Number(visible.element.dataset.workbenchChapter ?? 0);
      progress.set(current / 9);
      setChapter((previous) => previous === current ? previous : current);
    };
    const observer = new IntersectionObserver(syncChapter, { threshold: [0, 0.15, 0.5, 1] });
    elements.forEach((element) => observer.observe(element));
    let scrollFrame = 0;
    const onScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(syncChapter);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    syncChapter();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(scrollFrame);
    };
  }, [progress]);

  useEffect(() => {
    if (reducedMotion) return;
    const activate = () => setActive(true);
    const activationFrame = requestAnimationFrame(activate);
    return () => {
      cancelAnimationFrame(activationFrame);
    };
  }, [reducedMotion]);

  return (
    <div className="machine-stage" data-webgl={webgl ? "ready" : "fallback"} data-renderer={webgl && active ? "webgl" : "poster"} data-chapter={chapter} data-project={chapter >= 2 && chapter <= 7 ? chapterLabels[chapter] : undefined}>
      {webgl && active ? <SignalCartography progress={progress} /> : <CartographyPoster />}
      <div className="machine-stage__shade" aria-hidden="true" />
      <div className="machine-stage__readout" aria-hidden="true">
        <span>{chapterLabels[chapter]} / {chapter >= 2 && chapter <= 7 ? "SIGNAL RESOLVED" : "SIGNAL CARTOGRAPHY"}</span>
        <span>DRAG TO INSPECT</span>
      </div>
    </div>
  );
}
