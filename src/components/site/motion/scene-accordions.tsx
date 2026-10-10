"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type Scene = {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  link: { href: string; label: string };
};

/**
 * SceneAccordions — Horizontal Accordions paradigm.
 * Three full-height vertical slices; the hovered or focused slice expands
 * to reveal its photograph and copy while the others collapse to slivers
 * with rotated titles. On small screens it degrades to stacked cards.
 * Keyboard: tabbing into a slice expands it (focus-within).
 */
export function SceneAccordions({ scenes }: { scenes: Scene[] }) {
  const [active, setActive] = React.useState(0);

  return (
    <div className="grid gap-4 lg:grid-cols-3 lg:gap-0 lg:rounded-2xl lg:overflow-hidden">
      {scenes.map((scene, i) => {
        const isActive = active === i;
        return (
          <article
            key={scene.title}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className="group relative isolate overflow-hidden rounded-2xl lg:rounded-none focus-within:ring-2 focus-within:ring-terracotta-700 focus-within:ring-offset-2 focus-within:ring-offset-bone transition-[flex-grow] duration-700 ease-[cubic-bezier(0.2,0,0,1)]"
            style={{ flexGrow: isActive ? 3.4 : 1, flexBasis: 0 }}
            aria-label={`${scene.eyebrow}: ${scene.title}`}
          >
            {/* Mobile card sizing / desktop slice height */}
            <div className="relative aspect-[16/11] lg:aspect-auto lg:h-[560px]">
              <Image
                src={scene.image}
                alt={scene.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover transition-transform duration-700 ease-out ${
                  isActive ? "scale-100" : "scale-[1.06] lg:grayscale-[35%]"
                }`}
              />
              <div
                className={`absolute inset-0 transition-colors duration-700 ${
                  isActive
                    ? "bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10"
                    : "bg-ink/45"
                }`}
              />

              {/* Collapsed: rotated slice title (desktop only) */}
              <div
                className={`absolute inset-0 hidden items-end justify-center pb-8 transition-opacity duration-500 ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
                aria-hidden="true"
              >
                <span
                  className="text-white/90 text-[15px] font-semibold uppercase tracking-[0.14em]"
                  style={{ writingMode: "vertical-rl", rotate: "180deg" }}
                >
                  {scene.title}
                </span>
              </div>

              {/* Expanded content */}
              <div
                className={`absolute inset-x-0 bottom-0 p-6 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                  isActive
                    ? "translate-y-0 opacity-100"
                    : "lg:translate-y-4 lg:opacity-0"
                }`}
              >
                <p className="eyebrow text-mustard">{scene.eyebrow}</p>
                <h3 className="mt-2 text-[26px] sm:text-[32px] leading-tight font-bold text-white">
                  {scene.title}
                </h3>
                <p
                  className={`mt-3 max-w-[46ch] text-[15px] leading-relaxed text-white/85 transition-all delay-100 duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {scene.text}
                </p>
                <Link
                  href={scene.link.href}
                  className="mt-5 inline-flex h-11 items-center gap-2 rounded-md bg-white px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {scene.link.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
