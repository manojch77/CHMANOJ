import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

export type Screen = { title: string; meta: string; caption: string };

export function ScreenViewer({
  screens,
  index,
  projectTitle,
  onClose,
  onIndex,
}: {
  screens: Screen[];
  index: number | null;
  projectTitle: string;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index! + 1) % screens.length);
      if (e.key === "ArrowLeft") onIndex((index! - 1 + screens.length) % screens.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, screens.length, onClose, onIndex]);

  const current = open ? screens[index!] : null;

  return (
    <AnimatePresence>
      {open && current ? (
        <motion.div
          className="fixed inset-0 z-[9000] flex flex-col bg-ink/97 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} — ${current.title}`}
        >
          <div className="flex items-start justify-between border-b border-paper/12 px-4 py-3 sm:px-6 sm:py-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-paper/45">SCREEN</span>
              <h3 className="font-display text-xl tracking-[0.1em] text-paper">{projectTitle}</h3>
            </div>
            <div className="text-right">
              <p className="font-display text-sm text-paper">{current.title}</p>
              <p className="font-mono text-[10px] tracking-[0.24em] text-paper/50">{current.meta}</p>
              <button
                onClick={onClose}
                className="mt-2 font-mono text-[10px] tracking-[0.3em] text-paper/60 hover:text-vermilion"
              >
                CLOSE ✕
              </button>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center p-8">
            <motion.figure
              key={current.title}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-full w-full max-w-3xl border border-paper/15 bg-paper p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
            >
              <div className="flex aspect-[16/10] flex-col justify-between border border-ink/12 bg-paper-deep/60 p-6">
                <span className="label-mono">{current.meta}</span>
                <div className="space-y-2">
                  <span className="block h-3 w-2/3 bg-ink/12" />
                  <span className="block h-3 w-1/2 bg-ink/10" />
                  <span className="block h-3 w-3/4 bg-ink/8" />
                </div>
              </div>
              <figcaption className="mt-4 text-sm text-ink/70">{current.caption}</figcaption>
            </motion.figure>
          </div>

          <div className="flex items-center justify-center gap-6 border-t border-paper/12 px-4 py-3 sm:gap-8 sm:px-6 sm:py-4">
            <button
              onClick={() => onIndex((index! - 1 + screens.length) % screens.length)}
              className="font-mono text-[10px] tracking-[0.3em] text-paper/70 hover:text-vermilion"
            >
              ← PREVIOUS
            </button>
            <span className="font-mono text-[10px] tracking-[0.3em] text-paper/40">
              {String(index! + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => onIndex((index! + 1) % screens.length)}
              className="font-mono text-[10px] tracking-[0.3em] text-paper/70 hover:text-vermilion"
            >
              NEXT →
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
