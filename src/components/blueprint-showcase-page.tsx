import Link from "next/link";
import { InkBlueprint } from "@/components/ink-blueprint";
import { PageShell } from "@/components/page-shell";
import { featuredProjects } from "@/content/projects";

const method = [
  {
    title: "Evidence",
    text: "Every plate is an approved capture from a real build. The field never invents a product surface to make the story look finished.",
  },
  {
    title: "Translation",
    text: "Ink lines connect the systems crossed by each build: mobile to native, browser to agent, source URL to cloud storage.",
  },
  {
    title: "Inspection",
    text: "Every plate is a doorway. Open one and the full build record gives you the problem, constraint, intervention, proof, and links.",
  },
] as const;

export function BlueprintShowcasePage() {
  return (
    <PageShell>
      <article className="blueprint-showcase">
        <header className="blueprint-showcase__hero">
          <div className="blueprint-showcase__hero-meta">
            <span>FIELD / 01</span>
            <span>THRAIZE / 7HR4IZ3</span>
          </div>
          <div className="blueprint-showcase__hero-copy">
            <p>Ink / Blueprint</p>
            <h1>Turn the work into a field.</h1>
            <p className="blueprint-showcase__hero-lede">A full evidence atlas for software that crosses boundaries. Six real builds, drawn together without flattening the difference between them.</p>
            <nav aria-label="Blueprint showcase navigation">
              <a href="#field">Enter the field <span aria-hidden="true">↓</span></a>
              <Link href="/">Back to Signal Cartography <span aria-hidden="true">↗</span></Link>
            </nav>
          </div>
          <div className="blueprint-showcase__hero-count" aria-label="Showcase contents">
            <strong>06</strong>
            <span>approved plates</span>
            <span>one connected practice</span>
          </div>
        </header>

        <section className="blueprint-showcase__field" id="field" aria-labelledby="field-title">
          <div className="blueprint-showcase__section-head">
            <div>
              <span>THE FIELD</span>
              <h2 id="field-title">Screens are coordinates.</h2>
            </div>
            <p>Move across the paper to inspect the registration point. Select any plate to open its complete build record.</p>
          </div>
          <InkBlueprint />
        </section>

        <section className="blueprint-showcase__method" aria-labelledby="method-title">
          <div className="blueprint-showcase__section-head">
            <div>
              <span id="method-title">HOW TO READ IT</span>
              <h2>The drawing is a translation layer.</h2>
            </div>
            <p>It gives the portfolio a visual grammar without turning a screenshot into a promise it cannot prove.</p>
          </div>
          <div className="blueprint-showcase__method-grid">
            {method.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="blueprint-showcase__register" aria-labelledby="register-title">
          <div className="blueprint-showcase__section-head">
            <div>
              <span>THE REGISTER</span>
              <h2 id="register-title">Six plates. Six different crossings.</h2>
            </div>
            <p>Start with the image, then inspect the claim. The register keeps contribution, maturity, and current proof visible at a glance.</p>
          </div>
          <ol>
            {featuredProjects.map((project) => (
              <li key={project.slug}>
                <Link href={`/work/${project.slug}`}>
                  <span>{project.index}</span>
                  <strong>{project.title}</strong>
                  <span>{project.ownership}</span>
                  <span>{project.maturity}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
                <p>{project.proof[0]}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="blueprint-showcase__statement" aria-labelledby="statement-title">
          <span>THE POINT OF VIEW</span>
          <h2 id="statement-title">A screenshot is a proof point. The line tells you why it matters.</h2>
          <p>The field is how I want to show the work: materially, with context, and with enough room for the uncomfortable parts between a good idea and a dependable system.</p>
        </section>

        <footer className="blueprint-showcase__close">
          <div>
            <span>FIELD NOTES COMPLETE</span>
            <h2>Now inspect the builds.</h2>
          </div>
          <div>
            <Link href="/work">Open the work ledger <span aria-hidden="true">↗</span></Link>
            <Link href="/">Return to THRAIZE <span aria-hidden="true">↗</span></Link>
          </div>
        </footer>
      </article>
    </PageShell>
  );
}
