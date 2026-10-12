"use client";

import * as React from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Reveal — entrance motion for blocks, headings and cards.
 * Premium fade recipe (scroll-craft taste floor): opacity 0, a rise of
 * about 16px and a 0.97 scale settle over ~620ms on a hard ease-out,
 * triggered slightly inside the viewport, fired once. Falls back to
 * fully visible content when JS is off or the user prefers reduced
 * motion (the resting styles are applied by GSAP only, never by CSS,
 * so SSR content is always visible).
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 16,
  scale = 0.97,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  once?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y, scale },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.62,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: once ? "play none none none" : "play none play reverse",
            },
          }
        );
        return () => mm.revert();
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Stagger — the group-entrance device. Direct children rise in with a
 * 30–80ms stagger in reading order (scroll-craft taste floor). Use for
 * card grids, step rows and chip clusters. Same SSR / reduced-motion
 * safety as Reveal: GSAP applies the resting state, never CSS.
 */
export function Stagger({
  children,
  className = "",
  step = 60,
  y = 16,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  step?: number;
  y?: number;
  as?: "div" | "ol" | "ul";
}) {
  const ref = React.useRef<HTMLElement>(null);
  const Tag = as;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = Array.from(el.children);
      if (items.length === 0) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          items,
          { autoAlpha: 0, y, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.62,
            ease: "power3.out",
            stagger: Math.min(step, 80) / 1000,
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          }
        );
        return () => mm.revert();
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/**
 * ScrollScaleMedia — the Image Scale & Fade paradigm.
 * Media starts slightly small (scale 0.92) and grows to full size as it
 * travels through the viewport, then gently darkens and recedes as it
 * leaves through the top. Applied to hero-scale photography only.
 */
export function ScrollScaleMedia({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const inner = el.querySelector("[data-scale-target]") ?? el;
        gsap.fromTo(
          inner,
          { scale: 0.92 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 96%",
              end: "center 55%",
              scrub: 0.6,
            },
          }
        );
        gsap.fromTo(
          inner,
          { filter: "brightness(1)", opacity: 1 },
          {
            filter: "brightness(0.72)",
            opacity: 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 12%",
              end: "top -18%",
              scrub: 0.6,
            },
          }
        );
        return () => mm.revert();
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * HeroParallax — the floating hero image panel drifts and scales very
 * slightly against the scroll, giving the asymmetric hero its depth.
 */
export function HeroParallax({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el,
          { y: 0, scale: 1 },
          {
            y: -48,
            scale: 0.97,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              end: "bottom 8%",
              scrub: 0.8,
            },
          }
        );
        return () => mm.revert();
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
