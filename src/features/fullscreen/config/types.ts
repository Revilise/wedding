import type { IComponent } from '@shared/types/component.ts';
import type { PropsWithChildren, ReactNode } from 'react';

export interface IFullscreen extends IComponent, PropsWithChildren {
    preview: ReactNode;
    isOpen?: boolean;
}