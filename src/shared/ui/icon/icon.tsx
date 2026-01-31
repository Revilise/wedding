import type {FC} from "react";
import type {Iicon} from "@ui/icon/types.ts";
import {useBEM} from "@lib/bem";
import {getIconSrc} from "@ui/icon/sprite.ts";

export const Icon: FC<Iicon> = ({
  extraCN,
  utilCN,
  src: srcProp,
  name,
}) => {
  const { bem } = useBEM("icon");
  const src = srcProp ?? (name ? getIconSrc(name) : undefined);

  if (!src) {
    return null;
  }

  return (
    <span className={bem("", { extraCN, utilCN })}>
      <svg className={bem("preview")} aria-hidden focusable={false}>
        <use href={src} xlinkHref={src} />
      </svg>
    </span>
  );
};
