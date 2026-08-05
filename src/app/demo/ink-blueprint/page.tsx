import type { Metadata } from "next";
import Link from "next/link";
import { InkBlueprint } from "@/components/ink-blueprint";
import { PageShell } from "@/components/page-shell";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Ink Blueprint Field",
  description: "A visual direction study for the THRAIZE portfolio homepage.",
  openGraph: {
    title: `Ink Blueprint Field | ${siteConfig.alias}`,
    description: "A visual direction study for the THRAIZE portfolio homepage.",
    type: "website",
  },
};

export default function InkBlueprintPage() {
  return (
    <PageShell>
      <article className="blueprint-demo">
        <header className="blueprint-demo__intro">
          <p>Visual direction study</p>
          <h1>Draw the system before you build it.</h1>
          <div>
            <p>A quiet technical field where screenshots become annotated plates and the connections between them become the story.</p>
            <Link href="/">Return to Signal Cartography <span aria-hidden="true">↗</span></Link>
          </div>
        </header>
        <InkBlueprint />
        <section className="blueprint-demo__notes" aria-labelledby="blueprint-notes-title">
          <h2 id="blueprint-notes-title">A second language for the same practice.</h2>
          <div>
            <p><strong>Material</strong> Screens remain real evidence. The drawing layer gives them context without pretending to be the product.</p>
            <p><strong>Movement</strong> Pointer position shifts the field slightly, like a sheet under a drafting light. Reduced motion leaves the plates still.</p>
            <p><strong>Use</strong> This direction is better when the homepage should feel considered, legible, and closer to a working notebook than a showroom.</p>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
