"use client";

import type { ComponentPropsWithoutRef } from "react";
import { track, type SiteEvent } from "@/lib/analytics";
import { ButtonLink } from "./button";

/**
 * A ButtonLink that records a lightweight analytics event on click.
 */
export function TrackLink({
  event,
  ...props
}: ComponentPropsWithoutRef<typeof ButtonLink> & { event: SiteEvent }) {
  return <ButtonLink {...props} onClick={() => track(event)} />;
}
