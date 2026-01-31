import type {IComponent} from "@shared/types/component.ts";
import type {OnEventHandlers} from "@shared/types/utils.ts";
import type {HTMLProps} from "react";

export interface Iinput extends IComponent {
  type?: "text" | "email" | "password" | "tel",
  label?: string,
  value?: string | number,
  handlers?: OnEventHandlers<HTMLProps<HTMLInputElement>>
}
