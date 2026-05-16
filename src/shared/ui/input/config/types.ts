import type { IComponent } from '@shared/types/component.ts';
import type { OnEventHandlers } from '@shared/types/utils.ts';
import type { HTMLProps, ReactNode, Ref } from 'react';

type InputHandlers = OnEventHandlers<HTMLProps<HTMLInputElement>>;

export interface Iinput extends IComponent, InputHandlers {
    autocomplete?: boolean;
    type?: 'text' | 'email' | 'password' | 'tel';
    label?: string;
    name?: string;
    value?: string | number;
    error?: string;
    ref?: Ref<HTMLInputElement>;
    placeholder?: string;
}
