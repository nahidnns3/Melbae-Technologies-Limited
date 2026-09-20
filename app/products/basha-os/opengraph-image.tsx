import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt =
  "Basha OS, a Melbae product — one system for running a residential building.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: "Residential property operations",
    title: "One system for running a residential building.",
    product: { name: "Basha OS", ground: "#1c2420", accent: "#6fcf97", text: "#ecefea" },
  });
}
