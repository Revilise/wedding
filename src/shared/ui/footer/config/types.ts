import type { FooterNavItem } from '@ui/layout/config/types';

import type { IComponent } from '@shared/types/component.ts';

export interface IFooter extends IComponent {
    navigation?: ReadonlyArray<FooterNavItem>;
}
