import type {IComponent} from "@shared/types/component.ts";
import type {IChecker} from "@ui/checker/config/types.ts";

export interface ICheckerGroup extends IComponent {
  label?: string,
  type?: "checkbox" | "radio",
  name?: string,
  options: IChecker[],
}
