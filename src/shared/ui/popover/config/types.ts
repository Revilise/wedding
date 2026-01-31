import type {ReactNode} from "react";
import type {IComponent} from "@shared/types/component.ts";

export interface IPopover extends IComponent {
  id: string,
  isOpen?: boolean,
  children?: ReactNode,
}

export interface IPopoverProvider {
  children?: ReactNode;
}

export interface IPopoverObserver {
  subscribe: (id: string, callback: (value: boolean) => void) => void,
  unsubscribe: (id: string) => void,
}
