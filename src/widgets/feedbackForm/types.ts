import type {IComponent} from "@shared/types/component.ts";

export interface IFeedbackForm extends IComponent {
  id?: string,
}

export type FeedbackFormData = {
  name: string,
  introduction: string,
  visit: "yes" | "no" | undefined,
  allergy?: string,
  alcohol?: "yes" | "no" | undefined,
  step?: string,
}
