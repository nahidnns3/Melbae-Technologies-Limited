import type { CSSProperties } from "react";

/**
 * Hero graphic: scattered fragments on the left settle into an ordered
 * ledger on the right. Pure SVG + CSS keyframes; static under
 * prefers-reduced-motion. Decorative, so hidden from assistive tech; the
 * hero copy carries the meaning.
 */

type Fragment = {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  lines: number;
  fromX: number;
  fromY: number;
  fromR: number;
  delay: number;
};

const fragments: Fragment[] = [
  {
    x: 18,
    y: 46,
    w: 96,
    h: 64,
    r: -6,
    lines: 3,
    fromX: -18,
    fromY: -10,
    fromR: -10,
    delay: 0,
  },
  {
    x: 132,
    y: 22,
    w: 80,
    h: 52,
    r: 4,
    lines: 2,
    fromX: 10,
    fromY: -16,
    fromR: 8,
    delay: 90,
  },
  {
    x: 40,
    y: 150,
    w: 112,
    h: 70,
    r: 3,
    lines: 4,
    fromX: -16,
    fromY: 12,
    fromR: 6,
    delay: 160,
  },
  {
    x: 168,
    y: 120,
    w: 72,
    h: 72,
    r: -8,
    lines: 3,
    fromX: 14,
    fromY: 8,
    fromR: -12,
    delay: 240,
  },
  {
    x: 22,
    y: 262,
    w: 88,
    h: 56,
    r: 7,
    lines: 2,
    fromX: -12,
    fromY: 18,
    fromR: 10,
    delay: 320,
  },
  {
    x: 140,
    y: 236,
    w: 104,
    h: 62,
    r: -3,
    lines: 3,
    fromX: 12,
    fromY: 16,
    fromR: -6,
    delay: 400,
  },
];

const rows = 7;
const ledger = { x: 372, y: 44, w: 248, rowH: 40, headH: 36 };

export function FieldGraphic({ className }: { className?: string }) {
  const ledgerH = ledger.headH + rows * ledger.rowH;
  return (
    <svg
      viewBox="0 0 640 380"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <defs>
        <clipPath id="ledger-clip">
          <rect x={ledger.x} y={ledger.y} width={ledger.w} height={ledgerH} rx="4" />
        </clipPath>
      </defs>

      {/* Fragments */}
      {fragments.map((f, i) => {
        const style = {
          "--from-x": `${f.fromX}px`,
          "--from-y": `${f.fromY}px`,
          "--from-r": `${f.fromR}deg`,
          animation: `mb-settle 900ms var(--ease-out) ${f.delay}ms both`,
          transformOrigin: `${f.x + f.w / 2}px ${f.y + f.h / 2}px`,
          transformBox: "view-box",
        } as CSSProperties;
        return (
          <g
            key={i}
            style={style}
            transform={`rotate(${f.r} ${f.x + f.w / 2} ${f.y + f.h / 2})`}
          >
            <rect
              x={f.x}
              y={f.y}
              width={f.w}
              height={f.h}
              rx="3"
              fill="var(--color-paper-elevated)"
              stroke="var(--color-line-strong)"
              strokeWidth="1"
            />
            {Array.from({ length: f.lines }).map((_, li) => (
              <line
                key={li}
                x1={f.x + 12}
                x2={f.x + f.w - 12 - (li === f.lines - 1 ? f.w * 0.3 : 0)}
                y1={f.y + 16 + li * 13}
                y2={f.y + 16 + li * 13}
                stroke="var(--color-line-strong)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ))}
          </g>
        );
      })}

      {/* Connectors */}
      {[
        { from: [114, 78], to: [ledger.x, ledger.y + ledger.headH + 20] },
        { from: [212, 48], to: [ledger.x, ledger.y + ledger.headH + 60] },
        { from: [152, 185], to: [ledger.x, ledger.y + ledger.headH + 100] },
        { from: [240, 156], to: [ledger.x, ledger.y + ledger.headH + 140] },
        { from: [110, 290], to: [ledger.x, ledger.y + ledger.headH + 180] },
        { from: [244, 267], to: [ledger.x, ledger.y + ledger.headH + 220] },
      ].map((c, i) => {
        const [x1, y1] = c.from as [number, number];
        const [x2, y2] = c.to as [number, number];
        const cx = (x1 + x2) / 2;
        const d = `M${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
        const style = {
          "--draw-length": 360,
          strokeDasharray: 360,
          animation: `mb-draw var(--dur-draw) var(--ease-standard) ${500 + i * 70}ms both`,
        } as CSSProperties;
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="var(--color-line-strong)"
            strokeWidth="1"
            style={style}
          />
        );
      })}

      {/* Ledger */}
      <g
        style={
          { animation: "mb-fade 600ms var(--ease-standard) 400ms both" } as CSSProperties
        }
      >
        <rect
          x={ledger.x}
          y={ledger.y}
          width={ledger.w}
          height={ledgerH}
          rx="4"
          fill="var(--color-paper-elevated)"
          stroke="var(--color-ink)"
          strokeWidth="1.25"
        />
        <g clipPath="url(#ledger-clip)">
          <rect
            x={ledger.x}
            y={ledger.y}
            width={ledger.w}
            height={ledger.headH}
            fill="var(--color-ink)"
          />
          {[0, 1, 2].map((c) => (
            <rect
              key={c}
              x={ledger.x + 16 + c * 78}
              y={ledger.y + 15}
              width={c === 0 ? 46 : 34}
              height="6"
              rx="1.5"
              fill="var(--color-paper-on-ink-muted)"
            />
          ))}
          {Array.from({ length: rows }).map((_, r) => {
            const y = ledger.y + ledger.headH + r * ledger.rowH;
            const style = {
              animation: `mb-rise 480ms var(--ease-out) ${700 + r * 60}ms both`,
            } as CSSProperties;
            return (
              <g key={r} style={style}>
                {r > 0 ? (
                  <line
                    x1={ledger.x}
                    x2={ledger.x + ledger.w}
                    y1={y}
                    y2={y}
                    stroke="var(--color-line)"
                    strokeWidth="1"
                  />
                ) : null}
                <rect
                  x={ledger.x + 16}
                  y={y + 17}
                  width="52"
                  height="6"
                  rx="1.5"
                  fill="var(--color-ink-secondary)"
                />
                <rect
                  x={ledger.x + 94}
                  y={y + 17}
                  width="36"
                  height="6"
                  rx="1.5"
                  fill="var(--color-line-strong)"
                />
                <rect
                  x={ledger.x + 172}
                  y={y + 14}
                  width={r % 3 === 1 ? 44 : 30}
                  height="12"
                  rx="2"
                  fill={
                    r % 3 === 1 ? "var(--color-accent)" : "var(--color-surface-strong)"
                  }
                />
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
}
