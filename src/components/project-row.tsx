import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectRow({ project }: { project: Project }) {
  return (
    <Link className="project-row" href={`/work/${project.slug}`}>
      <span className="project-row__index">{project.index}</span>
      <span className="project-row__identity"><strong>{project.title}</strong><span>{project.ownership} · {project.status}</span></span>
      <span className="project-row__premise">{project.premise}</span>
      <span className="project-row__systems">{project.domains.join(" / ")}</span>
      <span className="project-row__maturity">{project.maturity}</span>
      <span className="project-row__arrow" aria-hidden="true">↗</span>
    </Link>
  );
}
