import Link from "next/link";
import { contactHref, siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{siteConfig.alias}</strong>
        <span>{siteConfig.handle} / {siteConfig.name}</span>
        <p>Full-stack engineer building unusual, useful software.</p>
      </div>
      <nav className="site-footer__links" aria-label="Footer navigation">
        <a href={contactHref}>Email</a>
        <a href={siteConfig.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={siteConfig.contact.upwork} target="_blank" rel="noreferrer">Upwork</a>
        <a href={siteConfig.contact.x} target="_blank" rel="noreferrer">X</a>
        <Link href="/work">Work</Link>
        <Link href="/bench">Bench</Link>
      </nav>
    </footer>
  );
}
