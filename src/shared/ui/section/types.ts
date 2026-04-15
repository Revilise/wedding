import type { IComponent } from '@shared/types/component.ts';
import type { ReactNode } from 'react';

export interface ISection extends IComponent {
    heading?: ReactNode;
    children?: ReactNode;
}
