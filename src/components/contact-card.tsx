import { siteConfig } from "@/content/site";

const contactHref = `mailto:${siteConfig.contact.email}`;

export function ContactCard({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="contact-card" style={style} role="note" aria-label="Contact">
      <span className="contact-card__label">Open to the next difficult thing</span>
      <strong>Let&apos;s build something useful.</strong>
      <p>{siteConfig.availability}</p>
      <a href={contactHref}>{siteConfig.contact.email}</a>
      <div className="contact-card__links">
        <a href={siteConfig.contact.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a href={siteConfig.contact.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a href={siteConfig.contact.x} target="_blank" rel="noreferrer">
          X ↗
        </a>
      </div>
    </div>
  );
}
