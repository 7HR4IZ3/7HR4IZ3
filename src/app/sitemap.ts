import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/lab", "/about", "/showcase/ink-blueprint"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date("2026-08-01"),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
  return [
    ...routes,
    ...projects.map((project) => ({
      url: `${siteConfig.url}/work/${project.slug}`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "monthly" as const,
      priority: project.featuredOrder !== null ? 0.9 : 0.65,
    })),
  ];
}
