"use client";

import * as React from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK, ScrollTrigger } from "@/lib/gsap";

export type GalleryItem = {
  image: string;
  alt: string;
  caption: string;
};

/**
 * InlineImage — a pill-shaped photograph embedded inside a line of giant
 * editorial type (Inline Typography Images paradigm). Rendered as a span so
 * it flows with the words.
 */
export function InlineImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={alt}
      className={`inline-image ${className}`}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}

/**
 * PinnedManifesto — Scroll Pinning paradigm.
 * On large screens the editorial statement column stays pinned while the
 * gallery column of tall photographs scrolls past it, each frame scaling up
 * as it arrives and receding as it leaves. On small screens the two simply
 * stack in reading order, fully visible without motion.
 */
export function PinnedManifesto({
  children,
  gallery,
}: {
  children: React.ReactNode;
  gallery: GalleryItem[];
}) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const leftRef = React.useRef<HTMLDivElement>(null);
  const rightRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const left = leftRef.current;
      const right = rightRef.current;
      if (!section || !left || !right) return;

      const mm = gsap.matchMedia();

      // Desktop: pin the statement column; the gallery scrolls past it.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top+64",
          end: () => `+=${right.offsetHeight - left.offsetHeight}`,
          pin: left,
          pinSpacing: false,
          anticipatePin: 1,
        });

        // Gallery frames: grow in, darken out (Image Scale & Fade).
        right.querySelectorAll<HTMLElement>("[data-frame]").forEach((frame) => {
          const media = frame.querySelector("[data-scale-target]") ?? frame;
          gsap.fromTo(
            media,
            { scale: 0.9 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top 95%", end: "center 62%", scrub: 0.5 },
            }
          );
          gsap.fromTo(
            frame,
            { filter: "brightness(1)", opacity: 1 },
            {
              filter: "brightness(0.75)",
              opacity: 0.4,
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top 14%", end: "top -22%", scrub: 0.5 },
            }
          );
        });

        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative bg-ink text-white">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div ref={leftRef} className="pt-24 pb-16 lg:py-32 lg:sticky-none">
            {children}
          </div>
          <div ref={rightRef} className="pb-24 lg:pb-32 space-y-20 lg:pt-32">
            {gallery.map((item) => (
              <figure key={item.image} data-frame className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    data-scale-target
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4 text-[14px] font-medium uppercase tracking-[0.08em] text-white/50">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
