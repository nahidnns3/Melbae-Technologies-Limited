import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "About Melbae Technologies Limited";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: "Company",
    title: "A product company from Bangladesh, built to last.",
  });
}
