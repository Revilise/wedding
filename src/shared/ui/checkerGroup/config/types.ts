import type { IComponent } from '@shared/types/component.ts';
import type { IChecker } from '@ui/checker';
import type { HTMLProps } from 'react';
import type { OnEventHandlers } from '@shared/types/utils.ts';

type FieldsetHandlers = OnEventHandlers<HTMLProps<HTMLFieldSetElement>>;

export interface ICheckerGroup extends IComponent, FieldsetHandlers {
    label?: string;
    type?: 'checkbox' | 'radio';
    name?: string;
    options: IChecker[];
    error?: string;
}
