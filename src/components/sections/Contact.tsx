import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/data/profile";

const FIELDS = [
  { id: "name", ja: "名前", en: "NAME", type: "text", area: false },
  { id: "email", ja: "メール", en: "EMAIL", type: "email", area: false },
  { id: "project", ja: "案件", en: "PROJECT", type: "text", area: false },
  { id: "message", ja: "伝言", en: "MESSAGE", type: "text", area: true },
] as const;

export function Contact() {
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Project: ${data.get("project")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      `New channel — ${data.get("project")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading ja="接続" en="OPEN A CHANNEL" index="07 / CONTACT" />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h3 className="font-display text-3xl tracking-[0.04em] sm:text-4xl">HAVE AN IDEA?</h3>
            <p className="mt-3 font-display text-xl text-vermilion">
              LET'S MAKE SOMETHING WORTH EXPERIENCING.
            </p>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sealed"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-10 flex flex-col items-center gap-6 paper-sheet p-12 text-center"
                >
                  <span className="grid h-24 w-24 place-items-center seal font-display text-3xl">✓</span>
                  <p className="font-display text-xl">YOUR MESSAGE IS SEALED.</p>
                  <p className="font-mono text-[11px] tracking-[0.3em] text-ink/60">MESSAGE RECEIVED.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  className="mt-10 space-y-5"
                  exit={{ opacity: 0, y: -12 }}
                >
                  {FIELDS.map((f) => {
                    const active = focused === f.id;
                    return (
                      <div
                        key={f.id}
                        className={`paper-sheet relative p-4 transition-transform duration-500 ${
                          active ? "-translate-y-1" : ""
                        }`}
                      >
                        <label
                          htmlFor={f.id}
                          className={`flex items-baseline gap-3 transition-all duration-400 ${
                            active ? "-translate-y-0.5" : ""
                          }`}
                        >
                          <span className="font-mono text-[10px] tracking-[0.28em] text-ink/55">{f.en}</span>
                        </label>

                        {f.area ? (
                          <textarea
                            id={f.id}
                            name={f.id}
                            required
                            rows={4}
                            onFocus={() => setFocused(f.id)}
                            onBlur={() => setFocused(null)}
                            className="mt-2 w-full resize-none bg-transparent text-sm text-ink outline-none placeholder:text-ink/30"
                            placeholder="Tell me what you want to build."
                          />
                        ) : (
                          <input
                            id={f.id}
                            name={f.id}
                            type={f.type}
                            required
                            onFocus={() => setFocused(f.id)}
                            onBlur={() => setFocused(null)}
                            className="mt-2 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/30"
                            placeholder="—"
                          />
                        )}

                        <span
                          className={`absolute bottom-0 left-0 h-[2px] origin-left bg-vermilion transition-transform duration-500 ${
                            active ? "w-full scale-x-100" : "w-full scale-x-0"
                          }`}
                        />
                      </div>
                    );
                  })}


                  <button
                    type="submit"
                    data-cursor="project"
                    className="group flex items-center gap-4 border border-ink bg-ink px-6 py-3 text-paper transition-colors hover:border-vermilion hover:bg-vermilion"
                  >
                    <span className="font-display text-lg tracking-[0.2em]">SEND</span>
                    <span className="font-mono text-[10px] tracking-[0.3em]">SEND MESSAGE →</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* contact channels */}
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            {[
              { en: "LINKEDIN", href: profile.linkedin, val: "manojchinthala" },
              { en: "GITHUB", href: profile.github, val: "manojch77" },
              { en: "EMAIL", href: `mailto:${profile.email}`, val: profile.email },
            ].map((s) => (
              <a
                key={s.en}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                data-cursor="external"
                className="group flex items-center justify-between gap-3 border border-ink/20 bg-paper/60 px-4 py-3 transition-colors hover:border-vermilion sm:flex-1 sm:flex-col sm:justify-between sm:px-3 sm:py-6 lg:w-[86px] lg:flex-none"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center seal font-mono text-[9px]">↗</span>
                <span className="font-mono text-[10px] tracking-[0.3em] text-ink/70 group-hover:text-vermilion sm:vertical-jp sm:my-5">
                  {s.en}
                </span>
                <span className="font-mono text-[8px] text-ink/35">↗</span>
                <span className="sr-only">{s.val}</span>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
