import type { Metadata } from "next";
import { BlueprintShowcasePage } from "@/components/blueprint-showcase-page";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Ink Blueprint Showcase",
  description: "A full evidence atlas of six THRAIZE builds, drawn as an interactive ink and blueprint field.",
  alternates: { canonical: `${siteConfig.url}/showcase/ink-blueprint` },
  openGraph: {
    title: `Ink Blueprint Showcase | ${siteConfig.alias}`,
    description: "A full evidence atlas of six THRAIZE builds, drawn as an interactive ink and blueprint field.",
    type: "website",
  },
};

export default function InkBlueprintShowcasePage() {
  return <BlueprintShowcasePage />;
}
