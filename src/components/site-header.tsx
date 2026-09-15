import Link from "next/link";
import { siteConfig } from "@/content/site";

const navigation = [
  { href: "/", label: "Desk" },
  { href: "/work", label: "Folders" },
  { href: "/bench", label: "Bench" },
  { href: "/about", label: "About" },
];

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav className={`site-nav site-nav--${mobile ? "mobile" : "desktop"}`} aria-label="Primary navigation">
      {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
      <a href={siteConfig.contact.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
    </nav>
  );
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={overlay ? "site-header site-header--overlay" : "site-header"}>
      <Link className="site-mark" href="/" aria-label={`${siteConfig.alias} home`}><strong>{siteConfig.alias}</strong><span>{siteConfig.handle}</span></Link>
      <NavigationLinks />
      <details className="mobile-nav">
        <summary className="nav-toggle" role="button" aria-label="Menu"><span className="nav-toggle__closed">Menu</span><span className="nav-toggle__open">Close</span></summary>
        <NavigationLinks mobile />
      </details>
    </header>
  );
}
