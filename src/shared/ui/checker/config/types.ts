import type { IComponent } from "@shared/types/component.ts";

export interface IChecker extends IComponent {
  name?: string,
  label: string,
  value: string | number,
  isChecked?: boolean,
  type?: "checkbox"|"radio",
}
