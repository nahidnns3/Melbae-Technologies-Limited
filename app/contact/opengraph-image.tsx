import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Contact Melbae";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ kicker: "Contact", title: "Talk to Melbae." });
}
