import type { IComponent } from "@shared/types/component";

export interface ISurveyReminder extends IComponent {
    isOpen?: boolean;
    id: string;
}
