"use client";

import type { FC } from "react";

import { useBEM } from "@lib/bem";
import type { IImage } from "../config/types";

export const Image: FC<IImage> = ({ extraCN, utilCN, src, alt = "", onLoad }) => {
  const { bem } = useBEM("image");

  return (
    <div className={bem("", { extraCN, utilCN })}>
      <img src={src} alt={alt} decoding={"async"} onLoad={onLoad} />
    </div>
  );
};

