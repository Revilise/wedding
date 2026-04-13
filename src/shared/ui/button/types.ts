import type {IComponent} from "@shared/types/component.ts";
import type {AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref} from "react";
import type {OnEventHandlers} from "@shared/types/utils.ts";

type ButtonEvents = OnEventHandlers<ButtonHTMLAttributes<HTMLButtonElement>>;
type AnchorEvents = OnEventHandlers<AnchorHTMLAttributes<HTMLAnchorElement>>;

type Handlers = ButtonEvents & AnchorEvents;

export interface IButton extends IComponent, Handlers {
  children?: ReactNode;
  href?: string;
  label?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"] | "link";
  ref?: Ref<HTMLButtonElement | HTMLAnchorElement>;
}
