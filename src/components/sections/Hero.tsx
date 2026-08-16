import { motion } from "motion/react";
import { profile } from "@/data/profile";
import { HeroName } from "@/components/HeroName";

const FRAGMENTS = [
  { label: "FIGMA FRAME", ja: "設計", cls: "left-[4%] top-[22%] w-40 h-24 rotate-[-4deg]" },
  { label: "WIREFRAME", ja: "骨格", cls: "left-[13%] top-[62%] w-32 h-24 rotate-[3deg]" },
  { label: "GPS MAP", ja: "位置", cls: "right-[6%] top-[20%] w-44 h-28 rotate-[3deg]" },
  { label: "EVENT CARD", ja: "催事", cls: "right-[13%] top-[58%] w-36 h-20 rotate-[-3deg]" },
  { label: "MOBILE UI", ja: "携帯", cls: "left-[26%] top-[12%] w-20 h-32 rotate-[5deg]" },
  { label: "TERMINAL", ja: "端末", cls: "right-[26%] top-[74%] w-40 h-20 rotate-[-2deg]" },
  { label: "FIREBASE", ja: "基盤", cls: "left-[34%] top-[80%] w-28 h-16 rotate-[2deg]" },
  { label: "QR", ja: "符号", cls: "right-[34%] top-[10%] w-16 h-16 rotate-[-6deg]" },
];

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-5 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20">
      {/* floating interface fragments */}
      <div aria-hidden className="absolute inset-0 hidden lg:block">
        {FRAGMENTS.map((f, i) => (
          <motion.div
            key={f.label}
            className={`absolute border border-ink/15 bg-paper/40 backdrop-blur-[1px] ${f.cls}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-full flex-col justify-between p-2">
              <span className="font-mono text-[8px] tracking-[0.28em] text-ink/40">{f.label}</span>
              <div className="space-y-1">
                <span className="block h-[2px] w-3/4 bg-ink/15" />
                <span className="block h-[2px] w-1/2 bg-ink/12" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <motion.p
            className="label-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            THE ARCHIVE — 2026
          </motion.p>

          <div className="relative z-10 mt-4">
            <HeroName />
          </div>

          <div className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-4">
            <div>
              {profile.statement.map((line, i) => (
                <div key={line} className="overflow-hidden">
                  <motion.p
                    className="font-display text-2xl leading-tight tracking-[0.14em] sm:text-3xl"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className={i === 2 ? "text-vermilion" : undefined}>{line}</span>
                  </motion.p>
                </div>
              ))}
            </div>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {["01", "02", "03"].map((j) => (
                <span key={j} className="font-mono text-[10px] tracking-[0.3em] text-ink/45">
                  {j}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="mt-10 max-w-xl border-l-2 border-vermilion pl-5"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.15, duration: 0.8 }}
          >
            <p className="font-mono text-[11px] tracking-[0.26em] text-ink/70">
              UI/UX DESIGNER × FRONTEND DEVELOPER
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{profile.support}</p>
            <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-ink/50">CHINTHALA MANOJ</p>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <a
              href="#work"
              data-cursor="project"
              className="border border-ink bg-ink px-5 py-2.5 font-mono text-[10px] tracking-[0.28em] text-paper transition-colors hover:bg-vermilion hover:border-vermilion"
            >
              ENTER THE ARCHIVE →
            </a>
            <a
              href="#contact"
              data-cursor="project"
              className="border border-ink/30 px-5 py-2.5 font-mono text-[10px] tracking-[0.28em] transition-colors hover:border-ink"
            >
              OPEN A CHANNEL
            </a>
          </motion.div>
        </div>

        {/* vertical red seal signature */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative flex h-[420px] w-[112px] flex-col items-center justify-between seal px-3 py-6">
            <span className="font-mono text-[9px] tracking-[0.3em] text-paper/70">SEAL</span>
            <span className="font-display text-[5.5rem] leading-none">真</span>
            <span className="vertical-jp text-[9px] tracking-[0.3em] text-paper/80">DESIGN · BUILD · SECURE</span>
          </div>
          <div className="absolute -inset-2 -z-10 border border-vermilion/30" />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.4em] text-ink/35">
        SCROLL ↓
      </div>
    </section>
  );
}
