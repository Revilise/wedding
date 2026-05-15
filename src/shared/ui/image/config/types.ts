import type { ReactEventHandler } from "react";

import type { IComponent } from "@shared/types/component";

export interface IImage extends IComponent {
  src: string;
  alt?: string;
  onLoad?: ReactEventHandler<HTMLImageElement>;
}

