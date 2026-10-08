import { getImageProps } from "next/image";

import { scenes } from "@/content/site-content";

/**
 * One layer of a scene pair, art-directed: phones get the 4:5 portrait crop,
 * everything wider gets the landscape frame. Both crops of a pair share one
 * framing, so the avatar and person layers stay aligned at every size.
 *
 * `getImageProps` + <picture> is Next's way to art-direct; <Image> alone can
 * only pick a resolution, not a different crop.
 */
export function ScenePicture({
  scene,
  who,
  sizes,
  priority = false,
  className = "",
}: {
  scene: keyof typeof scenes;
  who: "avatar" | "person";
  /** `sizes` for the landscape image (640px and wider). */
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const s = scenes[scene];
  const alt = who === "avatar" ? s.avatarAlt : s.personAlt;
  const base = who === "avatar" ? s.avatar : s.person;
  const common = { alt, priority, loading: priority ? ("eager" as const) : ("lazy" as const) };

  const {
    props: { srcSet: portrait },
  } = getImageProps({
    ...common,
    src: `${base}-portrait.webp`,
    width: s.portraitWidth,
    height: s.height,
    sizes: "100vw",
  });
  const {
    props: { srcSet: landscape, ...img },
  } = getImageProps({
    ...common,
    src: `${base}.webp`,
    width: s.width,
    height: s.height,
    sizes,
  });

  return (
    <picture>
      <source media="(max-width: 639px)" srcSet={portrait} sizes="100vw" />
      <source media="(min-width: 640px)" srcSet={landscape} sizes={sizes} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is in `img` */}
      <img
        {...img}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    </picture>
  );
}
