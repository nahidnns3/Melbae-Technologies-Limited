import { ImageResponse } from "next/og";

/**
 * Shared Open Graph image renderer. Every page's opengraph-image.tsx calls
 * this with its own title so previews on LinkedIn, Facebook, X and WhatsApp
 * are unmistakably Melbae while individual products keep their identity.
 *
 * Fonts: next/og's Satori cannot read the next/font CSS variables, so the
 * display face is loaded once from Google Fonts' static CSS endpoint at
 * build time. If that fetch fails the image still renders with a fallback.
 */

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png";

const paper = "#f6f4ee";
const ink = "#17191d";
const accent = "#c2401a";
const muted = "#676b74";

async function loadDisplayFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@600&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((r) => r.text());
    const match = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/);
    if (!match?.[1]) return null;
    return await fetch(match[1]).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export async function renderOgImage({
  title,
  kicker,
  product,
}: {
  title: string;
  kicker: string;
  product?: { name: string; ground: string; accent: string; text: string };
}) {
  const font = await loadDisplayFont();
  const bg = product ? product.ground : paper;
  const fg = product ? product.text : ink;
  const acc = product ? product.accent : accent;
  const sub = product ? "rgba(255,255,255,0.7)" : muted;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: bg,
        color: fg,
        padding: "64px 72px",
        fontFamily: font ? "Display" : "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="44" height="44" viewBox="0 0 28 28" fill="none">
          <rect
            x="1.25"
            y="1.25"
            width="25.5"
            height="25.5"
            rx="2"
            stroke={fg}
            strokeWidth="2.5"
          />
          <path d="M14 1.25V26.75M1.25 14H26.75" stroke={fg} strokeWidth="2" />
          <rect x="14" y="1.25" width="12.75" height="12.75" fill={acc} />
        </svg>
        <div
          style={{ display: "flex", fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}
        >
          Melbae
          {product ? (
            <span style={{ marginLeft: 18, color: sub, fontWeight: 600 }}>
              / {product.name}
            </span>
          ) : null}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: acc,
          }}
        >
          <div style={{ width: 28, height: 2, background: acc }} />
          {kicker}
        </div>
        <div
          style={{
            fontSize: title.length > 48 ? 58 : 68,
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: -1.5,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          color: sub,
        }}
      >
        <span>Melbae Technologies Limited</span>
        <span>Dhaka, Bangladesh</span>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: font ? [{ name: "Display", data: font, weight: 600, style: "normal" }] : [],
    },
  );
}
