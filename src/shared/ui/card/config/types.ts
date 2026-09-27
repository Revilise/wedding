import type { IComponent } from '@shared/types/component.ts';
import type { PropsWithChildren, ReactNode } from 'react';
import type { ITag } from '@ui/tag';

export interface ICard extends IComponent, PropsWithChildren {
    heading: string | ReactNode;
    footer?: ReactNode;
    images?: Array<{ src: string; alt?: string }>;
    media?: ReactNode;
    link?: string;
    tags?: Array<Pick<ITag, 'label' | 'extraCN'>>;
}
