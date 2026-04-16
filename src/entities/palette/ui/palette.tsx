"use client";

import { type FC, useId } from "react";

import { useBEM } from "@lib/bem";

import type { IPalette } from "../config/types";
import { context as PaletteContext } from "../config/ctx";
import { PaletteColor } from "./paletteColor";

export const Palette: FC<IPalette> = ({ extraCN, utilCN, colors = [] }) => {
  const id = useId();
  const { bem } = useBEM("palette");

  return (
    <PaletteContext.Provider value={{ bem }}>
      <div className={bem("", { extraCN, utilCN })}>
        {colors.map((color, idx: number) => (
          <PaletteColor key={`${id}-${idx}`} {...color} />
        ))}
      </div>
    </PaletteContext.Provider>
  );
};

