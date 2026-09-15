"use client";

import { useEffect, useRef, useState } from "react";
import { featuredProjects } from "@/content/projects";
import { ContactCard } from "@/components/contact-card";
import { DeskPlate } from "@/components/desk-plate";

const placements: Array<{
  left: string;
  top: string;
  rotation: string;
  bottom?: string;
  right?: string;
  size: "lg" | "md" | "sm";
  tape: "top" | "corner" | "double";
}> = [
  { left: "6%", top: "20%", rotation: "-7deg", size: "lg", tape: "double" },
  { left: "auto", top: "14%", rotation: "4deg", right: "9%", size: "md", tape: "top" },
  { left: "30%", top: "auto", rotation: "-2deg", bottom: "14%", size: "lg", tape: "corner" },
  { left: "auto", top: "auto", rotation: "5.5deg", right: "6%", bottom: "22%", size: "md", tape: "top" },
  { left: "2%", top: "auto", rotation: "-5deg", bottom: "32%", size: "sm", tape: "corner" },
  { left: "auto", top: "38%", rotation: "-8deg", right: "2%", size: "sm", tape: "double" },
];

const metaFor = (p: (typeof featuredProjects)[number]) => `${p.status} · ${p.year}`;

export function DeskField() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef({ active: false, startX: 0, startY: 0, originX: 0, originY: 0 });
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(m.matches);
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);

  // keyboard pan — only when desk viewport is focused
  useEffect(() => {
    if (reduced) return;
    const onKey = (e: KeyboardEvent) => {
      if (!e.key.startsWith("Arrow")) return;
      if (document.activeElement !== viewportRef.current) return;
      e.preventDefault();
      const step = 28;
      setOffset((o) => {
        let nx = o.x;
        let ny = o.y;
        if (e.key === "ArrowLeft") nx += step;
        if (e.key === "ArrowRight") nx -= step;
        if (e.key === "ArrowUp") ny += step;
        if (e.key === "ArrowDown") ny -= step;
        return { x: Math.max(-120, Math.min(120, nx)), y: Math.max(-90, Math.min(90, ny)) };
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reduced]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (reduced) return;
    drag.current.active = true;
    drag.current.startX = e.clientX;
    drag.current.startY = e.clientY;
    drag.current.originX = offset.x;
    drag.current.originY = offset.y;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active || reduced) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    if (Math.hypot(dx, dy) < 8) return;
    setOffset({
      x: Math.max(-120, Math.min(120, drag.current.originX + dx * 0.55)),
      y: Math.max(-90, Math.min(90, drag.current.originY + dy * 0.55)),
    });
  };
  const onPointerUp = (e: React.PointerEvent) => {
    drag.current.active = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <section className="desk-field" aria-label="Desk">
      <div className="desk-field__label" aria-hidden="true">
        <span>THRAIZE — personal space</span>
        <span>six systems · one practice</span>
      </div>

      <div
        ref={viewportRef}
        className="desk-field__viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        aria-label="Draggable desk — drag to pan, arrow keys to nudge"
        aria-describedby="desk-hint"
        tabIndex={0}
      >
        <div
          className="desk-field__world"
          style={reduced ? undefined : { transform: `translate(${offset.x}px, ${offset.y}px)` }}
        >
          <div className="desk-field__paper" aria-hidden="true" />

          <div className="desk-hero-sheet" style={{ left: "7%", top: "9%", transform: "rotate(-2deg)" }} aria-label="Intro">
            <span className="desk-hero-sheet__tape" aria-hidden="true" />
            <span className="desk-hero-sheet__stamp">THRAIZE 7HR4IZ3 — since 2023</span>
            <h1>
              I build software for ideas that do not fit a template.
            </h1>
            <p>
              Mobile AI workspaces, parallel agents, spatial, native, chess, and bridges — all on one desk.{" "}
              <span className="crossed">polished for strangers</span> inhabited for you.
            </p>
            <span className="desk-hero-sheet__hand">→ drag the desk, open a folder ↗</span>
          </div>

          {/* strings — thumbtacked thread hero to plates */}
          <svg className="desk-strings" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="15" y1="15" x2="14" y2="26" />
            <line x1="16" y1="14" x2="74" y2="22" />
            <line x1="42" y1="78" x2="74" y2="64" />
            <line x1="12" y1="56" x2="32" y2="60" />
            <circle cx="15" cy="15" r="0.9" fill="#8e2b11" />
            <circle cx="14" cy="26" r="0.7" fill="#1b1b17" />
            <circle cx="74" cy="22" r="0.7" fill="#1b1b17" />
            <circle cx="42" cy="78" r="0.7" fill="#1b1b17" />
            <circle cx="74" cy="64" r="0.7" fill="#1b1b17" />
          </svg>

          {/* lamp shadow + coffee ring */}
          <div className="desk-lamp" aria-hidden="true" />
          <div className="desk-coffee" aria-hidden="true" />

          {/* sticky notes — hand */}
          <div className="sticky-note sticky-note--1" style={{ left: "16%", top: "48%", transform: "rotate(-3deg)" }}>
            <span>4th year · UNIBEN</span>
            <strong>Materials &amp; Metallurgy</strong>
            <p>systems → maths → docs</p>
          </div>
          <div className="sticky-note sticky-note--2" style={{ right: "22%", top: "10%", transform: "rotate(2deg)" }}>
            <span>7HR4IZ3</span>
            <strong>chess daily</strong>
            <p>AntiChess: same pos, different brain</p>
          </div>
          <div className="sticky-note sticky-note--3" style={{ left: "52%", top: "8%", transform: "rotate(-1.5deg)" }}>
            <span>M1 Air · 8GB · Silver</span>
            <strong>ship it recoverable &gt; fast</strong>
            <p className="crossed">fast &gt;&gt; recoverable</p>
          </div>
          <div className="sticky-note sticky-note--4" style={{ left: "48%", bottom: "42%", transform: "rotate(1deg)" }}>
            <span>iPhone 11 · S21 Ultra</span>
            <strong>phones get bench time</strong>
            <p>local-first · offline-first</p>
          </div>

          {featuredProjects.map((project, i) => {
            const place = placements[i % placements.length];
            const style: React.CSSProperties = {
              left: place.left,
              right: place.right,
              top: place.top,
              bottom: place.bottom,
            };
            const media = project.media!;
            return (
              <DeskPlate
                key={project.slug}
                href={`/#work/${project.slug}`}
                index={project.index}
                title={project.title}
                premise={project.premise}
                meta={metaFor(project)}
                image={{ src: media.src, alt: media.alt }}
                rotation={place.rotation}
                style={style}
                size={place.size}
                tape={place.tape}
              />
            );
          })}

          <ContactCard style={{ right: "16%", bottom: "6%", transform: "rotate(-1.2deg)" }} />
        </div>
      </div>

      <div id="desk-hint" className="desk-field__hint" aria-hidden="true">
        <span>draggable</span>
        <span>arrow keys</span>
        <span>six systems</span>
      </div>
    </section>
  );
}
