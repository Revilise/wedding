import type { ReactNode } from "react";

import type { IComponent } from "@shared/types/component";

export interface IFlex extends IComponent {
  children: ReactNode;
}

export interface IFlexItem extends IComponent {
  children?: ReactNode;
}
