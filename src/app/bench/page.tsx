import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bench",
  description: "Loose notes, experiments, and interests — the side table next to the desk.",
};

const notes: Array<{ label: string; title: string; note: string; span: string; href?: string }> = [
  {
    label: "CHESS",
    title: "7HR4IZ3 — chess",
    note: "Chess.com & Lichess: 7HR4IZ3 · daily puzzles, AntiChess explores how different models reason in the same position.",
    span: "Play",
    href: "https://www.chess.com/member/7HR4IZ3",
  },
  {
    label: "PHONE",
    title: "Daily drivers",
    note: "iPhone 11 · 128GB · Black — main. Samsung Galaxy S21 Ultra · Gold — secondary / tinkering. Both get real bench time.",
    span: "Native",
  },
  {
    label: "LAPTOP",
    title: "MacBook Air M1 · 2020 · 8GB · Silver",
    note: "Silver M1 Air is the daily workstation — where Kaizen, Snapshot, and VRMac actually ship.",
    span: "Setup",
  },
  {
    label: "DOTFILES",
    title: "Dotfiles / configs",
    note: "No public dotfiles yet — brewing. Editor, shell, and device configs live on the desk for now.",
    span: "Configs",
  },
  {
    label: "SCHOOL",
    title: "UNIBEN — Materials & Metallurgy",
    note: "University of Benin · Engineering · Materials & Metallurgy · since 2023 · 4th year. Engineering systems, mathematics, and documentation behind the software.",
    span: "Study",
  },
  {
    label: "EXPERIMENT",
    title: "OSS Hub — discover open source",
    note: "Full-stack Turborepo · Expo mobile + Convex backend + web — repositories, snippets, feed. Real mobile-first product surface.",
    span: "Full-stack",
    href: "/work/oss-hub",
  },
  {
    label: "EXPERIMENT",
    title: "Socially — multi-platform scheduler",
    note: "Manage 6 networks from one app — scheduling, analytics, media, automation. Normalizing 6 different APIs without losing platform nuance.",
    span: "SaaS",
    href: "/work/socially",
  },
  {
    label: "EXPERIMENT",
    title: "Video Creator — article → video pipeline",
    note: "CLI + SvelteKit + Express OAuth proxy · Remotion render · article → narration → upload to YT/TikTok/FB. Headless + recoverable.",
    span: "Pipeline",
    href: "/work/video-creator",
  },
];

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
