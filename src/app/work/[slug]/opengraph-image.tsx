import { ImageResponse } from "next/og";
import { getProject } from "@/content/projects";

export const alt = "THRAIZE project build record";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project?.title ?? "Agent Workbench";
  const premise = project?.premise ?? "Software for ideas that do not fit a template.";
  const domains = project?.domains ?? ["WEB", "NATIVE", "AI"];

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#e8e2d6", color: "#11110f", padding: "68px", fontFamily: "monospace" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
        <span>THRAIZE / BUILD RECORD</span><span style={{ color: "#b63f18" }}>{project?.index ?? "00"}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ display: "flex", fontSize: 88, lineHeight: 0.9, letterSpacing: "-6px", maxWidth: 1040 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 25, lineHeight: 1.35, maxWidth: 820, color: "#55534c" }}>{premise}</div>
      </div>
      <div style={{ display: "flex", gap: 28, fontSize: 18, color: "#b63f18" }}>
        {domains.map((domain) => <span key={domain}>{domain}</span>)}
      </div>
    </div>,
    size,
  );
}
