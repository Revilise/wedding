import type { ReactNode } from "react";

import type { IComponent } from "@shared/types/component";

export interface ISection extends IComponent {
  heading?: ReactNode;
  children?: ReactNode;
}

