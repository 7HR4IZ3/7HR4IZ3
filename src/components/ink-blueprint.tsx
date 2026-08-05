"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import { featuredProjectEvidence, featuredProjects } from "@/content/projects";

export function InkBlueprint() {
  const fieldRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!fieldRef.current) return;
    const bounds = fieldRef.current.getBoundingClientRect();
    fieldRef.current.style.setProperty("--ink-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    fieldRef.current.style.setProperty("--ink-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  }

  function resetPointer() {
    fieldRef.current?.style.setProperty("--ink-x", "50%");
    fieldRef.current?.style.setProperty("--ink-y", "50%");
  }

  return (
    <div className="blueprint-field" ref={fieldRef} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <div className="blueprint-field__paper" aria-hidden="true" />
      <span className="blueprint-field__rule blueprint-field__rule--a" aria-hidden="true" />
      <span className="blueprint-field__rule blueprint-field__rule--b" aria-hidden="true" />
      <span className="blueprint-field__rule blueprint-field__rule--c" aria-hidden="true" />
      <div className="blueprint-field__origin">
        <span>THRAIZE</span>
        <strong>Common ground</strong>
        <small>where incompatible systems become useful</small>
      </div>
      {featuredProjectEvidence.map((media, index) => {
        const project = featuredProjects[index];
        if (!project) return null;
        return (
          <figure className={`blueprint-plate blueprint-plate--${index + 1}`} key={media.src}>
            <Link className="blueprint-plate__link" href={`/work/${project.slug}`} aria-label={`Open the ${project.title} build record`}>
              <div className="blueprint-plate__frame">
                <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(max-width: 680px) 60vw, 24vw" />
              </div>
            </Link>
            <figcaption><strong>{project.shortTitle}</strong><span>{project.domains.join(" / ")}</span></figcaption>
          </figure>
        );
      })}
      <div className="blueprint-field__legend" aria-hidden="true">
        <span>Input</span><span>Translation</span><span>Outcome</span>
      </div>
    </div>
  );
}
