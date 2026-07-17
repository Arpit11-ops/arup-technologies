import { TESTIMONIALS } from "@/lib/content";

/**
 * Placeholder testimonials with real structure. Every field is TODO-tagged
 * so a reader sees the honest state; nothing is passed off as real.
 */
export function Testimonials() {
  return (
    <section className="relative bg-onyx py-24 text-bone lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="mb-14 max-w-3xl lg:mb-20">
          <h2 className="text-balance font-black tracking-[-0.03em] text-[clamp(2rem,4vw+0.5rem,3.5rem)] leading-[0.98]">
            What clients say —{" "}
            <span className="text-bone/40">
              (when we ask them to)
            </span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="relative flex flex-col justify-between rounded-2xl bg-slate p-8 ring-1 ring-bone/8 lg:p-10"
            >
              {t.placeholder && (
                <span className="absolute right-4 top-4 rounded-full border border-ember/40 bg-ember/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ember">
                  Placeholder
                </span>
              )}
              <blockquote className="text-[19px] font-medium leading-[1.5] text-bone lg:text-[21px]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-bone/10 pt-6 text-[13px] text-bone/55">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bone/10 font-bold text-bone/70">
                  {t.name.slice(0, 1)}
                </span>
                <span>
                  <span className="block font-bold text-bone/85">{t.name}</span>
                  <span className="block">
                    {t.role} · {t.business}
                    {t.city ? ` · ${t.city}` : ""}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-10 text-[13px] text-bone/65">
          These will be replaced with real quotes and attribution before launch.
          We ship real proof, not stock badges.
        </p>
      </div>
    </section>
  );
}
