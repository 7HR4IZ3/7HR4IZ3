import Link from "next/link";
import { siteConfig } from "@/content/site";

const contactHref = `mailto:${siteConfig.contact.email}`;

export function DeskEdge() {
  return (
    <nav className="desk-edge" aria-label="Desk">
      <div className="desk-edge__inner">
        <div className="desk-edge__links">
          <Link href="/#/">desk</Link>
          <span aria-hidden="true">·</span>
          <Link href="/#/work">folders</Link>
          <span aria-hidden="true">·</span>
          <Link href="/#/bench">bench</Link>
          <span aria-hidden="true">·</span>
          <Link href="/#/about">about</Link>
        </div>
        <Link className="desk-edge__mark" href="/#/" aria-label="THRAIZE home">
          — THRAIZE <span>{siteConfig.handle}</span> —
        </Link>
        <a className="desk-edge__email" href={contactHref}>
          {siteConfig.contact.email}
        </a>
      </div>
    </nav>
  );
}
