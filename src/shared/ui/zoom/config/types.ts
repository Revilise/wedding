import type { IComponent } from '@shared/types/component.ts';

export interface IZoom extends IComponent {
    image: { src: string, alt?: string },
    height: number,
    width: number,
    showControls?: boolean,
}
