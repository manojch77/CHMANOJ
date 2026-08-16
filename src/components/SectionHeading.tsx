import { motion } from "motion/react";

export function SectionHeading({
  ja,
  en,
  index,
  note,
}: {
  ja: string;
  en: string;
  index?: string;
  note?: string;
}) {
  return (
    <div className="flex items-start gap-4 sm:gap-6">
      <span aria-hidden className="mt-2 hidden h-[2px] w-8 shrink-0 bg-vermilion sm:block" />
      <div className="min-w-0">
        {index ? <span className="label-mono block">{index}</span> : null}
        <motion.h2
          className="font-display text-3xl tracking-[0.06em] sm:text-5xl sm:tracking-[0.08em]"

          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {en}
        </motion.h2>
        <motion.span
          className="mt-3 block h-[2px] w-24 origin-left bg-vermilion"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
        {note ? <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/65">{note}</p> : null}
      </div>
    </div>
  );
}
