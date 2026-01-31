import type {IComponent} from "@shared/types/component.ts";
import type {ButtonHTMLAttributes, ReactNode} from "react";

export interface IButton extends IComponent {
  children?: ReactNode;
  href?: string,
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"] | "link"
}
