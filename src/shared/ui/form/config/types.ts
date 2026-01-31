import type {IComponent} from "@shared/types/component.ts";
import type {ReactNode} from "react";
import type {BemFc} from "@lib/bem/types.ts";

export interface IForm extends IComponent {
  children?: ReactNode;
}

export interface IFormStep extends IComponent {
  id?: number,
  children?: ReactNode;
}

export interface IFormContext {
  bem: BemFc,
  activeStepId?: number;
}
