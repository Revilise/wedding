import type { ReactNode } from "react";

import type { IComponent } from "@shared/types/component";

export interface IGrid extends IComponent {
  children: ReactNode;
}

export interface IGridItem extends IComponent {
  children?: ReactNode;
}

