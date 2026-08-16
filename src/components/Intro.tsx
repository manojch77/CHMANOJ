import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function Intro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("manoj-intro") === "1";
    if (reduced || seen) {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      sessionStorage.setItem("manoj-intro", "1");
      setDone(true);
    }, 2600);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9998] grid place-items-center bg-ink"
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
        >
          {/* ink spread */}
          <motion.div
            className="absolute h-[40vmax] w-[40vmax] rounded-full"
            style={{ background: "radial-gradient(circle, oklch(0.53 0.176 27.5 / 22%), transparent 62%)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.4, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* grid */}
          <motion.div
            className="absolute inset-0 shoji-grid opacity-0 invert"
            animate={{ opacity: 0.18 }}
            transition={{ duration: 1, delay: 0.9 }}
          />

          <div className="relative flex items-center gap-10">
            {/* seal */}
            <motion.div
              className="grid h-16 w-16 place-items-center seal"
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-display text-2xl">真</span>
            </motion.div>

            {/* vertical japanese */}
            <motion.div
              className="vertical-jp text-paper/80 text-lg"
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1 }}
            >
              DESIGN BUILD SECURE
            </motion.div>

            {/* masked title */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-display text-5xl tracking-[0.18em] text-paper md:text-7xl"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
              >
                MANOJ
              </motion.h1>
            </div>
          </div>

          {/* floating fragments */}
          {[
            { l: "18%", t: "26%", w: 90 },
            { l: "74%", t: "34%", w: 120 },
            { l: "30%", t: "72%", w: 70 },
            { l: "66%", t: "70%", w: 100 },
          ].map((f, i) => (
            <motion.span
              key={i}
              className="absolute border border-paper/25"
              style={{ left: f.l, top: f.t, width: f.w, height: f.w * 0.62 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.6 + i * 0.1 }}
            />
          ))}

          <motion.span
            className="absolute bottom-10 font-mono text-[10px] tracking-[0.4em] text-paper/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
          >
            OPENING THE ARCHIVE
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
