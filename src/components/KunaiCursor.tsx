import { useEffect, useRef, useState } from "react";

type Label = { en: string } | null;

const LABELS: Record<string, Label> = {
  project: { en: "VIEW" },
  image: { en: "EXPAND" },
  external: { en: "OPEN" },
};

type Particle = { id: number; x: number; y: number; dx: number; dy: number };

export function KunaiCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<Label>(null);
  const [slash, setSlash] = useState<{ id: number; x: number; y: number } | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const tip = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.style.cursor = "none";

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let trailX = x;
    let trailY = y;
    let angle = -45;
    let raf = 0;
    let pid = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = e.target as HTMLElement | null;
      const hit = target?.closest?.("[data-cursor]") as HTMLElement | null;
      const key = hit?.dataset['cursor'];
      setLabel(key && LABELS[key] ? LABELS[key] : null);
    };

    const onDown = (e: PointerEvent) => {
      const id = ++pid;
      setSlash({ id, x: e.clientX, y: e.clientY });
      setParticles((p) => [
        ...p,
        ...Array.from({ length: 6 }, (_, i) => ({
          id: id * 100 + i,
          x: e.clientX,
          y: e.clientY,
          dx: (Math.random() - 0.5) * 46,
          dy: (Math.random() - 0.5) * 46,
        })),
      ]);
      window.setTimeout(() => setSlash((s) => (s?.id === id ? null : s)), 320);
      window.setTimeout(() => setParticles((p) => p.filter((q) => Math.floor(q.id / 100) !== id)), 520);
    };

    const loop = () => {
      const dx = tx - x;
      const dy = ty - y;
      x += dx * 0.28;
      y += dy * 0.28;
      trailX += (x - trailX) * 0.12;
      trailY += (y - trailY) * 0.12;
      const speed = Math.hypot(dx, dy);
      if (speed > 1.2) {
        const target = (Math.atan2(dy, dx) * 180) / Math.PI + 45;
        let delta = ((target - angle + 540) % 360) - 180;
        angle += delta * Math.min(0.25 + speed / 400, 0.6);
      }
      if (root.current) root.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (tip.current) tip.current.style.transform = `rotate(${angle}deg) scale(${1 + Math.min(speed / 120, 0.35)})`;
      if (trail.current) {
        trail.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
        trail.current.style.opacity = String(Math.min(speed / 40, 0.5));
      }
      if (labelRef.current) labelRef.current.style.transform = `translate3d(${x + 22}px, ${y + 16}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div ref={trail} className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-vermilion/25 blur-[6px]" />

      <div ref={root} className="absolute left-0 top-0">
        <div ref={tip} className="relative -translate-x-1/2 -translate-y-1/2">
          <svg width="26" height="26" viewBox="0 0 26 26" className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
            <path d="M13 1 L20 11 L13 25 L6 11 Z" fill="var(--ink)" />
            <path d="M13 4 L17.6 11.2 L13 21 L8.4 11.2 Z" fill="var(--paper)" opacity="0.14" />
            <circle cx="13" cy="11" r="1.6" fill="var(--vermilion)" />
          </svg>
        </div>
      </div>

      <div ref={labelRef} className="absolute left-0 top-0">
        {label ? (
          <div className="flex items-center gap-2 border border-ink/20 bg-ink px-2.5 py-1 text-paper shadow-lg">
            <span className="font-mono text-[10px] tracking-[0.24em] text-paper/70">{label.en}</span>
          </div>
        ) : null}
      </div>

      {slash ? (
        <div
          key={slash.id}
          className="absolute h-[2px] w-14 origin-center bg-ink"
          style={{
            left: slash.x,
            top: slash.y,
            transform: "translate(-50%,-50%) rotate(-45deg)",
            animation: "slash-out 320ms cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        />
      ) : null}

      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute h-[3px] w-[3px] rounded-full bg-ink"
          style={{
            left: p.x,
            top: p.y,
            ["--px" as string]: `${p.dx}px`,
            ["--py" as string]: `${p.dy}px`,
            animation: "ink-burst 520ms cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        />
      ))}

      <style>{`
        @keyframes slash-out {
          0% { opacity: 0; transform: translate(-50%,-50%) rotate(-45deg) scaleX(0.2); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%,-50%) rotate(-45deg) scaleX(1.15); }
        }
        @keyframes ink-burst {
          0% { opacity: 0.9; transform: translate(0,0) scale(1); }
          100% { opacity: 0; transform: translate(var(--px), var(--py)) scale(0.3); }
        }
      `}</style>
    </div>
  );
}
