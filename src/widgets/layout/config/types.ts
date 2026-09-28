import type { ReactNode } from 'react';

import type { FooterNavItem } from '@ui/footer';
import type { IComponent } from '@shared/types/component';

export interface ILayout extends IComponent {
    header: import('@ui/header').IHeader;
    children?: ReactNode;
    footerNavigation?: ReadonlyArray<FooterNavItem>;
}
