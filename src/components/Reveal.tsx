import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/** Scroll-linked section reveal: rises, fades and settles as it enters the viewport. */
export function Reveal({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 55%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.985, 1]);

  return (
    <motion.div ref={ref} id={id} style={{ opacity, y, scale }}>
      {children}
    </motion.div>
  );
}

/** Thin vermilion ink line that tracks page scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-vermilion"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
