import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";


const ITEMS = [
  { id: "about", en: "ABOUT", ja: "私について" },
  { id: "work", en: "WORK", ja: "作品" },
  { id: "skills", en: "SKILLS", ja: "技術" },
  { id: "experience", en: "EXPERIENCE", ja: "経験" },
  { id: "contact", en: "CONTACT", ja: "接続" },
];


export function Nav({ standalone = false }: { standalone?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (standalone) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ITEMS.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [standalone]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dark = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="w-full max-w-6xl">
        <nav
          aria-label="Primary"
          className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border transition-all duration-500 lg:flex lg:justify-between ${
            dark
              ? "border-ink/25 bg-ink/90 px-3 py-2 text-paper backdrop-blur-md sm:px-4"
              : "border-ink/12 bg-paper/70 px-3 py-2.5 text-ink backdrop-blur-sm sm:px-5 sm:py-3"
          }`}
        >
          <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3" aria-label="Home">
            <span className="grid h-7 w-7 shrink-0 place-items-center font-display text-[13px] seal">真</span>
            <span
              className={`truncate font-display text-[12px] font-semibold tracking-[0.14em] sm:text-[15px] sm:tracking-[0.18em] ${
                dark ? "text-paper" : "text-ink"
              }`}
            >
              CHINTHALA MANOJ
            </span>
          </Link>


          <ul className="hidden items-end gap-5 lg:flex xl:gap-6">
            {ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={standalone ? `/#${item.id}` : `#${item.id}`}
                    className="group flex flex-col items-center leading-none"
                  >
                    <span
                      className={`font-mono text-[10px] tracking-[0.24em] transition-colors ${
                        isActive ? "text-vermilion" : dark ? "text-paper/80" : "text-ink/75"
                      } group-hover:text-vermilion`}
                    >
                      {item.en}
                    </span>
                    <span
                      className={`mt-1 h-[2px] w-full origin-left bg-vermilion transition-transform duration-500 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={standalone ? "/#contact" : "#contact"}
            data-cursor="project"
            className={`hidden shrink-0 border px-3 py-1.5 font-mono text-[10px] tracking-[0.24em] transition-colors lg:inline-block ${
              dark
                ? "border-paper/30 text-paper hover:bg-paper hover:text-ink"
                : "border-ink/25 text-ink hover:bg-ink hover:text-paper"
            }`}
          >
            OPEN A CHANNEL
          </a>

          {/* mobile / tablet: shoji menu trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            data-cursor="project"
            className={`flex shrink-0 items-center gap-2 border px-2.5 py-1.5 font-mono text-[9px] tracking-[0.2em] transition-colors lg:hidden ${
              dark ? "border-paper/30 text-paper" : "border-ink/25 text-ink"
            }`}
          >
            <span className="flex flex-col gap-[3px]">
              <span
                className={`block h-px w-4 bg-current transition-transform duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`}
              />
              <span className={`block h-px w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`block h-px w-4 bg-current transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
              />
            </span>
            {open ? "CLOSE" : "MENU"}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -8, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, y: -8, clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 border border-ink/20 bg-paper/95 backdrop-blur-md lg:hidden"
            >
              <ul>
                {ITEMS.map((item, i) => (
                  <li key={item.id} className="border-b border-ink/10 last:border-b-0">
                    <a
                      href={standalone ? `/#${item.id}` : `#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between gap-4 px-4 py-3"
                    >
                      <span className="font-mono text-[11px] tracking-[0.26em] text-ink/80">
                        <span className="mr-3 text-vermilion/70">{String(i + 1).padStart(2, "0")}</span>
                        {item.en}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
