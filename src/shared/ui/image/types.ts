import type { IComponent } from '@shared/types/component.ts';

export interface IImage extends IComponent {
    src: string;
    alt?: string;
}
