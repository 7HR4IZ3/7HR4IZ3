"use client";

import { useEffect, useRef, useState } from "react";
import { featuredProjects } from "@/content/projects";
import { ContactCard } from "@/components/contact-card";
import { DeskPlate } from "@/components/desk-plate";

const placements: Array<{ left: string; top: string; rotation: string; bottom?: string; right?: string }> = [
  { left: "8%", top: "18%", rotation: "-6deg" },
  { left: "auto", top: "16%", rotation: "5deg", right: "10%" },
  { left: "28%", top: "auto", rotation: "3deg", bottom: "16%" },
  { left: "auto", top: "auto", rotation: "-5deg", right: "8%", bottom: "20%" },
  { left: "3%", top: "auto", rotation: "7deg", bottom: "30%" },
  { left: "auto", top: "40%", rotation: "-7deg", right: "3%" },
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

  // keyboard pan
  useEffect(() => {
    if (reduced) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key.startsWith("Arrow")) {
        e.preventDefault();
        const step = 20;
        setOffset((o) => {
          let nx = o.x;
          let ny = o.y;
          if (e.key === "ArrowLeft") nx += step;
          if (e.key === "ArrowRight") nx -= step;
          if (e.key === "ArrowUp") ny += step;
          if (e.key === "ArrowDown") ny -= step;
          return { x: Math.max(-80, Math.min(80, nx)), y: Math.max(-60, Math.min(60, ny)) };
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reduced]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (reduced || window.innerWidth <= 680) return;
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
    setOffset({
      x: Math.max(-80, Math.min(80, drag.current.originX + dx * 0.35)),
      y: Math.max(-60, Math.min(60, drag.current.originY + dy * 0.35)),
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
      <div className="desk-field__title">
        <h1>
          I build software for ideas that do not fit a template.
        </h1>
        <p>Mobile AI workspaces, parallel agents, spatial, native, chess, and bridges — all on one desk.</p>
      </div>

      <div
        ref={viewportRef}
        className="desk-field__viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        role="application"
        aria-label="Draggable desk — drag to pan, arrow keys to nudge"
        tabIndex={0}
      >
        <div
          className="desk-field__world"
          style={reduced ? undefined : { transform: `translate(${offset.x}px, ${offset.y}px)` }}
        >
          <div className="desk-field__paper" aria-hidden="true" />

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
                href={`/work/${project.slug}`}
                index={project.index}
                title={project.title}
                premise={project.premise}
                meta={metaFor(project)}
                image={{ src: media.src, alt: media.alt }}
                rotation={place.rotation}
                style={style}
              />
            );
          })}

          <ContactCard style={{ right: "18%", bottom: "8%" }} />
        </div>
      </div>

      <div className="desk-field__hint" aria-hidden="true">
        <span>draggable</span>
        <span>arrow keys</span>
        <span>six systems</span>
      </div>
    </section>
  );
}
