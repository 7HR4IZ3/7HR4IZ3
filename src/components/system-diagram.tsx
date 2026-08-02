import type { ProjectDomain, ProjectModule } from "@/content/projects";

export function SystemDiagram({ domains, module }: { domains: ProjectDomain[]; module: ProjectModule }) {
  return (
    <div className={`system-diagram system-diagram--${module}`} aria-label={`System path: ${domains.join(" to ")}`}>
      <div className="system-diagram__artifact" aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
      </div>
      <div className="system-diagram__path">
        {domains.map((domain, index) => (
          <div className="system-diagram__node" key={domain}>
            <span>{String(index + 1).padStart(2, "0")}</span><strong>{domain}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
