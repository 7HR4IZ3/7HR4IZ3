import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ProjectRow } from "@/components/project-row";
import { featuredProjects, labProjects, workProjects } from "@/content/projects";

export const metadata: Metadata = { title: "Work", description: "Products, platform work, and experiments built by Thraize." };

export default function WorkPage() {
  return (
    <PageShell>
      <header className="index-intro">
        <div><span>WORK / REPOSITORY LEDGER</span><span>{String(workProjects.length + labProjects.length).padStart(2, "0")} RECORDS</span></div>
        <h1>Interesting products. Explicit evidence.</h1>
        <p>Each build record explains the real problem, ownership boundary, difficult decision, architecture, and what currently works.</p>
      </header>
      <section className="project-index" aria-labelledby="flagship-title">
        <div className="section-heading"><h2 id="flagship-title">Flagship workspaces</h2><span>{String(featuredProjects.length).padStart(2, "0")}</span></div>
        {featuredProjects.map((project) => <ProjectRow project={project} key={project.slug} />)}
      </section>
      <section className="project-index project-index--secondary" aria-labelledby="platform-title">
        <div className="section-heading"><h2 id="platform-title">Platform and professional work</h2><span>{String(workProjects.length - featuredProjects.length).padStart(2, "0")}</span></div>
        {workProjects.filter((project) => project.featuredOrder === null).map((project) => <ProjectRow project={project} key={project.slug} />)}
      </section>
      <section className="project-index project-index--secondary" aria-labelledby="branches-title">
        <div className="section-heading"><h2 id="branches-title">Unmerged branches</h2><span>{String(labProjects.length).padStart(2, "0")}</span></div>
        {labProjects.map((project) => <ProjectRow project={project} key={project.slug} />)}
      </section>
    </PageShell>
  );
}
