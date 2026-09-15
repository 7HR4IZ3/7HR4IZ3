"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FolderSpread } from "@/components/folder-spread";
import { PopupShell } from "@/components/popup-shell";
import { benchNotes } from "@/content/bench";
import { getProject, projects } from "@/content/projects";

type Popup =
  | { type: "folders" }
  | { type: "bench" }
  | { type: "about" }
  | { type: "folder"; slug: string }
  | null;

function parseHash(hash: string): Popup {
  if (!hash || hash === "#" || hash === "#/" || hash === "#") return null;
  let h = hash.replace(/^#/, "").trim();
  // strip query/hash params
  h = h.split("?")[0].split("&")[0];
  try { h = decodeURIComponent(h); } catch {}
  const clean = h.replace(/^\//, "").replace(/\/$/, "");
  // folders
  if (clean === "work" || clean === "folders" || clean === "work/") return { type: "folders" };
  // bench
  if (clean === "bench" || clean === "bench/") return { type: "bench" };
  // about
  if (clean === "about" || clean === "about/") return { type: "about" };
  // work slug — #/work/slug or #work/slug or #slug
  const workMatch = clean.match(/^work\/([^\/\?]+)/);
  if (workMatch) {
    const slug = workMatch[1];
    if (projects.find((p) => p.slug === slug)) return { type: "folder", slug };
  }
  // shorthand #/kaizen-code
  if (projects.find((p) => p.slug === clean)) return { type: "folder", slug: clean };
  // also support #work=slug
  const eq = clean.match(/^work=([^&]+)/);
  if (eq && projects.find((p) => p.slug === eq[1])) return { type: "folder", slug: eq[1] };
  return null;
}

export function HashPopupRouter() {
  const [popup, setPopup] = useState<Popup>(() => {
    if (typeof window === "undefined") return null;
    return parseHash(window.location.hash);
  });

  const close = useCallback(() => {
    history.replaceState(null, "", "/");
    setPopup(null);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }, []);

  useEffect(() => {
    const onHash = () => setPopup(parseHash(window.location.hash));
    onHash();
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onHash);
    };
  }, []);

  if (!popup) return null;

  // bench popup — reuse bench content inline (avoid importing page)
  if (popup.type === "bench") {
    return (
      <PopupShell label="Bench" onClose={close}>
        <div className="popup-scroll">
          <header className="bench-intro" style={{ padding: "28px 22px 22px" }}>
            <div>
              <span>BENCH / SIDE TABLE</span>
              <span>08 NOTES</span>
            </div>
            <h1 style={{ fontSize: "42px" }}>Loose notes on the bench.</h1>
            <p>Chess, devices, school, and 3 hireable experiments — pinned lightly.</p>
          </header>
          <div className="bench-table" style={{ padding: "18px 22px" }}>
            {benchNotes.map((item) => {
              const href = (item as { href?: string }).href;
              const content = (
                <>
                  <span className="bench-note__tape" aria-hidden="true" />
                  <span className="bench-note__label">{item.label}</span>
                  <strong>{item.title}</strong>
                  <p>{item.note}</p>
                  <span className="bench-note__span">{item.span}</span>
                </>
              );
              return href ? (
                href.startsWith("http") ? (
                  <a key={item.title} href={href} target="_blank" rel="noreferrer" className="bench-note bench-note--linked">
                    {content}
                  </a>
                ) : (
                  <a key={item.title} href={`/#${href.replace(/^\//, "")}`} className="bench-note bench-note--linked">
                    {content}
                  </a>
                )
              ) : (
                <div key={item.title} className="bench-note">
                  {content}
                </div>
              );
            })}
          </div>
          <div style={{ padding: "14px 22px", borderTop: "1px solid var(--ink-line)" }}>
            <a href="#/" onClick={(e) => { e.preventDefault(); close(); }}>
              ← back to desk
            </a>{" "}
            · <Link href="/bench">open bench page ↗</Link>
          </div>
        </div>
      </PopupShell>
    );
  }

  if (popup.type === "about") {
    return (
      <PopupShell label="About" onClose={close}>
        <div className="popup-scroll">
          <div className="about-sheet" style={{ margin: "22px", boxShadow: "none" }}>
            <div className="about-sheet__head">
              <span>THRAIZE — 7HR4IZ3</span>
              <span>ABOUT</span>
            </div>
            <h1>Alhassan Abdulazeez</h1>
            <p className="about-sheet__lede">
              Full-stack engineer in Nigeria — I build software for ideas that do not fit a template. Downward into runtimes and
              data; upward into interfaces and whether the product makes sense.
            </p>
            <p className="about-sheet__avail">Open to full-stack roles, startup collaborations, and selected freelance work.</p>
            <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
              <a href="#/" onClick={(e) => { e.preventDefault(); close(); }}>
                ← back to desk
              </a>{" "}
              · <Link href="/about">open about page ↗</Link>
            </div>
          </div>
        </div>
      </PopupShell>
    );
  }

  if (popup.type === "folders") {
    return (
      <PopupShell label="Folders" onClose={close}>
        <div className="popup-scroll">
          <header className="folders-intro" style={{ padding: "28px 22px 18px" }}>
            <div>
              <span>FOLDERS / DESK DRAWER</span>
              <span>{String(projects.length).padStart(2, "0")} FOLDERS</span>
            </div>
            <h1 style={{ fontSize: "42px" }}>Every folder on the desk.</h1>
            <p>Flagship systems first, then the wider repository.</p>
          </header>
          <div style={{ padding: "12px 22px 22px", display: "grid", gap: 8 }}>
            {projects.map((p) => (
              <a
                key={p.slug}
                href={`/#work/${p.slug}`}
                className="project-row"
                style={{ minHeight: 0, padding: "14px 12px" }}
              >
                <span className="project-row__index">{p.index}</span>
                <span className="project-row__identity">
                  <strong>{p.title}</strong>
                  <span>{p.status}</span>
                </span>
                <span className="project-row__premise">{p.premise.slice(0, 80)}…</span>
                <span className="project-row__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </PopupShell>
    );
  }

  if (popup.type === "folder") {
    const project = getProject(popup.slug);
    if (!project) return null;
    const idx = projects.findIndex((p) => p.slug === popup.slug);
    const next = projects[(idx + 1) % projects.length];
    return (
      <PopupShell label={project.title} onClose={close}>
        <div className="popup-scroll">
          <FolderSpread project={project} nextSlug={next.slug} nextTitle={next.title} isPopup />
          <div style={{ padding: "12px 22px", borderTop: "1px solid var(--ink-line)", display: "flex", gap: 12 }}>
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                close();
              }}
            >
              ← back to desk
            </a>
            <span>·</span>
            <Link href={`/work/${project.slug}`}>open as page ↗</Link>
            <span>·</span>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(`${window.location.origin}${window.location.pathname}#/work/${project.slug}`);
              }}
              style={{ background: "none", border: 0, borderBottom: "1px solid var(--ink)", cursor: "pointer", font: "inherit", fontSize: 12 }}
            >
              copy link
            </button>
          </div>
        </div>
      </PopupShell>
    );
  }

  return null;
}
