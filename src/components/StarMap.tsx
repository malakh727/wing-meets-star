import { useState, useMemo } from "react";

export interface StarData {
  slug: string;
  title: string;
  description?: string;
  x: number; // 0–160 (SVG viewBox width)
  y: number; // 0–90  (SVG viewBox height)
  href: string;
}

interface Props {
  stars: StarData[];
}

/** Connect each star to its two nearest neighbours (deduped). */
function computeConnections(stars: StarData[]): [number, number][] {
  if (stars.length < 2) return [];
  const seen = new Set<string>();
  const result: [number, number][] = [];

  for (let i = 0; i < stars.length; i++) {
    const ranked = stars
      .map((s, j) => ({
        j,
        d: Math.hypot(s.x - stars[i].x, s.y - stars[i].y),
      }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);

    for (const { j } of ranked) {
      const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push([i, j]);
      }
    }
  }
  return result;
}

export default function StarMap({ stars }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const connections = useMemo(() => computeConnections(stars), [stars]);

  if (stars.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden rounded"
      style={{ aspectRatio: "16/9", backgroundColor: "#0b0b0c" }}
    >
      {/* Technical grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(66,71,84,0.07) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(66,71,84,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient glow cluster */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "45%",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(173,198,255,0.04) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* SVG — constellation lines + stars */}
      <svg
        viewBox="0 0 160 90"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {/* Constellation lines */}
        {connections.map(([a, b], i) => {
          const A = stars[a];
          const B = stars[b];
          if (!A || !B) return null;
          return (
            <line
              key={i}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="rgba(173,198,255,0.14)"
              strokeWidth="0.25"
              strokeDasharray="1 2"
            />
          );
        })}

        {/* Stars */}
        {stars.map((star, idx) => {
          const isHot = hovered === star.slug;
          return (
            <g
              key={star.slug}
              transform={`translate(${star.x},${star.y})`}
              style={{ cursor: "pointer" }}
              role="button"
              aria-label={`Read: ${star.title}`}
              onMouseEnter={() => setHovered(star.slug)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => (window.location.href = star.href)}
            >
              {/* Outer halo — only visible on hover */}
              <circle
                r={isHot ? 7 : 4.5}
                fill={isHot ? "rgba(233,193,118,0.07)" : "rgba(173,198,255,0.05)"}
                style={{ transition: "r 0.35s ease, fill 0.25s ease" }}
              />
              {/* Mid glow */}
              <circle
                r={isHot ? 3.5 : 2.2}
                fill={
                  isHot
                    ? "rgba(233,193,118,0.18)"
                    : "rgba(173,198,255,0.10)"
                }
                style={{ transition: "r 0.25s ease, fill 0.25s ease" }}
              />
              {/* Core dot */}
              <circle
                r={isHot ? 1.8 : 1.1}
                fill={isHot ? "#E9C176" : "#adc6ff"}
                className="star-core"
                style={{
                  transition: "r 0.2s ease, fill 0.2s ease",
                  animationDelay: `${idx * 0.55}s`,
                  animationDuration: `${2.4 + idx * 0.35}s`,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltips — HTML overlay for rich text & glassmorphism */}
      {stars.map((star) => {
        if (hovered !== star.slug) return null;
        const lx = (star.x / 160) * 100;
        const ty = (star.y / 90) * 100;
        const anchorRight = lx > 62;
        const anchorDown = ty < 38;

        return (
          <div
            key={`tip-${star.slug}`}
            className="absolute pointer-events-none"
            style={{
              left: `${lx}%`,
              top: `${ty}%`,
              transform: `translate(${anchorRight ? "calc(-100% - 10px)" : "14px"}, ${
                anchorDown ? "8px" : "calc(-100% - 8px)"
              })`,
              zIndex: 10,
            }}
          >
            <div
              style={{
                background: "rgba(28,27,27,0.90)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderRadius: "0.5rem",
                padding: "11px 15px",
                minWidth: "170px",
                maxWidth: "230px",
                outline: "1px solid rgba(66,71,84,0.22)",
              }}
            >
              <p
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#E9C176",
                  letterSpacing: "-0.01em",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {star.title}
              </p>
              {star.description && (
                <p
                  style={{
                    fontFamily: '"Newsreader", serif',
                    fontSize: "0.8125rem",
                    color: "#9A9796",
                    marginTop: "5px",
                    lineHeight: 1.55,
                    marginBottom: 0,
                  }}
                >
                  {star.description}
                </p>
              )}
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.68rem",
                  color: "rgba(173,198,255,0.55)",
                  marginTop: "8px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 0,
                }}
              >
                Click to read →
              </p>
            </div>
          </div>
        );
      })}

      {/* Corner label */}
      <div
        className="absolute bottom-3 right-4 pointer-events-none"
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: "0.65rem",
          color: "rgba(154,151,150,0.4)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {stars.length} {stars.length === 1 ? "story" : "stories"} mapped
      </div>
    </div>
  );
}
