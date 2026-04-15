import type { IComponent } from '@shared/types/component.ts';
import type { OnEventHandlers } from '@shared/types/utils.ts';
import type { HTMLProps, Ref } from 'react';

type CheckerHandlers = OnEventHandlers<HTMLProps<HTMLInputElement>>;

export interface IChecker extends IComponent, CheckerHandlers {
    name?: string;
    label: string;
    value: string | number;
    isChecked?: boolean;
    ref?: Ref<HTMLInputElement>;
    type?: 'checkbox' | 'radio';
}
