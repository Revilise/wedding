"use client";

import type { FC, ReactNode } from "react";

import { ErrorBoundary } from "@features/errorBoundary";
import { Footer } from "@ui/footer";
import { Header } from "@ui/header";

import type { ILayout } from "../config/types";

export const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className={"layout"}>
      <Header />
      {wrapChildrenWithBoundaries(children)}
      <Footer />
    </div>
  );
};

function wrapChildrenWithBoundaries(children: ReactNode) {
  return (Array.isArray(children) ? children : [children]).flat().map((child, index) => {
    if (child == null || typeof child === "boolean") return child;
    return <ErrorBoundary key={(child as any)?.key ?? `eb-${index}`}>{child}</ErrorBoundary>;
  });
}

