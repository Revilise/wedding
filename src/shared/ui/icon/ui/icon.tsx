"use client";

import type { FC } from "react";

import { useBEM } from "@lib/bem";

import type { IIcon } from "../config/types";
import { getIconSrc } from "../lib/sprite";

export const Icon: FC<IIcon> = ({ extraCN, utilCN, src: srcProp, name }) => {
  const { bem } = useBEM("icon");
  const src = srcProp ?? (name ? getIconSrc(name) : undefined);

  if (!src) return null;

  return (
    <span className={bem("", { extraCN, utilCN })}>
      <svg className={bem("preview")} aria-hidden focusable={false}>
        <use href={src} xlinkHref={src} />
      </svg>
    </span>
  );
};

