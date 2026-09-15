"use client";

import Image from "next/image";
import Link from "next/link";
import { SystemDiagram } from "@/components/system-diagram";
import type { Project } from "@/content/projects";

export function FolderSpread({ project, nextSlug, nextTitle, isPopup = false }: { project: Project; nextSlug: string; nextTitle: string; isPopup?: boolean }) {
  const evidence = [project.media, ...(project.gallery ?? [])].filter(
    (item, index, all): item is NonNullable<typeof item> => Boolean(item) && all.findIndex((c) => c?.src === item?.src) === index,
  ).slice(0, 5);
  const publicSource = project.links.find((l) => l.href.includes("github.com"));

  return (
    <div className="folder-page">
      <div className="folder-page__meta">
        <span>FOLDER {project.index}</span>
        <span>{project.status} · {project.year}</span>
        <Link href={isPopup ? "#/work" : "/work"}>← all folders</Link>
      </div>

      <div className="folder">
        <div className="folder__tab" aria-hidden="true">
          <span>{project.shortTitle}</span>
          <span>{project.index}</span>
        </div>

        <div className="folder__body">
          {/* left flap */}
          <aside className="folder__flap" aria-label="Folder index">
            <div className="folder__identity">
              <span className="folder__eyebrow">BUILD RECORD {project.index}</span>
              <h1>{project.title}</h1>
              <p>{project.premise}</p>
            </div>
            <dl className="folder__dl">
              <div><dt>Ownership</dt><dd>{project.ownership}</dd></div>
              <div><dt>Role</dt><dd>{project.role}</dd></div>
              <div><dt>Maturity</dt><dd>{project.maturity}</dd></div>
              <div><dt>Systems</dt><dd>{project.domains.join(" · ")}</dd></div>
            </dl>
            <div className="folder__jump">
              {[
                ["evidence", "Evidence"],
                ["narrative", "Narrative"],
                ["proof", "Proof"],
                ["stack", "Stack"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={(e) => {
                    const el = document.getElementById(id);
                    const container = (e.currentTarget as HTMLElement).closest(".popup-scroll") as HTMLElement | null;
                    if (el && container) {
                      const top = el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 12;
                      container.scrollTo({ top, behavior: "smooth" });
                    } else {
                      el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            {project.links.length > 0 && (
              <div className="folder__links">
                {project.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </aside>

          {/* right stack */}
          <div className="folder__stack">
            {/* evidence */}
            <section id="evidence" className="folder__sheet" aria-labelledby="evidence-title">
              <div className="folder__sheet-head">
                <span>FIELD NOTES — {String(evidence.length).padStart(2, "0")} CAPTURES</span>
                <h2 id="evidence-title">Read the build from several angles.</h2>
              </div>
              {evidence.length > 0 ? (
                <div className="folder__gallery">
                  {evidence.map((item, i) => (
                    <figure key={item.src} className="folder__plate">
                      <span className="folder__tape" aria-hidden="true" />
                      <div className="folder__plate-frame">
                        <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 680px) 92vw, 50vw" />
                      </div>
                      <figcaption>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        <span>{item.kind.replaceAll("-", " ")}</span>
                        <span>{item.alt}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <p className="folder__empty">No approved capture yet — procedural view only.</p>
              )}
            </section>

            {/* quick facts */}
            <div className="folder__facts">
              <div><span>STATE</span><strong>{project.status}</strong></div>
              <div><span>SYSTEMS</span><strong>{project.domains.length}</strong></div>
              <div><span>SOURCE</span><strong>{publicSource ? "AVAILABLE" : "—"}</strong></div>
            </div>

            {/* architecture */}
            <section className="folder__sheet">
              <span className="folder__eyebrow">ARCHITECTURE</span>
              <h3 className="folder__h3">{project.domains.join(" ↔ ")}</h3>
              <SystemDiagram domains={project.domains} module={project.module} />
            </section>

            {/* narrative */}
            <section id="narrative" className="folder__sheet folder__sheet--narrative">
              <div>
                <span>01 / OVERVIEW</span>
                <h3>What exists.</h3>
                <p>{project.summary}</p>
              </div>
              <div>
                <span>02 / CONSTRAINT</span>
                <h3>Where it resisted.</h3>
                <p>{project.challenge}</p>
              </div>
              <div>
                <span>03 / INTERVENTION</span>
                <h3>What I changed.</h3>
                <p>{project.intervention}</p>
              </div>
            </section>

            <section className="folder__sheet folder__sheet--decision">
              <span>DIFFICULT DECISION</span>
              <h3>The obvious implementation was not the product.</h3>
              <p>{project.decision}</p>
            </section>

            <section id="proof" className="folder__sheet">
              <div className="folder__sheet-head">
                <h3>Current proof</h3>
                <span>{String(project.proof.length).padStart(2, "0")}</span>
              </div>
              <ol className="folder__proof">
                {project.proof.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
              {project.visibility === "limited" && <p className="folder__notice">Public detail is intentionally limited.</p>}
            </section>

            <section className="folder__sheet">
              <span>LESSONS</span>
              <h3>What this build changed.</h3>
              <p>{project.lessons}</p>
            </section>

            {project.stack.length > 0 && (
              <section id="stack" className="folder__sheet">
                <span>BUILD MATERIALS</span>
                <h3>The implementation surface.</h3>
                <div className="folder__stack-pills">
                  {project.stack.map((s, i) => (
                    <span key={s}>
                      <i>{String(i + 1).padStart(2, "0")}</i> {s}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <Link className="folder__next" href={isPopup ? `#/work/${nextSlug}` : `/work/${nextSlug}`}>
              <span>Next folder</span>
              <strong>{nextTitle}</strong>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
