export type FooterNavItem = {
    href: string;
    label: string;
};

import type { IComponent } from '@shared/types/component.ts';

export interface IFooter extends IComponent {
    navigation?: ReadonlyArray<FooterNavItem>;
}
