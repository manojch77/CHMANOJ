import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/15 px-5 py-16 sm:px-6 sm:py-24">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vermilion/12"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 text-center">
        <div className="flex flex-wrap items-start justify-center gap-5 sm:gap-8">
          <div>
            {profile.statement.map((l) => (
              <p key={l} className="font-display text-4xl leading-[1.05] tracking-[0.06em] sm:text-7xl">
                {l}
              </p>
            ))}
          </div>
        </div>

        <p className="font-display text-sm tracking-[0.34em] text-ink/60">CHINTHALA MANOJ</p>

        <figure className="relative mt-4 max-w-2xl border-t border-b border-ink/15 px-4 py-6 sm:px-6 sm:py-8">
          <blockquote className="font-display text-xl leading-relaxed tracking-[0.02em] text-ink/85 sm:text-2xl">
            “Only those who have suffered long can see the light within the shadows.”
          </blockquote>
          <figcaption className="mt-4 font-mono text-[10px] tracking-[0.3em] text-vermilion">
            — RORONOA ZORO
          </figcaption>
        </figure>


        <div className="space-y-1">
          <p className="font-mono text-[10px] tracking-[0.3em] text-ink/55">© 2026 CHINTHALA MANOJ</p>
          <p className="font-mono text-[9px] tracking-[0.3em] text-ink/35">BUILT WITH CURIOSITY.</p>
        </div>
      </div>
    </footer>
  );
}
