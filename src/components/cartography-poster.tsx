const posterEvidence = [
  "/projects/kaizen-code.png",
  "/projects/snapshot.svg",
  "/projects/motion-cues.png",
] as const;

export function CartographyPoster() {
  return (
    <div className="cartography-poster" aria-hidden="true">
      <span className="cartography-poster__line cartography-poster__line--one" />
      <span className="cartography-poster__line cartography-poster__line--two" />
      <span className="cartography-poster__line cartography-poster__line--three" />
      {posterEvidence.map((src, index) => (
        <span
          className={`cartography-poster__screen cartography-poster__screen--${index + 1}`}
          key={src}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
    </div>
  );
}
