import type { Metadata } from "next";
import { capabilities, education, experience } from "@/content/experience";
import { contactHref, siteConfig } from "@/content/site";

export const metadata: Metadata = { title: "About", description: `About ${siteConfig.name}, the full-stack engineer behind ${siteConfig.alias}.` };

export default function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content" tabIndex={-1} className="about-wrap">
      <div className="about-sheet">
        <div className="about-sheet__tape" aria-hidden="true" />
        <div className="about-sheet__head">
          <span>{siteConfig.alias} — {siteConfig.handle}</span>
          <span>ABOUT / PINNED SHEET</span>
        </div>
        <h1>{siteConfig.name}</h1>
        <p className="about-sheet__lede">
          Full-stack engineer in {siteConfig.location} — I build software for ideas that do not fit a template. Downward into
          runtimes, native bridges, protocols, and data; upward into interfaces, language, and whether the product makes sense to
          use.
        </p>
        <p className="about-sheet__avail">{siteConfig.availability}</p>

        <div className="about-sheet__grid">
          <div>
            <span>EXPERIENCE</span>
            {experience.map((e) => (
              <div key={e.organization} className="about-sheet__exp">
                <strong>{e.organization}</strong> — {e.role} <em>{e.period}</em>
                <p>{e.summary}</p>
              </div>
            ))}
          </div>
          <div>
            <span>CAPABILITIES</span>
            {capabilities.map(([title, copy]) => (
              <div key={title} className="about-sheet__cap">
                <strong>{title}</strong>
                <p>{copy}</p>
              </div>
            ))}
            <span>EDUCATION</span>
            <div className="about-sheet__cap">
              <strong>{education.institution}</strong>
              <p>
                {education.programme} · {education.field} · {education.level}
              </p>
              <p>{education.summary}</p>
            </div>
          </div>
        </div>

        <div className="about-sheet__contact">
          <a href={contactHref}>{siteConfig.contact.email}</a>
          <a href={siteConfig.contact.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={siteConfig.contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href={siteConfig.contact.x} target="_blank" rel="noreferrer">
            X ↗
          </a>
        </div>

        <p className="about-sheet__hand">pinned — thraize&apos;s personal space</p>
      </div>
      </main>
    </>
  );
}
