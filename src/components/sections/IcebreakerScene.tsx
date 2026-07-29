import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { scene } from "@/content/site-content";

export function IcebreakerScene() {
  return (
    <section className="py-[60px]">
      <div className="mx-auto w-[min(1160px,92vw)]">
        <Reveal>
          <figure className="shadow-glow group relative overflow-hidden rounded-card">
            <Image
              src={scene.image}
              alt={scene.alt}
              width={scene.imageWidth}
              height={scene.imageHeight}
              loading="lazy"
              sizes="(max-width: 1200px) 92vw, 1160px"
              className="w-full transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.65,0.25,1)] group-hover:scale-[1.04]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-5 bg-linear-to-b from-transparent to-ink/82 px-[34px] pt-[70px] pb-[26px] text-white">
              <div>
                <h2 className="text-[clamp(20px,2.4vw,30px)] font-bold tracking-[-0.02em]">
                  {scene.titleLead}{" "}
                  <span className="serif-accent">{scene.titleEmphasis}</span>
                </h2>
                <p className="mt-1.5 max-w-[44ch] text-sm text-[#d8d2ea]">
                  {scene.body}
                </p>
              </div>
              <span className="font-mono text-[10.5px] tracking-[0.16em] whitespace-nowrap text-[#b6aed2] uppercase">
                {scene.tag}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
