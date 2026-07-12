import type { ReactNode } from 'react';
import type { IComponent } from '@shared/types/component.ts';

export type AccordionBreakpoint = 'mobile' | 'tablet' | 'smallMobile';

export interface IAccordion extends IComponent {
    children: ReactNode;
    breakpoint?: AccordionBreakpoint;
    label: ReactNode;
    defaultOpen?: boolean;
}
