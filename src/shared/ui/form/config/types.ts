import type {IComponent} from "@shared/types/component.ts";
import type {ReactNode} from "react";
import type {BemFc} from "@lib/bem/types.ts";

export interface IForm extends IComponent {
  children?: ReactNode;
  url: string,
}

export interface IFormStep extends IComponent {
  id?: string | "error" | "success",
  children?: ReactNode;
}

export interface IFormContext {
  bem: BemFc,
  activeStepId?: string | "error" | "success";
}
