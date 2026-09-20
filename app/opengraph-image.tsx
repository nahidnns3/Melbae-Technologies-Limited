import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt =
  "Melbae Technologies Limited — Clear software for the operations people actually run.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: "Technology product company",
    title: "Clear software for the operations people actually run.",
  });
}
