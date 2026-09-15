import type { Metadata } from "next";
import { ProjectRow } from "@/components/project-row";
import { featuredProjects, labProjects, workProjects } from "@/content/projects";

export const metadata: Metadata = { title: "Folders", description: "All folders on the desk — flagship systems and the wider repository." };

export default function WorkPage() {
  const all = [...featuredProjects, ...workProjects.filter((p) => p.featuredOrder === null), ...labProjects];
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content" tabIndex={-1} className="folders-wrap">
      <header className="folders-intro">
        <div>
          <span>FOLDERS / DESK DRAWER</span>
          <span>{String(all.length).padStart(2, "0")} FOLDERS</span>
        </div>
        <h1>Every folder on the desk.</h1>
        <p>Flagship systems first, then the wider repository. Each folder opens to evidence, decisions, and proof.</p>
      </header>

      <section className="folders-list" aria-labelledby="flagship-title">
        <div className="folders-heading">
          <h2 id="flagship-title">Flagship systems</h2>
          <span>{String(featuredProjects.length).padStart(2, "0")}</span>
        </div>
        {featuredProjects.map((project) => (
          <ProjectRow project={project} key={project.slug} />
        ))}
      </section>

      <section className="folders-list" aria-labelledby="platform-title">
        <div className="folders-heading">
          <h2 id="platform-title">Repository</h2>
          <span>{String(workProjects.length - featuredProjects.length).padStart(2, "0")}</span>
        </div>
        {workProjects
          .filter((project) => project.featuredOrder === null)
          .map((project) => (
            <ProjectRow project={project} key={project.slug} />
          ))}
      </section>

      <section className="folders-list" aria-labelledby="branches-title">
        <div className="folders-heading">
          <h2 id="branches-title">Bench &amp; experiments</h2>
          <span>{String(labProjects.length).padStart(2, "0")}</span>
        </div>
        {labProjects.map((project) => (
          <ProjectRow project={project} key={project.slug} />
        ))}
      </section>
      </main>
    </>
  );
}
