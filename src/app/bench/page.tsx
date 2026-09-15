import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bench",
  description: "Loose notes, experiments, and interests — the side table next to the desk.",
};

// TODO(Q12): fill from real inventory — chess handle, devices, dotfiles, school note
const placeholders = [
  { label: "CHESS", title: "AntiChess studies", note: "Lichess / Chess.com profile + daily puzzle — placeholder", span: "Play" },
  { label: "PHONE", title: "Current device", note: "Daily phone + tinkering notes — placeholder", span: "Native" },
  { label: "LAPTOP", title: "Workstation", note: "Laptop + peripherals you actually use — placeholder", span: "Setup" },
  { label: "DOTFILES", title: "Dotfiles / configs", note: "nvim, zsh, window manager — link to repo — placeholder", span: "Configs" },
  { label: "SCHOOL", title: "UniBen — Metallurgical & Materials", note: "Engineering studies note — placeholder", span: "Study" },
  { label: "EXPERIMENT", title: "browser-proxy", note: "Relay experiment sketch — placeholder", span: "Bench" },
  { label: "EXPERIMENT", title: "llm-chess", note: "Chess engine tools demo — placeholder", span: "Bench" },
  { label: "EXPERIMENT", title: "home-visualizer", note: "Room scan → furniture AR — placeholder", span: "Bench" },
];

export default function BenchPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content" tabIndex={-1} className="bench-wrap">
      <header className="bench-intro">
        <div>
          <span>BENCH / SIDE TABLE</span>
          <span>{String(placeholders.length).padStart(2, "0")} NOTES</span>
        </div>
        <h1>Loose notes on the bench.</h1>
        <p>
          Not flagship folders — just things on the side table: chess, devices, configs, school, and sketches from the lab. Each is a
          small paper pinned lightly.
        </p>
      </header>

      <section className="bench-table" aria-label="Bench notes">
        {placeholders.map((item) => (
          <div key={item.title} className="bench-note">
            <span className="bench-note__tape" aria-hidden="true" />
            <span className="bench-note__label">{item.label}</span>
            <strong>{item.title}</strong>
            <p>{item.note}</p>
            <span className="bench-note__span">{item.span}</span>
          </div>
        ))}
      </section>

      <div className="bench-foot">
        <p>Want the full repository? Open the drawer.</p>
        <Link href="/work">All folders ↗</Link>
      </div>

      <p className="bench-todo" role="note">
        TODO(Q12): replace placeholders with real handles/links/images from your inventory (chess profile, phone/laptop models, dotfiles repo,
        school note, experiments).
      </p>
      </main>
    </>
  );
}
