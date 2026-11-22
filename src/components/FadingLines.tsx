type Line = { left: number; height: number };

/**
 * Hardcoded positions and heights — stable across renders and SSR, no
 * Math.random. Irregular horizontal gaps, varied heights (30px–180px).
 */
const LINES: Line[] = [
  { left: 3, height: 120 },
  { left: 8, height: 60 },
  { left: 14, height: 150 },
  { left: 19, height: 45 },
  { left: 22, height: 90 },
  { left: 27, height: 170 },
  { left: 31, height: 55 },
  { left: 37, height: 130 },
  { left: 42, height: 40 },
  { left: 45, height: 100 },
  { left: 51, height: 160 },
  { left: 58, height: 70 },
  { left: 63, height: 110 },
  { left: 69, height: 35 },
  { left: 74, height: 145 },
  { left: 78, height: 65 },
  { left: 83, height: 95 },
  { left: 88, height: 180 },
  { left: 92, height: 50 },
  { left: 95, height: 125 },
];

/** Decorative texture along the top of the dark footer. */
export function FadingLines() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {LINES.map((line) => (
        <div
          key={line.left}
          className="absolute top-0 w-px bg-line-dark"
          style={{
            left: `${line.left}%`,
            height: `${line.height}px`,
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      ))}
    </div>
  );
}
