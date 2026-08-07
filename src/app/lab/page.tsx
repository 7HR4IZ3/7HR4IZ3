import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ProjectRow } from "@/components/project-row";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Lab", description: "Early products and local experiments from Thraize, labeled by verified maturity." };

export default function LabPage() {
  return (
    <PageShell>
      <header className="index-intro index-intro--lab">
        <div><span>LAB / ALL PROJECTS</span><span>{String(projects.length).padStart(2, "0")} RECORDS</span></div>
        <h1>Work before the launch story.</h1>
        <p>Experiments belong in a portfolio when their boundaries are honest. These records show the idea, current implementation, and maturity without exposing private source or inventing outcomes.</p>
      </header>
      <section className="project-index" aria-label="All projects">
        {projects.map((project) => <ProjectRow project={project} key={project.slug} />)}
      </section>
      <aside className="lab-policy" aria-labelledby="lab-policy-title">
        <h2 id="lab-policy-title">Disclosure rule</h2>
        <p>Private work receives a limited description, no source link, no customer data, and no implementation detail that has not been approved for public use.</p>
      </aside>
    </PageShell>
  );
}
