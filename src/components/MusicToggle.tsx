import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import bgm from "@/assets/bgm.mp3.asset.json";

/**
 * Katana rack sound switch.
 * Off = blade sheathed in its lacquer saya. On = blade drawn, vermilion edge lit,
 * sound ripples radiating from the seal.
 */
export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const a = new Audio(bgm.url);
    a.loop = true;
    a.volume = 0.35;
    audioRef.current = a;
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
    } else {
      void a
        .play()
        .then(() => setOn(true))
        .catch(() => setOn(false));
    }
  };

  return (
    <div className="fixed bottom-3 right-3 z-40 flex origin-bottom-right scale-[0.62] flex-col items-center gap-3 sm:bottom-6 sm:right-6 sm:z-50 sm:scale-100">
      {/* sound ripples */}
      <div className="pointer-events-none relative h-0 w-0">
        <AnimatePresence>
          {on &&
            [0, 0.7, 1.4].map((d) => (
              <motion.span
                key={d}
                className="absolute left-1/2 top-10 h-10 w-10 -translate-x-1/2 rounded-full border border-vermilion/45"
                initial={{ scale: 0.3, opacity: 0.7 }}
                animate={{ scale: 2.4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.1, delay: d, repeat: Infinity, ease: "easeOut" }}
              />
            ))}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? "Sheathe the blade — sound off" : "Draw the blade — sound on"}
        data-cursor="project"
        className="group relative flex flex-col items-center outline-none"
      >
        {/* wall rack */}
        <span
          className={`relative grid h-40 w-14 place-items-center overflow-hidden border transition-colors duration-500 ${
            on ? "border-vermilion/60 ink-sheet" : "border-ink/20 paper-sheet"
          }`}
        >
          {/* rack notches */}
          <span className="absolute inset-x-2 top-3 h-px bg-current opacity-15" />
          <span className="absolute inset-x-2 bottom-3 h-px bg-current opacity-15" />

          {/* saya (scabbard) */}
          <span
            className={`absolute left-1/2 top-6 h-24 w-[9px] -translate-x-1/2 rounded-full transition-opacity duration-500 ${
              on ? "opacity-25" : "opacity-70"
            } ${on ? "bg-paper" : "bg-ink"}`}
          />

          {/* blade */}
          <motion.span
            className="absolute left-1/2 w-[3px] origin-bottom rounded-full bg-vermilion"
            initial={false}
            animate={
              on
                ? { height: 92, y: -34, rotate: -18, opacity: 1 }
                : { height: 34, y: 4, rotate: 0, opacity: 0.35 }
            }
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ bottom: 46, x: "-50%" }}
          />
          {/* edge glow when drawn */}
          <motion.span
            className="pointer-events-none absolute left-1/2 w-6 -translate-x-1/2 rounded-full bg-vermilion blur-md"
            initial={false}
            animate={{ opacity: on ? 0.4 : 0, height: on ? 96 : 20 }}
            transition={{ duration: 0.6 }}
            style={{ bottom: 42 }}
          />

          {/* tsuka (handle) + tsuba */}
          <motion.span
            className="absolute left-1/2 flex flex-col items-center"
            initial={false}
            animate={on ? { y: -46, rotate: -18 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ bottom: 12, x: "-50%" }}
          >
            <span className={`h-[3px] w-7 ${on ? "bg-gold" : "bg-ink/70"}`} />
            <span
              className={`mt-[2px] h-8 w-[7px] rounded-sm ${on ? "bg-paper/80" : "bg-ink/80"}`}
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent 0 3px, oklch(0.53 0.176 27.5 / 45%) 3px 4px)",
              }}
            />
          </motion.span>

          {/* seal / status kanji */}
          <span
            className={`absolute bottom-1 left-1/2 -translate-x-1/2 font-display text-[11px] tracking-[0.1em] transition-colors duration-500 ${
              on ? "text-vermilion" : "text-ink/35"
            }`}
          >
            {on ? "ON" : "OFF"}
          </span>
        </span>

        {/* label strip */}
        <span
          className={`mt-2 border px-2 py-1 font-mono text-[9px] tracking-[0.26em] transition-colors duration-500 ${
            on
              ? "border-vermilion/50 bg-ink/90 text-paper"
              : "border-ink/20 bg-paper/85 text-ink/70 group-hover:border-vermilion/50 group-hover:text-vermilion"
          }`}
        >
          {on ? "SOUND ON" : "SOUND OFF"}
        </span>
      </button>
    </div>
  );
}
