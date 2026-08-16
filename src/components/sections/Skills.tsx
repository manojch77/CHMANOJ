import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "@/components/SectionHeading";
import { skillSheets } from "@/data/profile";

/**
 * Dojo scroll rack: a vertical column of kanji "plates" on the left selects a
 * discipline; the right side unrolls that discipline as an ink-line ledger.
 */
export function Skills() {
  const [active, setActive] = useState(0);
  const sheet = skillSheets[active]!;

  return (
    <section id="skills" className="relative px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          ja="技術"
          en="THE STACK"
          index="04 / TOOLS"
          note="Select a discipline plate. Each scroll unrolls the tools of that layer and where they were used."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[auto_1fr]">
          {/* plate rack */}
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {skillSheets.map((s, i) => {
              const on = i === active;
              return (
                <motion.button
                  key={s.en}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  data-cursor="project"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`group relative flex shrink-0 items-center gap-3 border px-4 py-3 text-left transition-all duration-500 ${
                    on
                      ? "border-vermilion bg-ink text-paper lg:translate-x-3"
                      : "border-ink/15 bg-paper/60 text-ink/70 hover:border-ink/40"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${on ? "bg-vermilion" : "bg-ink/25"}`}
                  />
                  <span className="font-mono text-[10px] tracking-[0.24em]">{s.en}</span>
                  <span
                    className={`font-mono text-[9px] ${on ? "text-paper/45" : "text-ink/30"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`absolute -left-[1px] top-0 h-full w-[3px] origin-top bg-vermilion transition-transform duration-500 ${
                      on ? "scale-y-100" : "scale-y-0"
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* unrolled scroll */}
          <div className="relative min-h-[420px] overflow-hidden border border-ink/15 paper-sheet p-7 sm:p-10">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-4 bottom-0 font-display text-[9rem] leading-none text-ink/[0.05] sm:text-[13rem]"
            >
              {sheet.en}
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={sheet.en}
                initial={{ opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-3xl tracking-[0.1em] sm:text-4xl">{sheet.en}</h3>
                  <span className="label-mono">{sheet.items.length} TOOLS</span>
                </div>
                <span className="mt-4 block h-[2px] w-full bg-ink/10">
                  <motion.span
                    className="block h-full bg-vermilion"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    style={{ transformOrigin: "left" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>

                <ul className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                  {sheet.items.map((item, i) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                      className="group border-b border-ink/10 pb-3"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-lg tracking-[0.04em] transition-colors group-hover:text-vermilion">
                          {item.name}
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.22em] text-vermilion/80">
                          {item.where}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-ink/60">{item.note}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
