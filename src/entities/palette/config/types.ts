import type { IComponent } from "@shared/types/component";

type Color = {
  hex: string;
  name: string;
};

export interface IPalette extends IComponent {
  colors: Color[];
}

export interface IPaletteColor extends IComponent, Color {}

