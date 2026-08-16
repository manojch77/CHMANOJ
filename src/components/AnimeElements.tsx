import { motion } from "motion/react";

const PETALS = [
  { x: 6, d: 14, delay: 0, s: 12 },
  { x: 18, d: 19, delay: 3, s: 9 },
  { x: 33, d: 16, delay: 6, s: 14 },
  { x: 51, d: 21, delay: 1.5, s: 10 },
  { x: 67, d: 17, delay: 8, s: 13 },
  { x: 82, d: 22, delay: 4, s: 9 },
  { x: 93, d: 15, delay: 10, s: 12 },
];

/** Anime layer: drifting sakura petals + manga speed lines. */
export function AnimeElements() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* manga speed lines */}
      <div
        className="absolute inset-y-0 left-0 w-1/3 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(100deg, var(--ink) 0 1px, transparent 1px 26px)",
          maskImage: "linear-gradient(to right, black, transparent)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/3 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(80deg, var(--ink) 0 1px, transparent 1px 26px)",
          maskImage: "linear-gradient(to left, black, transparent)",
        }}
      />

      {/* sakura petals */}
      {PETALS.map((p, i) => (
        <motion.span
          key={i}
          className="absolute top-[-8vh] bg-vermilion/25"
          style={{
            left: `${p.x}%`,
            width: p.s,
            height: p.s * 0.7,
            borderRadius: "60% 0 60% 0",
          }}
          initial={{ y: "-10vh", opacity: 0 }}
          animate={{
            y: "115vh",
            x: [0, 26, -18, 12, 0],
            rotate: [0, 120, 240, 360],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: p.d,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
