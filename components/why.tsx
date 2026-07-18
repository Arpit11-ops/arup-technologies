import Image from "next/image";
import { BELIEFS } from "@/lib/content";
import { MOTION_MEDIA } from "@/lib/media";
import { assetPath } from "@/lib/utils";

const cardClass =
  "relative h-[380px] overflow-hidden rounded-2xl border border-bone/12 bg-slate/55 sm:h-[460px]";

export function Why() {
  return (
    <section id="why" className="relative w-full scroll-mt-[72px] bg-onyx py-12 text-bone sm:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-10">
        <h2
          className="mb-12 text-center text-3xl font-normal text-bone sm:mb-24 sm:text-4xl md:text-5xl"
          style={{ letterSpacing: "-0.04em" }}
        >
          Why Arup
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          <article className={`${cardClass} p-6 sm:p-8`}>
            <div
              aria-hidden="true"
              className="absolute top-1/2 -left-[420px] h-[460px] w-[460px] -translate-y-1/2 rounded-full bg-ember opacity-25 blur-3xl"
            />
            <div className="relative z-10 flex h-full flex-col">
              <h3 className="text-xl font-normal leading-tight text-bone sm:text-2xl">
                One team,
                <br />
                not five.
              </h3>
              <p className="mt-12 max-w-[280px] text-[13px] font-normal leading-relaxed text-bone/70 sm:mt-20 sm:text-[14px]">
                {BELIEFS[0].body}
              </p>
            </div>
          </article>

          <article className={`${cardClass} flex flex-col`}>
            <div className="relative h-[75%] w-full overflow-hidden">
              <Image
                src={assetPath("/images/services/ai-automation.webp")}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, calc(100vw - 32px)"
                className="object-cover"
              />
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
                className="relative z-10 block h-full w-full object-cover"
              >
                <source src={MOTION_MEDIA.why} type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-b from-transparent to-[#111112]" />
            </div>
            <div className="flex flex-1 items-center justify-start p-6 sm:p-8">
              <h3 className="text-left text-xl font-normal leading-tight text-bone sm:text-2xl">
                AI where it wins,
                <br />
                hands-on where it counts.
              </h3>
            </div>
          </article>

          <article className={`${cardClass} p-6 sm:p-8`}>
            <div
              aria-hidden="true"
              className="absolute -top-28 -right-28 h-56 w-56 rounded-full bg-ember opacity-25 blur-3xl"
            />
            <div className="relative z-10 flex h-full flex-col">
              <h3 className="text-xl font-normal leading-tight text-bone sm:text-2xl">
                Paid to move
                <br />
                numbers.
              </h3>
              <p className="mt-auto max-w-[320px] text-[13px] font-normal leading-relaxed text-bone/70 sm:text-[14px]">
                {BELIEFS[2].body}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
