import { describe, expect, it } from "vitest";
import { featuredProjectEvidence, featuredProjects, projects } from "@/content/projects";

describe("project content", () => {
  it("uses unique, URL-safe slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it("keeps the approved flagship workspace sequence", () => {
    expect(featuredProjects).toHaveLength(6);
    expect(featuredProjects.map((project) => project.slug)).toEqual(["kaizen-code", "snapshot", "vrmac", "motion-cues", "opencode-annotate", "stackjet"]);
    expect(featuredProjects.map((project) => project.featuredOrder)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("assigns one approved evidence capture to every flagship", () => {
    expect(featuredProjectEvidence).toHaveLength(6);
    expect(featuredProjectEvidence.map((media) => media.slug)).toEqual(featuredProjects.map((project) => project.slug));
    for (const media of featuredProjectEvidence) {
      expect(media.approved).toBe(true);
      expect(media.src).toMatch(/^\/projects\/[a-z0-9-]+\.(?:png|svg)$/);
      expect(media.alt.length).toBeGreaterThan(20);
      expect(media.width).toBeGreaterThan(0);
      expect(media.height).toBeGreaterThan(0);
    }
  });

  it("keeps a multi-angle evidence set for every flagship", () => {
    for (const project of featuredProjects) {
      expect(project.gallery?.length ?? 0).toBeGreaterThanOrEqual(3);
      for (const media of project.gallery ?? []) {
        expect(media.approved).toBe(true);
        expect(media.src).toMatch(/^\/projects\/.*\.(?:png|jpe?g|svg)$/);
        expect(media.alt.length).toBeGreaterThan(20);
      }
    }
  });

  it("requires complete case-study content", () => {
    for (const project of projects) {
      expect(project.title.length).toBeGreaterThan(1);
      expect(project.premise.length).toBeGreaterThan(20);
      expect(project.summary.length).toBeGreaterThan(20);
      expect(project.challenge.length).toBeGreaterThan(20);
      expect(project.intervention.length).toBeGreaterThan(20);
      expect(project.decision.length).toBeGreaterThan(20);
      expect(project.lessons.length).toBeGreaterThan(20);
      expect(project.proof.length).toBeGreaterThanOrEqual(3);
      expect(project.domains.length).toBeGreaterThan(0);
      expect(project.ownership.length).toBeGreaterThan(2);
      expect(project.maturity.length).toBeGreaterThan(4);
    }
  });

  it("does not expose source links for limited work", () => {
    for (const project of projects.filter((project) => project.visibility === "limited")) expect(project.links).toEqual([]);
  });

  it("uses secure external URLs", () => {
    for (const link of projects.flatMap((project) => project.links)) {
      expect(link.href).toMatch(/^https:\/\//);
    }
  });
});
