import Link from "next/link";
import { MachineStage } from "@/components/machine-stage";
import { SiteFooter } from "@/components/site-footer";
import { education, experience } from "@/content/experience";
import { featuredProjects, labProjects } from "@/content/projects";
import { contactHref, siteConfig } from "@/content/site";

const record = [
  ["01", "Lead Engineer", "CheckAroundMe"],
  ["02", "Software Engineer", "Formerly Lunary.ai"],
  ["03", "Top Rated", "Upwork · since 2023"],
  ["04", "Engineering", "University of Benin"],
] as const;

export function HomeExperience() {
  return (
    <>
      <MachineStage />
      <main id="main-content" className="home-experience" tabIndex={-1}>
        <section className="home-hero" id="home" data-workbench-chapter="0" aria-labelledby="home-title">
          <div className="home-hero__identity">
            <span>{siteConfig.handle}</span>
            <span>{siteConfig.title} · {siteConfig.location}</span>
          </div>
          <div className="home-hero__copy">
            <p className="home-hero__brand">THRAIZE</p>
            <h1 id="home-title">I build software for ideas that do not fit a template.</h1>
            <p className="home-hero__lede">
              Mobile AI workspaces. Parallel coding agents. A Mac desktop anchored in a room. I take unusual product ideas through interface, runtime, backend, and release.
            </p>
            <div className="home-actions">
              <a href="#project-kaizen-code">See what I build</a>
              <a href={contactHref}>Contact me</a>
            </div>
          </div>
          <a className="scroll-cue" href="#record">Scroll to spawn workspaces <span aria-hidden="true">↓</span></a>
        </section>

        <section className="professional-record" id="record" data-workbench-chapter="1" aria-labelledby="record-title">
          <div className="chapter-heading">
            <span>SPAWN / PROFESSIONAL RECORD</span>
            <h2 id="record-title">Product range backed by production responsibility.</h2>
          </div>
          <div className="professional-record__list">
            {record.map(([index, title, context]) => (
              <div key={index}><span>{index}</span><strong>{title}</strong><span>{context}</span></div>
            ))}
          </div>
        </section>

        <div className="project-chapters" id="featured-work">
          {featuredProjects.map((project, index) => (
            <section className={`project-chapter project-chapter--${index % 2 ? "right" : "left"}`} id={`project-${project.slug}`} data-workbench-chapter={index + 2} key={project.slug} aria-labelledby={`${project.slug}-title`}>
              <article className="project-chapter__panel">
                <div className="project-chapter__meta">
                  <span>WORKSPACE {project.index}</span>
                  <span>{project.status}</span>
                  <span>{project.year}</span>
                </div>
                <h2 id={`${project.slug}-title`}>{project.title}</h2>
                <p className="project-chapter__premise">{project.premise}</p>
                <p className="project-chapter__proof">{project.proof[0]}</p>
                <div className="project-chapter__domains" aria-label={`${project.title} systems`}>
                  {project.domains.map((domain) => <span key={domain}>{domain}</span>)}
                </div>
                <Link href={`/work/${project.slug}`}>Read the build record <span aria-hidden="true">↗</span></Link>
              </article>
              <span className="project-chapter__number" aria-hidden="true">{project.index}</span>
            </section>
          ))}
        </div>

        <section className="experience-chapter" id="experience" data-workbench-chapter="8" aria-labelledby="experience-title">
          <div className="experience-chapter__intro">
            <span>MERGE / EXPERIENCE</span>
            <div className="experience-chapter__statement">
              <h2 id="experience-title">The work continues after the interesting prototype.</h2>
              <p>I have worked across startup ownership, production AI software, and independent client engineering—turning product direction into systems that can be shipped, maintained, and trusted.</p>
            </div>
            <div className="experience-chapter__summary" aria-label="Professional experience summary">
              <div><strong>{String(experience.length).padStart(2, "0")}</strong><span>Professional tracks</span></div>
              <div><strong>2023</strong><span>Professional work began</span></div>
              <div><strong>END→END</strong><span>Product through operations</span></div>
            </div>
          </div>
          <div className="experience-ledger">
            {experience.map((item) => (
              <article key={item.organization}>
                <div className="experience-ledger__rail" aria-hidden="true">
                  <span>{item.index}</span><i /><span>{item.status}</span>
                </div>
                <header className="experience-ledger__identity">
                  <span>{item.engagement}</span>
                  <h3>{item.organization}</h3>
                  <p>{item.role}</p>
                  <time>{item.period}</time>
                </header>
                <div className="experience-ledger__record">
                  <p>{item.summary}</p>
                  <ol aria-label={`${item.organization} responsibilities and evidence`}>
                    {item.proof.map((proof, index) => (
                      <li key={proof}><span>{String(index + 1).padStart(2, "0")}</span>{proof}</li>
                    ))}
                  </ol>
                  <div className="experience-ledger__systems" aria-label={`${item.organization} systems`}>
                    {item.systems.map((system) => <span key={system}>{system}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="experience-chain" aria-label="How I carry work through a product">
            {(["Direction", "Architecture", "Implementation", "Release", "Maintenance"] as const).map((stage, index) => (
              <span key={stage}>{String(index + 1).padStart(2, "0")} · {stage}</span>
            ))}
          </div>
        </section>

        <section className="working-set" aria-labelledby="working-set-title">
          <div className="working-set__heading">
            <h2 id="working-set-title">Unmerged branches</h2>
            <p>Early products and local experiments, labeled by what exists rather than what they might become.</p>
          </div>
          <div className="working-set__list">
            {labProjects.map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`}>
                <span>{project.index}</span><strong>{project.title}</strong><span>{project.status}</span><span>{project.premise}</span><span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
          <Link className="working-set__all" href="/lab">Inspect the complete lab</Link>
        </section>

        <section className="home-about" id="about" aria-labelledby="home-about-title">
          <div className="home-about__identity">
            <strong>THRAIZE</strong><span>{siteConfig.handle}</span><span>{siteConfig.name}</span>
          </div>
          <div className="home-about__copy">
            <h2 id="home-about-title">Full-stack engineer. Product builder. Persistent problem solver.</h2>
            <p>I move in both directions: downward into runtimes, protocols, data, and native bridges; upward into interfaces, language, reliability, and whether the product makes sense to use.</p>
            <p>{education.programme} · {education.field} · {education.institution}</p>
            <Link href="/about">About Alhassan <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="contact-chapter" id="contact" aria-labelledby="contact-title">
          <span>READY FOR THE NEXT DIFFICULT THING</span>
          <h2 id="contact-title">Let’s build something useful.</h2>
          <p>{siteConfig.availability}</p>
          <a href={contactHref}>{siteConfig.contact.email} <span aria-hidden="true">↗</span></a>
        </section>
      </main>
      <div className="home-footer-layer"><SiteFooter /></div>
    </>
  );
}
