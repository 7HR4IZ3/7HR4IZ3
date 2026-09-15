import type { Metadata } from "next";
import Link from "next/link";
import { benchNotes } from "@/content/bench";

export const metadata: Metadata = {
  title: "Bench",
  description: "Loose notes, experiments, and interests — the side table next to the desk.",
};

const notes = benchNotes;

export default function BenchPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content" tabIndex={-1} className="bench-wrap">
      <header className="bench-intro">
        <div>
          <span>BENCH / SIDE TABLE</span>
          <span>{String(notes.length).padStart(2, "0")} NOTES</span>
        </div>
        <h1>Loose notes on the bench.</h1>
        <p>
          Not flagship folders — just things on the side table: chess, devices, configs, school, and sketches from the lab. Each is a
          small paper pinned lightly.
        </p>
      </header>

      <section className="bench-table" aria-label="Bench notes">
        {notes.map((item) => {
          const content = (
            <>
              <span className="bench-note__tape" aria-hidden="true" />
              <span className="bench-note__label">{item.label}</span>
              <strong>{item.title}</strong>
              <p>{item.note}</p>
              <span className="bench-note__span">{item.span} {item.href ? "↗" : ""}</span>
            </>
          );
          return item.href ? (
            item.href.startsWith("http") ? (
              <a key={item.title} href={item.href} target="_blank" rel="noreferrer" className="bench-note bench-note--linked">
                {content}
              </a>
            ) : (
              <Link key={item.title} href={item.href} className="bench-note bench-note--linked">
                {content}
              </Link>
            )
          ) : (
            <div key={item.title} className="bench-note">
              {content}
            </div>
          );
        })}
      </section>

      <div className="bench-foot">
        <p>Want the full repository? Open the drawer.</p>
        <Link href="/work">All folders ↗</Link>
      </div>
      </main>
    </>
  );
}
