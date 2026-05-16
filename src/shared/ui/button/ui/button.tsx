"use client";

import type { FC } from "react";
import { motion } from "motion/react";

import { useBEM } from "@lib/bem";
import type { IButton } from "../config/types";

export const Button: FC<IButton> = ({
  extraCN,
  utilCN,
  href,
  extraAttrs,
  type = "button",
  style,
  label,
  children,
  ref,
  motion: motionProps = { whileTap: { y: 5 }, whileHover: { scale: 1.02 } },
  ...handlers
}) => {
  const { bem } = useBEM("btn");
  const TagName = type === "link" ? motion.a : motion.button;

  return (
    <TagName
      className={bem("", { extraCN, utilCN })}
      href={href}
      {...extraAttrs}
      style={style}
      ref={ref}
      type={type}
      {...motionProps}
      {...handlers}
    >
      {label && <span className={bem("label")}>{label}</span>}
      {children}
    </TagName>
  );
};

