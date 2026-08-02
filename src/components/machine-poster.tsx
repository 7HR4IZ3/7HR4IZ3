const posterEvidence = [
  "/projects/kaizen-code.png",
  "/projects/snapshot.svg",
  "/projects/motion-cues.png",
] as const;

export function MachinePoster() {
  return (
    <div className="machine-poster" aria-hidden="true">
      <div className="machine-poster__bed">
        <span className="machine-poster__rail machine-poster__rail--one" />
        <span className="machine-poster__rail machine-poster__rail--two" />
        <span className="machine-poster__rail machine-poster__rail--three" />
        <span className="machine-poster__repo">TH</span>
        {Array.from({ length: 6 }, (_, index) => (
          <span className={`machine-poster__cartridge machine-poster__cartridge--${index + 1}`} key={index}>
            <i />
          </span>
        ))}
        <span className="machine-poster__evidence">
          {posterEvidence.map((src, index) => (
            <i key={src} style={{ backgroundImage: `url(${src})`, zIndex: posterEvidence.length - index }} />
          ))}
        </span>
      </div>
    </div>
  );
}
