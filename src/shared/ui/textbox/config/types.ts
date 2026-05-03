import type { IComponent } from '@shared/types/component.ts';
import type { OnEventHandlers } from '@shared/types/utils.ts';
import type { HTMLProps, Ref } from 'react';

type TextboxHandlers = OnEventHandlers<HTMLProps<HTMLTextAreaElement>>;

export interface Itextbox extends IComponent, TextboxHandlers {
    autocomplete?: boolean;
    label?: string;
    name?: string;
    value?: string;
    error?: string;
    ref?: Ref<HTMLTextAreaElement>;
    rows?: number;
}
