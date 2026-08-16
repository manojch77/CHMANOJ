import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { profile } from "@/data/profile";

const EN = "MANOJ";
const JA = "マノージ";

/**
 * Hero headline that swaps MANOJ ↔ マノージ every 10s.
 * Unique transition: each glyph is a hanging noren panel that flips on its
 * vertical axis while an ink wash sweeps across, so the switch reads as a
 * sign being turned rather than a fade.
 */
export function HeroName() {
  const [ja, setJa] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = window.setTimeout(() => setStarted(true), 1200);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => window.clearTimeout(t);
    }
    const id = window.setInterval(() => setJa((v) => !v), 10000);
    return () => {
      window.clearTimeout(t);
      window.clearInterval(id);
    };
  }, []);

  const chars = (ja ? JA : EN).split("");

  return (
    <div className="relative">
      <motion.div
        className="flex flex-wrap items-end pr-[0.14em] pb-[0.08em]"
        initial={{ y: "108%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
      >
        {chars.map((c, i) => (
          <span
            key={`${ja ? "ja" : "en"}-${i}`}
            className="relative inline-block"
            style={{ perspective: 900 }}
          >
            <motion.span
              className="block font-display text-[19vw] leading-[0.86] tracking-[0.02em] sm:text-[15vw] lg:text-[11rem]"
              initial={started ? { rotateY: -92, opacity: 0, filter: "blur(10px)" } : false}
              animate={{ rotateY: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{
                duration: 0.75,
                delay: i * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: "50% 100%" }}
            >
              {c}
            </motion.span>
            {started && (
              <motion.span
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-vermilion/70"
                initial={{ height: "100%", opacity: 1 }}
                animate={{ height: "0%", opacity: 0 }}
                transition={{ duration: 0.7, delay: i * 0.09 + 0.12, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </span>
        ))}
      </motion.div>
      <h1 className="sr-only">{profile.name}</h1>
    </div>
  );
}
