import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { capabilities, education, experience } from "@/content/experience";
import { contactHref, siteConfig } from "@/content/site";

export const metadata: Metadata = { title: "About", description: `About ${siteConfig.name}, the full-stack engineer behind ${siteConfig.alias}.` };

const principles = [
  ["01", "Begin with the real problem", "I trace the actual workflow and constraint before choosing a framework or polishing the visible symptom."],
  ["02", "Think across the complete product", "Interfaces, data, permissions, runtime behavior, deployment, and support are parts of one experience."],
  ["03", "Communicate the trade-off", "A decision is more useful when the cost, alternative, and stage of the product are explicit."],
  ["04", "Build for change", "Clear contracts and recoverable workflows matter more than architecture designed to look impressive."],
  ["05", "Take ownership", "I stay with the awkward middle: integration, debugging, release, documentation, and maintenance."],
] as const;

export default function AboutPage() {
  return (
    <PageShell>
      <header className="about-intro">
        <div><span>{siteConfig.alias}</span><span>{siteConfig.handle}</span></div>
        <h1>{siteConfig.name}</h1>
        <p>Full-stack engineer based in Nigeria, building AI-powered developer tools, production web applications, native products, and ambitious software systems.</p>
      </header>
      <section className="about-statement" aria-labelledby="about-statement-title">
        <h2 id="about-statement-title">I work in both directions.</h2>
        <div>
          <p>Downward into runtimes, native bridges, protocols, databases, background jobs, and build systems.</p>
          <p>Upward into interface decisions, product language, reliability, and the moment a person decides whether a tool makes sense.</p>
          <p>I currently lead engineering at CheckAroundMe, previously worked with Lunary.ai, and work with clients as a Top Rated freelancer on Upwork.</p>
        </div>
      </section>
      <section className="capabilities" aria-labelledby="capabilities-title">
        <div className="section-heading"><h2 id="capabilities-title">What I do</h2><span>04</span></div>
        {capabilities.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}
      </section>
      <section className="about-experience" id="experience" aria-labelledby="about-experience-title">
        <div className="section-heading"><h2 id="about-experience-title">Experience</h2><span>{String(experience.length).padStart(2, "0")}</span></div>
        {experience.map((item) => (
          <article key={item.organization}>
            <div><h3>{item.organization}</h3><p>{item.role}</p><time>{item.period}</time></div>
            <div><p>{item.summary}</p><ul>{item.proof.map((proof) => <li key={proof}>{proof}</li>)}</ul></div>
          </article>
        ))}
      </section>
      <section className="principles" aria-labelledby="principles-title">
        <div className="section-heading"><h2 id="principles-title">How I work</h2><span>05</span></div>
        {principles.map(([index, title, copy]) => <article key={index}><span>{index}</span><h3>{title}</h3><p>{copy}</p></article>)}
      </section>
      <section className="education" aria-labelledby="education-title">
        <div><span>EDUCATION</span><h2 id="education-title">{education.institution}</h2></div>
        <div><strong>{education.programme}</strong><p>{education.field} · {education.level}</p><p>{education.summary}</p></div>
      </section>
      <section className="contact-block" id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Let’s build something useful.</h2>
        <p>{siteConfig.availability}</p>
        <div><a href={contactHref}>{siteConfig.contact.email}</a><a href={siteConfig.contact.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={siteConfig.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
      </section>
    </PageShell>
  );
}
