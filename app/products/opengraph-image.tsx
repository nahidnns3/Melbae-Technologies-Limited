import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Melbae products";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ kicker: "Products", title: "What Melbae has built." });
}
