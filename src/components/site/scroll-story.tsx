"use client";

import * as React from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FootprintIcon } from "@/components/site/logo";

type Scene = {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  link: { href: string; label: string };
};

/**
 * The three-scene scroll story: Coast, Desert, Wild.
 * Sticky image panels that cross-fade as you scroll; motion explains
 * place, never decorates. Reduced-motion users get static panels.
 */
export function ScrollStory({ scenes }: { scenes: Scene[] }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  const sceneIndex = useTransform(scrollYProgress, [0.1, 0.9], [0, scenes.length - 1]);

  return (
    <div ref={containerRef} className="relative">
      <div className="sticky top-16 lg:top-20 h-[78vh] min-h-[480px] overflow-hidden rounded-xl bg-ink">
        {scenes.map((scene, i) => (
          <SceneLayer
            key={scene.title}
            scene={scene}
            index={i}
            total={scenes.length}
            progress={scrollYProgress}
            sceneIndex={sceneIndex}
            reduced={reduced}
          />
        ))}
      </div>
      {/* Scroll track: one viewport-height per scene */}
      <div style={{ height: `${scenes.length * 90}vh` }} aria-hidden="true" />
      {/* Screen-reader friendly content */}
      <div className="sr-only">
        {scenes.map((s) => (
          <section key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

function SceneLayer({
  scene,
  index,
  total,
  progress,
  sceneIndex,
  reduced,
}: {
  scene: Scene;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  sceneIndex: ReturnType<typeof useTransform<number, number>>;
  reduced: boolean;
}) {
  // Each scene owns a slice of the scroll range.
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;

  const opacity = useTransform(
    progress,
    [Math.max(start - seg * 0.4, 0), start + seg * 0.15, end - seg * 0.1, Math.min(end + seg * 0.3, 1)],
    index === 0 ? [1, 1, 1, 0] : index === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );
  const scale = useTransform(progress, [start, end], [1.02, 1.12]);
  const textY = useTransform(progress, [start, start + seg * 0.3], [32, 0]);

  const visible =
    index === 0 ||
    (typeof sceneIndex.get() === "number" && Math.round(sceneIndex.get()) === index);

  return (
    <motion.div
      className="absolute inset-0"
      style={reduced ? { opacity: index === 0 ? 1 : visible ? 1 : 0 } : { opacity }}
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { scale }}
      >
        <Image
          src={scene.image}
          alt={scene.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 scrim" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/20" />
      </motion.div>
      <motion.div
        className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-16"
        style={reduced ? undefined : { y: textY }}
      >
        <div className="max-w-xl">
          <p className="eyebrow text-mustard">{scene.eyebrow}</p>
          <h3 className="mt-2 text-[32px] leading-[38px] sm:text-[38px] sm:leading-[44px] font-bold text-white">
            {scene.title}
          </h3>
          <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-white/85">
            {scene.text}
          </p>
          <Link
            href={scene.link.href}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-md bg-white px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {scene.link.label}
            <FootprintIcon className="h-4 w-auto" color="var(--terracotta)" />
          </Link>
        </div>
      </motion.div>
      {/* Scene counter */}
      <div className="absolute right-6 top-6 sm:right-10 sm:top-10 flex items-center gap-2" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-8 bg-mustard" : "w-3 bg-white/40"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
