import type {ReactNode} from "react";
import type {IComponent} from "@shared/types/component.ts";

interface IBannerSlide extends IComponent {
  image?: {
    src: string;
    srcMobile?: string;
    alt?: string;
  },
  video?: {
    autoplay?: boolean;
    poster?: string;
    src: string;
  },
  corner?: {
    position?: "right-bottom",
    content: ReactNode | string,
  }
  title?: ReactNode | string;
  description?: ReactNode | string;
  children?: ReactNode
}

export interface IBanner {
  slides: IBannerSlide[];
}
