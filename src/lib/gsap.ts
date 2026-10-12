/**
 * Shared GSAP setup. Imported by every motion component so plugins are
 * registered exactly once on the client.
 */
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Mobile: ignore URL-bar show/hide resizes so pinned stages never jump.
  ScrollTrigger.config({ ignoreMobileResize: true });
  // Recalculate trigger positions once fonts and images have settled.
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger, useGSAP };

/** Motion is allowed only when the user has not asked for reduced motion. */
export const MOTION_OK =
  "(prefers-reduced-motion: no-preference)";
