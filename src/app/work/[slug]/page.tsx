import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FolderSpread } from "@/components/folder-spread";
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
  const jsonLd = {
    "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.premise,
    dateCreated: project.year, creator: { "@type": "Person", name: siteConfig.name, alternateName: [siteConfig.alias, siteConfig.handle] },
  };

  return (
    <>
      <div className="folder-wrap">
        <FolderSpread project={project} nextSlug={nextProject.slug} nextTitle={nextProject.title} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
