import type { IComponent } from '@shared/types/component';

export type Guest = { place: number; name: string };

export type SeatingPlanProps = IComponent & {
    image: { src: string; alt?: string };
    tables: { guests: Guest[] }[];
};
