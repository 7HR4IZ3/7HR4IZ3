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
  size?: "lg" | "md" | "sm";
  tape?: "top" | "corner" | "double";
};

export function DeskPlate({ href, index, title, premise, meta, image, rotation, style, size = "md", tape = "top" }: DeskPlateProps) {
  return (
    <Link
      href={href}
      className={`desk-plate desk-plate--${size} desk-plate--tape-${tape}`}
      style={{ transform: `rotate(${rotation})`, ...style }}
      aria-label={`${title}: ${premise}`}
    >
      {tape === "double" ? (
        <>
          <span className="desk-plate__tape desk-plate__tape--a" aria-hidden="true" />
          <span className="desk-plate__tape desk-plate__tape--b" aria-hidden="true" />
        </>
      ) : (
        <span className={`desk-plate__tape ${tape === "corner" ? "desk-plate__tape--corner" : ""}`} aria-hidden="true" />
      )}
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
