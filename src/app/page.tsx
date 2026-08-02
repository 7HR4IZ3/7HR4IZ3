import { HomeExperience } from "@/components/home-experience";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/content/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: [siteConfig.alias, siteConfig.handle],
    jobTitle: siteConfig.title,
    address: { "@type": "PostalAddress", addressCountry: "NG" },
    url: siteConfig.url,
    sameAs: [
      siteConfig.contact.github,
      siteConfig.contact.linkedin,
      siteConfig.contact.upwork,
      siteConfig.contact.x,
    ],
    knowsAbout: [
      "Full-stack product engineering",
      "Mobile runtimes",
      "AI developer tools",
      "Spatial computing",
      "Web platforms",
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader overlay />
      <HomeExperience />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
