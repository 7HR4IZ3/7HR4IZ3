import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { SystemDiagram } from "@/components/system-diagram";
import { getProject, projects } from "@/content/projects";
import { siteConfig } from "@/content/site";

type ProjectPageProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.title, description: project.premise, openGraph: { title: `${project.title} — ${siteConfig.alias}`, description: project.premise, type: "article" } };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const publicSource = project.links.find((link) => link.href.includes("github.com"));
  const jsonLd = {
    "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.premise,
    dateCreated: project.year, creator: { "@type": "Person", name: siteConfig.name, alternateName: [siteConfig.alias, siteConfig.handle] },
  };

  return (
    <PageShell>
      <article className="case-study">
        <header className="case-hero">
          <div className="case-hero__meta"><span>BUILD RECORD {project.index}</span><span>{project.status}</span><span>{project.year}</span></div>
          <h1>{project.title}</h1>
          <p>{project.premise}</p>
          <div className="case-hero__ownership"><span>{project.ownership}</span><span>{project.role}</span><span>{project.maturity}</span></div>
        </header>

        <section className="case-evidence" aria-labelledby="evidence-title">
          <div className="case-evidence__heading">
            <div>
              <span>PRIMARY EVIDENCE</span>
              <h2 id="evidence-title">The work, not a mockup.</h2>
            </div>
            <p>{project.media ? project.media.alt : "No public product capture is approved for this build record."}</p>
          </div>
          {project.media ? (
            <figure className={`case-evidence__frame case-evidence__frame--${project.media.kind}`}>
              <div className="case-evidence__image">
                <Image
                  src={project.media.src}
                  alt={project.media.alt}
                  width={project.media.width}
                  height={project.media.height}
                  sizes="(max-width: 680px) 92vw, (max-width: 1100px) 86vw, 78vw"
                  priority
                />
              </div>
              <figcaption>
                <span>{project.media.kind.replaceAll("-", " ")}</span>
                <span>{project.media.width} × {project.media.height}</span>
                <span>APPROVED PUBLIC MEDIA</span>
              </figcaption>
            </figure>
          ) : (
            <div className="case-evidence__restricted" role="note">
              <span>MEDIA / WITHHELD</span>
              <p>This record uses a procedural architecture view because no authentic public screenshot has been approved.</p>
            </div>
          )}
        </section>

        <aside className="case-facts" aria-label="Project facts">
          <div><span>STATE</span><strong>{project.status}</strong></div>
          <div><span>CONTRIBUTION</span><strong>{project.ownership}</strong></div>
          <div><span>SYSTEMS CROSSED</span><strong>{project.domains.length}</strong></div>
          <div><span>PUBLIC SOURCE</span><strong>{publicSource ? "AVAILABLE" : "NOT LINKED"}</strong></div>
        </aside>

        <section className="case-machine" aria-labelledby="architecture-title">
          <div><span>ARCHITECTURE</span><h2 id="architecture-title">{project.domains.join(" ↔ ")}</h2></div>
          <SystemDiagram domains={project.domains} module={project.module} />
        </section>

        <section className="case-overview" aria-label="Build narrative">
          <article><span>01 / OVERVIEW</span><h2>What exists.</h2><p>{project.summary}</p></article>
          <article><span>02 / PROBLEM + CONSTRAINT</span><h2>Where it resisted.</h2><p>{project.challenge}</p></article>
          <article><span>03 / INTERVENTION</span><h2>What I changed.</h2><p>{project.intervention}</p></article>
        </section>

        <section className="case-decision" aria-labelledby="decision-title">
          <span>DIFFICULT DECISION</span><h2 id="decision-title">The obvious implementation was not the product.</h2><p>{project.decision}</p>
        </section>

        <section className="case-proof" aria-labelledby="proof-title">
          <div className="section-heading"><h2 id="proof-title">Current proof</h2><span>{String(project.proof.length).padStart(2, "0")}</span></div>
          <ol>{project.proof.map((item) => <li key={item}>{item}</li>)}</ol>
          {project.visibility === "limited" && <p className="case-proof__notice">Public detail is intentionally limited. No private source, customer data, or sensitive architecture is exposed.</p>}
        </section>

        <section className="case-lessons" aria-labelledby="lessons-title"><span>LESSONS</span><h2 id="lessons-title">What this build changed.</h2><p>{project.lessons}</p></section>

        {project.stack.length > 0 && (
          <section className="case-stack-block" aria-labelledby="stack-title">
            <div><span>BUILD MATERIALS</span><h2 id="stack-title">The implementation surface.</h2></div>
            <div className="case-stack" aria-label="Technologies">{project.stack.map((item, index) => <span key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</span>)}</div>
          </section>
        )}
        <section className="case-links" aria-labelledby="links-title">
          <div><span>FOLLOW THE WORK</span><h2 id="links-title">Proof should be inspectable.</h2></div>
          <div className="case-links__actions">
            {project.links.map((link) => <a href={link.href} key={link.href} target="_blank" rel="noreferrer"><span>{link.label}</span><span aria-hidden="true">↗</span></a>)}
            {project.links.length === 0 && <p>{project.visibility === "limited" ? "Links are intentionally withheld for this private working set." : "A public repository or live build is not linked yet. The status above states exactly what has been verified."}</p>}
          </div>
        </section>

        <Link className="next-project" href={`/work/${nextProject.slug}`}><span>Next build record</span><strong>{nextProject.title}</strong><span aria-hidden="true">→</span></Link>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </PageShell>
  );
}
