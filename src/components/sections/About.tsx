import { motion } from "motion/react";
import { SectionHeading } from "@/components/SectionHeading";

const DISCIPLINES = [
  { en: "UX research", ja: "調査" },
  { en: "Interaction design", ja: "相互" },
  { en: "Visual design", ja: "視覚" },
  { en: "Prototyping", ja: "試作" },
  { en: "Frontend implementation", ja: "実装" },
  { en: "Firebase systems", ja: "基盤" },
  { en: "Mobile experiences", ja: "携帯" },
  { en: "Linux & cybersecurity", ja: "守護" },
];

export function About() {
  return (
    <section id="about" className="relative px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading ja="私について" en="ABOUT" index="02 / POSITIONING" />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.h3
              className="font-display text-3xl leading-[1.25] tracking-[0.02em] sm:text-[2.6rem]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              I DON'T JUST DESIGN SCREENS.
              <br />
              <span className="text-vermilion">I THINK ABOUT HOW THEY WORK.</span>
            </motion.h3>

            <div className="mt-8 max-w-xl space-y-4 text-[15px] leading-relaxed text-ink/75">
              <p>UI/UX is where I start.</p>
              <p>Technology is how I understand the complete experience.</p>
              <p>
                I work across research, interaction and visual design, then follow the experience into
                prototypes, frontend code, Firebase-backed systems, mobile apps and the Linux machines
                underneath. I don't claim to be a specialist in all of them — knowing how they behave is
                what makes the design honest.
              </p>
            </div>
          </div>

          <div className="paper-sheet relative p-7">
            <span className="label-mono">DISCIPLINES</span>
            <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {DISCIPLINES.map((d, i) => (
                <motion.li
                  key={d.en}
                  className="flex items-baseline gap-3 border-b border-ink/10 pb-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-vermilion" />
                  <span className="text-sm text-ink/80">{d.en}</span>
                </motion.li>
              ))}
            </ul>
            <span className="absolute -right-3 -top-3 grid h-12 w-12 place-items-center seal font-display text-lg">
              真
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
