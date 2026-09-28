import type { PanzoomInstance } from '@fancyapps/ui/dist/panzoom/';
import type { IComponent } from '@shared/types/component.ts';

export interface IZoom extends IComponent {
    image: { src: string; alt?: string };
    height: number;
    width: number;
    showControls?: boolean;
}

export type PanzoomContainerRefType = <ContainerElement extends HTMLElement>(el: ContainerElement | null) => void;

export type PanzoomResult = [PanzoomContainerRefType, PanzoomInstance | undefined];
