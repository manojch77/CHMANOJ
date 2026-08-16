import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/data/projects";

const TYPE_LABEL: Record<string, string> = {
  "ux-case-study": "UX CASE STUDY",
  product: "PRODUCT",
  technical: "TECHNICAL",
};

export function Work() {
  return (
    <section id="work" className="relative px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          ja="作品"
          en="SELECTED WORK"
          index="05 / ARTIFACTS"
          note="Five artifacts from the archive. Each scroll opens into its own case study."
        />

        <div className="mt-16 space-y-10">
          {projects.map((p, i) => {
            const alt = i % 2 === 1;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <Link
                  to="/work/$slug"
                  params={{ slug: p.id }}
                  data-cursor="project"
                  className={`relative block overflow-hidden border border-ink/15 ${
                    p.type === "technical" ? "ink-sheet" : "paper-sheet"
                  }`}
                >
                  {/* opening scroll wash */}
                  <span className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-vermilion/8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />

                  <div
                    className={`relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center ${
                      alt ? "lg:[direction:rtl] lg:[&>*]:[direction:ltr]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className={`font-display text-5xl leading-none ${
                          p.type === "technical" ? "text-paper/25" : "text-ink/20"
                        }`}
                      >
                        {p.index}
                      </span>
                    </div>

                    <div>
                      <span
                        className={`font-mono text-[10px] tracking-[0.3em] ${
                          p.type === "technical" ? "text-paper/50" : "text-ink/45"
                        }`}
                      >
                        {TYPE_LABEL[p.type]}
                      </span>
                      <h3
                        className={`mt-2 font-display text-3xl tracking-[0.06em] sm:text-4xl ${
                          p.type === "technical" ? "text-paper" : ""
                        }`}
                      >
                        {p.title}
                      </h3>
                      <p
                        className={`mt-2 text-sm ${
                          p.type === "technical" ? "text-paper/70" : "text-ink/70"
                        }`}
                      >
                        {p.subtitle}
                      </p>

                      <div className="mt-5 max-h-0 overflow-hidden opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-h-56 group-hover:opacity-100 group-focus-visible:max-h-56 group-focus-visible:opacity-100">
                        <p
                          className={`max-w-xl text-[13px] leading-relaxed ${
                            p.type === "technical" ? "text-paper/65" : "text-ink/65"
                          }`}
                        >
                          {p.overview}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.tools.slice(0, 6).map((t) => (
                            <span
                              key={t}
                              className={`border px-2 py-0.5 font-mono text-[9px] tracking-[0.2em] ${
                                p.type === "technical"
                                  ? "border-paper/25 text-paper/60"
                                  : "border-ink/20 text-ink/60"
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-[10px] tracking-[0.3em] ${
                          p.type === "technical" ? "text-paper/70" : "text-ink/70"
                        }`}
                      >
                        ENTER ARCHIVE →
                      </span>
                      <span className="grid h-10 w-10 place-items-center seal font-display text-xs transition-transform duration-500 group-hover:scale-110">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
