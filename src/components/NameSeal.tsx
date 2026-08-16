import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/profile";

/** Cycles the name between English and Japanese every 10 seconds with an ink-brush transition. */
export function NameSeal({
  className = "",
  short = false,
}: {
  className?: string;
  short?: boolean;
}) {
  const [ja, setJa] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setJa((v) => !v), 10000);
    return () => window.clearInterval(id);
  }, []);

  const en = short ? profile.nameShort : profile.name.toUpperCase();
  const jp = short ? "マノージ" : profile.nameJa;
  const text = ja ? jp : en;
  const widest = jp.length > en.length ? jp : en;

  return (
    <span className={`relative inline-flex items-center overflow-hidden ${className}`}>
      <span className="invisible whitespace-nowrap" aria-hidden>
        {widest}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          className="absolute inset-0 flex items-center whitespace-nowrap"
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{short ? profile.nameShort : profile.name}</span>
    </span>
  );
}
