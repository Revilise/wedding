import type { ReactNode } from "react";

export type FooterNavItem = {
  href: string;
  label: string;
};

export interface ILayout {
  children?: ReactNode;
  footerNavigation?: ReadonlyArray<FooterNavItem>;
}

