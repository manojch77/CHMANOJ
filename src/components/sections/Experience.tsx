import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionHeading } from "@/components/SectionHeading";
import { experience } from "@/data/profile";

/**
 * Torii gate ledger: each role is a full-width gate panel with a sticky kanji
 * pillar, a scroll-driven ink beam and contributions that brush in one by one.
 */
export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 35%"],
  });
  const beam = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading ja="経験" en="EXPERIENCE" index="03 / SCROLL OF WORK" />

        <div ref={ref} className="mt-16 space-y-16">
          {experience.map((e, i) => (
            <article key={e.company} className="relative grid gap-8 lg:grid-cols-[120px_1fr]">
              {/* pillar */}
              <div className="relative flex flex-row items-center gap-4 lg:h-full lg:flex-col lg:items-start">
                <span className="grid h-12 w-12 shrink-0 place-items-center seal font-mono text-[10px] tracking-[0.1em] seal-pulse">
                  01
                </span>
                <span className="hidden lg:block mt-4 font-mono text-[9px] tracking-[0.24em] text-ink/45">
                  {e.status === "CURRENTLY DESIGNING" ? "ONGOING" : "ARCHIVED"}
                </span>
                <motion.span
                  className="hidden lg:block w-[2px] flex-1 origin-top bg-vermilion/60"
                  style={{ scaleY: beam }}
                />
                <span className="label-mono lg:hidden">{e.period}</span>
              </div>

              {/* gate panel */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden border border-ink/15 paper-sheet"
              >
                {/* gate beam */}
                <div className="flex items-center justify-between border-b-2 border-ink/80 bg-ink px-6 py-3 text-paper">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-paper/60">
                    {String(i + 1).padStart(2, "0")} / ROLE
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-vermilion seal-pulse" />
                    <span className="font-mono text-[10px] tracking-[0.3em] text-vermilion">
                      {e.status}
                    </span>
                  </span>
                </div>

                <div className="relative p-7 sm:p-10">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -top-6 font-display text-[10rem] leading-none text-vermilion/[0.06]"
                  >
                    {e.company}
                  </span>

                  <div className="relative flex flex-wrap items-baseline justify-between gap-4">
                    <h3 className="font-display text-3xl tracking-[0.05em] sm:text-4xl">
                      {e.company}
                    </h3>
                    <span className="label-mono">{e.period}</span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] tracking-[0.28em] text-vermilion">
                    {e.role.toUpperCase()}
                  </p>

                  <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink/75">
                    {e.summary}
                  </p>

                  <div className="mt-8 grid gap-8 border-t border-ink/10 pt-8 sm:grid-cols-2">
                    <div>
                      <span className="label-mono">DESIGN CONTRIBUTION</span>
                      <ul className="mt-4 space-y-3">
                        {e.contributions.map((c, ci) => (
                          <motion.li
                            key={c}
                            initial={{ opacity: 0, x: -18 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.55, delay: ci * 0.09 }}
                            className="group flex items-start gap-3 text-sm text-ink/80"
                          >
                            <span className="mt-2 block h-[2px] w-5 shrink-0 origin-left bg-vermilion transition-transform duration-500 group-hover:scale-x-150" />
                            {c}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="label-mono">TOOLS</span>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {e.tools.map((t, ti) => (
                          <motion.span
                            key={t}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: ti * 0.07 }}
                            className="border border-ink/20 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-ink/70 transition-colors hover:border-vermilion hover:text-vermilion"
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
