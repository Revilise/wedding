"use client";

import type { FC } from "react";

import { useBEM } from "@lib/bem";
import type { IBanner } from "../config/types";

export const Banner: FC<IBanner> = ({
  image,
  title,
  children
}) => {
  const { bem } = useBEM("banner");

  return (
    <div className={bem("")}>
        {image && (
            <picture className={bem("picture")}>
                {image.srcMobile && <source srcSet={image.srcMobile} />}
                <img src={image.src} alt={image.alt} />
            </picture>
        )}

        <div className={bem("title")}>{title}</div>

        <div className={bem("content")}>
            {children}
        </div>
    </div>
  );
};

