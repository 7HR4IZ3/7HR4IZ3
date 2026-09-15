import Link from "next/link";

type DeskPlateProps = {
  href: string;
  index: string;
  title: string;
  premise: string;
  meta: string;
  image: { src: string; alt: string };
  rotation: string;
  style?: React.CSSProperties;
};

export function DeskPlate({ href, index, title, premise, meta, image, rotation, style }: DeskPlateProps) {
  return (
    <Link
      href={href}
      className="desk-plate"
      style={{ transform: `rotate(${rotation})`, ...style }}
      aria-label={`${title}: ${premise}`}
    >
      <span className="desk-plate__tape" aria-hidden="true" />
      <figure className="desk-plate__frame">
        {/* eslint-disable @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} loading="lazy" />
      </figure>
      <figcaption>
        <span className="desk-plate__meta">
          {index} — {meta}
        </span>
        <strong>{title}</strong>
        <span>{premise}</span>
      </figcaption>
    </Link>
  );
}
