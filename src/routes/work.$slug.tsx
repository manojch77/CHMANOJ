import { useEffect, useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { getProject, projects, type Block } from "@/data/projects";
import { Atmosphere } from "@/components/Atmosphere";
import { KunaiCursor } from "@/components/KunaiCursor";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { ScreenViewer, type Screen } from "@/components/ScreenViewer";

const NAV = ["OVERVIEW", "PROBLEM", "PROCESS", "DESIGN", "TECH", "OUTCOME"];

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — Manoj Archive" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.project;
    const title = `${p.title} — ${p.subtitle} | Chinthala Manoj`;
    return {
      meta: [
        { title },
        { name: "description", content: p.overview },
        { property: "og:title", content: title },
        { property: "og:description", content: p.overview },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const [active, setActive] = useState("OVERVIEW");
  const [viewer, setViewer] = useState<{ screens: Screen[]; index: number } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActive("OVERVIEW");
  }, [project.id]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.toUpperCase());
        }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    project.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [project]);

  const i = projects.findIndex((p) => p.id === project.id);
  const prev = projects[(i - 1 + projects.length) % projects.length]!;
  const next = projects[(i + 1) % projects.length]!;

  return (
    <>
      <Atmosphere />
      <KunaiCursor />
      <Nav standalone />

      <main className="relative">
        {/* hero */}
        <header className="px-5 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36">
          <div className="mx-auto max-w-6xl">
            <Link
              to="/"
              hash="work"
              className="font-mono text-[10px] tracking-[0.3em] text-ink/55 hover:text-vermilion"
            >
              ← ARCHIVE
            </Link>

            <div className="mt-8 flex items-start gap-5 sm:gap-8">
              <div>
                <span className="label-mono">
                  {project.index} · {project.category.toUpperCase()}
                </span>
                <motion.h1
                  className="mt-2 font-display text-5xl tracking-[0.04em] sm:text-7xl"
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {project.title}
                </motion.h1>
                <p className="mt-3 font-display text-lg text-ink/70">{project.subtitle}</p>
                <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink/75">{project.overview}</p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="paper-sheet p-5">
                <span className="label-mono">ROLE</span>
                <ul className="mt-3 space-y-1 text-sm text-ink/75">
                  {project.role.map((r) => (
                    <li key={r}>— {r}</li>
                  ))}
                </ul>
              </div>
              <div className="paper-sheet p-5">
                <span className="label-mono">TOOLS</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tools.map((t) => (
                    <span
                      key={t}
                      className="border border-ink/20 px-2 py-0.5 font-mono text-[10px] tracking-[0.18em] text-ink/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {project.links.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <a
                    key={l.href + l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="external"
                    className={`group relative flex items-center gap-3 border px-5 py-3 transition-colors ${
                      l.primary
                        ? "border-ink bg-ink text-paper hover:border-vermilion hover:bg-vermilion"
                        : "border-ink/25 hover:border-ink"
                    }`}
                  >
                    {l.sub ? (
                      <span
                        className={`font-display text-xs ${l.primary ? "text-paper/70" : "text-vermilion"}`}
                      >
                        {l.sub}
                      </span>
                    ) : null}
                    <span className="font-mono text-[10px] tracking-[0.26em]">{l.label}</span>
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <div className="mx-auto flex max-w-6xl gap-10 px-5 pb-20 sm:px-6 sm:pb-24">
          {/* floating vertical nav */}
          <nav aria-label="Case study sections" className="sticky top-32 hidden h-fit w-32 shrink-0 lg:block">
            <ul className="space-y-4">
              {NAV.map((n) => {
                const isActive = active === n;
                return (
                  <li key={n}>
                    <a
                      href={`#${n.toLowerCase()}`}
                      className="flex items-center gap-3 font-mono text-[10px] tracking-[0.24em]"
                    >
                      <span
                        className={`grid h-5 w-5 place-items-center text-[8px] transition-all ${
                          isActive ? "seal" : "border border-ink/20 text-transparent"
                        }`}
                      >
                        ●
                      </span>
                      <span className={isActive ? "text-vermilion" : "text-ink/50"}>{n}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="min-w-0 flex-1 space-y-20">
            {project.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-32">
                <span className="label-mono">{s.label}</span>
                <div className="mt-6 space-y-10">
                  {s.blocks.map((b, bi) => (
                    <BlockView
                      key={bi}
                      block={b}
                      onOpenScreen={(screens, index) => setViewer({ screens, index })}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* prev / next scroll */}
        <div className="mx-auto grid max-w-6xl gap-4 px-5 pb-20 sm:px-6 sm:pb-24 sm:grid-cols-2">
          <Link
            to="/work/$slug"
            params={{ slug: prev.id }}
            data-cursor="project"
            className="paper-sheet group p-6"
          >
            <span className="label-mono">← PREVIOUS SCROLL</span>
            <p className="mt-2 font-display text-2xl group-hover:text-vermilion">{prev.title}</p>
          </Link>
          <Link
            to="/work/$slug"
            params={{ slug: next.id }}
            data-cursor="project"
            className="paper-sheet group p-6 text-right"
          >
            <span className="label-mono">NEXT SCROLL →</span>
            <p className="mt-2 font-display text-2xl group-hover:text-vermilion">{next.title}</p>
          </Link>
        </div>
      </main>

      <Footer />

      <ScreenViewer
        screens={viewer?.screens ?? []}
        index={viewer?.index ?? null}
        projectTitle={project.title}
        onClose={() => setViewer(null)}
        onIndex={(idx) => setViewer((v) => (v ? { ...v, index: idx } : v))}
      />
    </>
  );
}

function BlockView({
  block,
  onOpenScreen,
}: {
  block: Block;
  onOpenScreen: (screens: Screen[], index: number) => void;
}) {
  const heading = (
    <div className="flex items-baseline gap-3">
      
      <h2 className="font-display text-2xl tracking-[0.06em]">{block.heading}</h2>
    </div>
  );

  const wrap = (children: React.ReactNode) => (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {heading}
      <div className="mt-4">{children}</div>
    </motion.div>
  );

  switch (block.kind) {
    case "text":
      return wrap(
        <div className="max-w-2xl space-y-3 text-[15px] leading-relaxed text-ink/75">
          {block.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>,
      );

    case "list":
      return wrap(
        <ul className="grid max-w-3xl gap-2 sm:grid-cols-2">
          {block.items.map((it) => (
            <li key={it} className="flex items-baseline gap-2 border-b border-ink/10 pb-2 text-sm text-ink/80">
              <span className="text-vermilion">—</span>
              {it}
            </li>
          ))}
        </ul>,
      );

    case "flow":
      return wrap(
        <ol className="space-y-2">
          {block.steps.map((s, i) => (
            <motion.li
              key={s}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <span className="font-mono text-[10px] text-ink/35">{String(i + 1).padStart(2, "0")}</span>
              <span className="paper-sheet flex-1 px-4 py-3 font-mono text-[11px] tracking-[0.2em] text-ink/80">
                {s}
              </span>
              {i < block.steps.length - 1 ? <span className="text-vermilion">↓</span> : <span className="text-vermilion">●</span>}
            </motion.li>
          ))}
        </ol>,
      );

    case "metrics":
      return wrap(
        <div className="grid gap-4 sm:grid-cols-2">
          {block.metrics.map((m) => (
            <div key={m.label} className="paper-sheet relative p-6">
              <span className="label-mono">{m.label}</span>
              <p className="mt-4 font-display text-lg text-ink/45 line-through decoration-vermilion/60">{m.from}</p>
              <p className="mt-1 font-display text-3xl text-vermilion">{m.to}</p>
            </div>
          ))}
        </div>,
      );

    case "architecture":
      return wrap(
        <div>
          <div className="flex flex-wrap items-center gap-3">
            {block.nodes.map((n, i) => (
              <div key={n} className="flex items-center gap-3">
                <span className="border border-ink/25 bg-paper/70 px-4 py-3 font-mono text-[11px] tracking-[0.22em]">
                  {n}
                </span>
                {i < block.nodes.length - 1 ? <span className="text-vermilion">→</span> : null}
              </div>
            ))}
          </div>
          {block.note ? <p className="mt-4 max-w-2xl text-sm text-ink/65">{block.note}</p> : null}
        </div>,
      );

    case "terminal":
      return wrap(
        <div className="ink-sheet overflow-hidden border border-ink/40">
          <div className="flex items-center justify-between border-b border-paper/15 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-vermilion" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-paper/40">TERMINAL</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[11px] leading-relaxed text-paper/80">
            {block.lines.join("\n")}
          </pre>
        </div>,
      );

    case "screens":
      return wrap(
        <div className="grid gap-5 sm:grid-cols-2">
          {block.screens.map((s, i) => (
            <button
              key={s.title}
              type="button"
              data-cursor="image"
              onClick={() => onOpenScreen(block.screens, i)}
              className="paper-sheet group relative p-4 text-left transition-transform duration-500 hover:-translate-y-1"
              style={{ transform: `rotate(${i % 2 ? 0.5 : -0.5}deg)` }}
            >
              <div className="flex aspect-[16/10] flex-col justify-between border border-ink/12 bg-paper-deep/50 p-4">
                <span className="label-mono">{s.meta}</span>
                <div className="space-y-1.5">
                  <span className="block h-2 w-2/3 bg-ink/12" />
                  <span className="block h-2 w-1/2 bg-ink/10" />
                </div>
              </div>
              <p className="mt-3 font-display text-base">{s.title}</p>
              <p className="mt-1 text-xs text-ink/60">{s.caption}</p>
              <span className="mt-2 block font-mono text-[9px] tracking-[0.28em] text-vermilion opacity-0 transition-opacity group-hover:opacity-100">
                EXPAND
              </span>
            </button>
          ))}
        </div>,
      );

    case "embed":
      return wrap(<EmbedPanel block={block} />);
  }
}

function EmbedPanel({ block }: { block: Extract<Block, { kind: "embed" }> }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="paper-sheet relative p-7">
      <p className="max-w-2xl text-sm leading-relaxed text-ink/70">{block.note}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={block.href}
          target="_blank"
          rel="noreferrer"
          data-cursor="external"
          className="border border-ink bg-ink px-5 py-3 font-mono text-[10px] tracking-[0.26em] text-paper transition-colors hover:border-vermilion hover:bg-vermilion"
        >
          {block.label}
        </a>
        {block.iframe ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="border border-ink/25 px-5 py-3 font-mono text-[10px] tracking-[0.26em] transition-colors hover:border-ink"
          >
            {expanded ? "COLLAPSE BOARD" : "EXPAND BOARD"}
          </button>
        ) : null}
      </div>

      {block.iframe && expanded ? (
        <div className="mt-6 border border-ink/20">
          <iframe
            src={block.iframe}
            title={block.heading}
            loading="lazy"
            allow="fullscreen; clipboard-read; clipboard-write"
            allowFullScreen
            className="h-[520px] w-full bg-paper-deep"
          />
        </div>
      ) : null}

      <span className="absolute -right-3 -top-3 grid h-11 w-11 place-items-center seal font-display text-[11px]">
        ref
      </span>
    </div>
  );
}
