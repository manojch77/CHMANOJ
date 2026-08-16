import { useEffect, useState } from "react";

/** Layered depth background: washi grain, shoji grid, sumi ink, fog, particles, coordinates, seals. */
export function Atmosphere() {
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* 01 washi grain */}
      <div className="absolute inset-0 washi" />

      {/* 02 shoji grid */}
      <div
        className="absolute inset-[-10%] shoji-grid opacity-70"
        style={{ transform: `translate3d(0, ${y * -0.04}px, 0)` }}
      />

      {/* 03 moving sumi ink */}
      <div
        className="absolute -left-[15%] top-[8%] h-[60vh] w-[60vw] rounded-full ink-drift blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, oklch(0.145 0 0 / 12%), transparent 62%)",
          transform: `translate3d(0, ${y * -0.08}px, 0)`,
        }}
      />
      <div
        className="absolute -right-[10%] top-[55%] h-[55vh] w-[50vw] rounded-full ink-drift blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 60% 50%, oklch(0.29 0.048 258 / 14%), transparent 65%)",
          transform: `translate3d(0, ${y * -0.12}px, 0)`,
        }}
      />

      {/* 04 atmospheric fog */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,transparent_35%,oklch(0.145_0_0_/_8%)_100%)]" />

      {/* 05 drifting particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-ink/25"
          style={{
            left: `${p.x}%`,
            top: `${p.t}%`,
            width: p.s,
            height: p.s,
            transform: `translate3d(0, ${y * -p.d}px, 0)`,
          }}
        />
      ))}

      {/* 06 technical coordinates */}
      <div className="absolute inset-y-0 left-4 hidden flex-col justify-between py-24 md:flex">
        {["N 17.3850", "E 78.4867", "ALT 542M", "SYS OK"].map((c) => (
          <span key={c} className="font-mono text-[9px] tracking-[0.3em] text-ink/25">
            {c}
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 right-4 hidden flex-col justify-between py-24 md:flex">
        {["01 / 05", "WORK", "STACK", "CONTACT"].map((c) => (
          <span key={c} className="font-mono text-[9px] tracking-[0.3em] text-ink/25">
            {c}
          </span>
        ))}
      </div>

      {/* 07 decorative seals */}
      <div
        className="absolute right-[6%] top-[18%] h-24 w-24 border border-vermilion/25"
        style={{ transform: `translate3d(0, ${y * -0.05}px, 0) rotate(6deg)` }}
      >
        <span className="absolute inset-0 grid place-items-center font-display text-3xl text-vermilion/25">真</span>
      </div>
      <div
        className="absolute left-[8%] top-[72%] h-16 w-16 rounded-full border border-ink/15"
        style={{ transform: `translate3d(0, ${y * -0.03}px, 0)` }}
      />
    </div>
  );
}

const PARTICLES = [
  { x: 12, t: 18, s: 3, d: 0.18 },
  { x: 28, t: 42, s: 2, d: 0.26 },
  { x: 46, t: 12, s: 2, d: 0.14 },
  { x: 63, t: 63, s: 3, d: 0.3 },
  { x: 78, t: 30, s: 2, d: 0.2 },
  { x: 88, t: 80, s: 3, d: 0.24 },
  { x: 36, t: 86, s: 2, d: 0.16 },
  { x: 55, t: 92, s: 2, d: 0.28 },
];
