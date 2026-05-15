import type { ReactNode } from "react";
import type { IComponent } from '@shared/types/component.ts';

export interface IBanner extends IComponent {
  image?: {
    src: string;
    srcMobile?: string;
    alt?: string;
  };
  title?: ReactNode | string;
  children?: ReactNode;
}

