import type { IComponent } from "@shared/types/component";

export interface IFeedbackForm extends IComponent {
  id?: string;
}

export type FeedbackStep1 = {
  name: string,
  visit: "yes" | "no" | undefined;
}

export type FeedbackStep2 = {
  introduction: string;
  allergy?: string;
  alcohol?: "yes" | "no" | undefined;
  step?: string;
  fact: string;
  song: string;
  history: string;
  comment: string;
}

export type FeedbackFormData = FeedbackStep1 & FeedbackStep2;
