import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react';

import type { IComponent } from '@shared/types/component';
import type { OnEventHandlers } from '@shared/types/utils';
import type { MotionProps } from 'motion/react';

type ButtonEvents = OnEventHandlers<ButtonHTMLAttributes<HTMLButtonElement>>;
type AnchorEvents = OnEventHandlers<AnchorHTMLAttributes<HTMLAnchorElement>>;

type Handlers = Omit<ButtonEvents & AnchorEvents, keyof MotionProps>;

export interface IButton extends IComponent, Handlers {
    children?: ReactNode;
    href?: string;
    label?: string;
    size?: number;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'] | 'link';
    ref?: Ref<HTMLButtonElement | HTMLAnchorElement>;
    motion?: MotionProps | boolean;
}
