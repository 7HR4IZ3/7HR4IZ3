"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MachinePoster } from "@/components/machine-poster";
import type { ScrollSignal } from "@/components/scroll-signal";

const AgentWorkbench = dynamic(
  () => import("@/components/boundary-machine").then((module) => module.AgentWorkbench),
  { ssr: false, loading: () => <MachinePoster /> },
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
    let frame = 0;
    let markers: { chapter: number; top: number }[] = [];

    const measure = () => {
      markers = Array.from(document.querySelectorAll<HTMLElement>("[data-workbench-chapter]"))
        .map((element) => ({
          chapter: Number(element.dataset.workbenchChapter),
          top: element.getBoundingClientRect().top + window.scrollY,
        }))
        .sort((a, b) => a.top - b.top);
    };

    const sync = () => {
      frame = 0;
      if (!markers.length) measure();
      const cursor = window.scrollY + window.innerHeight * 0.52;
      let markerIndex = 0;
      for (let index = 1; index < markers.length; index += 1) {
        if (cursor < markers[index].top) break;
        markerIndex = index;
      }
      const current = markers[markerIndex];
      const next = markers[markerIndex + 1];
      if (!current) return;
      const span = next ? Math.max(1, next.top - current.top) : window.innerHeight;
      const localProgress = Math.min(0.999, Math.max(0, (cursor - current.top) / span));
      progress.set((current.chapter + localProgress) / 9);
      setChapter((previous) => previous === current.chapter ? previous : current.chapter);
    };

    const update = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    const remeasure = () => {
      measure();
      update();
    };

    remeasure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", remeasure, { passive: true });
    window.addEventListener("load", remeasure, { once: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", remeasure);
    };
  }, [progress]);

  useEffect(() => {
    if (reducedMotion) return;
    const activate = () => setActive(true);
    const activationFrame = window.location.hash.startsWith("#project-") ? requestAnimationFrame(activate) : 0;
    const events = ["scroll", "wheel", "pointerdown", "pointermove", "touchstart", "keydown"] as const;
    events.forEach((event) => window.addEventListener(event, activate, { passive: true, once: true }));
    return () => {
      if (activationFrame) cancelAnimationFrame(activationFrame);
      events.forEach((event) => window.removeEventListener(event, activate));
    };
  }, [reducedMotion]);

  return (
    <div className="machine-stage" data-webgl={webgl ? "ready" : "fallback"} data-renderer={webgl && active ? "webgl" : "poster"} data-chapter={chapter} data-project={chapter >= 2 && chapter <= 7 ? chapterLabels[chapter] : undefined}>
      {webgl && active ? <AgentWorkbench progress={progress} /> : <MachinePoster />}
      <div className="machine-stage__shade" aria-hidden="true" />
      <div className="machine-stage__readout" aria-hidden="true">
        <span>{chapterLabels[chapter]} / {chapter >= 2 && chapter <= 7 ? "EVIDENCE LOCKED" : "AGENT WORKBENCH"}</span>
        <span>SCROLL TO LOAD PROJECT · DRAG TO INSPECT</span>
      </div>
    </div>
  );
}
