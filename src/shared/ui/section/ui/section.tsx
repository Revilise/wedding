"use client";

import type { FC } from "react";

import { useBEM } from "@lib/bem";
import type { ISection } from "../config/types";

export const Section: FC<ISection> = ({ extraCN, utilCN, heading, children }) => {
  const { bem } = useBEM("section");

  return (
    <section className={bem("", { extraCN, utilCN })}>
      {heading && <div className={bem("heading")}>{heading}</div>}
      <div className={bem("wrapper")}>{children}</div>
    </section>
  );
};

