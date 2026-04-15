import type { IComponent } from '@shared/types/component.ts';
import type { FormHTMLAttributes, ReactNode } from 'react';
import type { BemFc } from '@lib/bem/types.ts';

export interface IForm extends IComponent, FormHTMLAttributes<HTMLFormElement> {
    children?: ReactNode;
    activeStepId?: string;
}

export interface IFormStep extends IComponent {
    id?: string | 'error' | 'success';
    children?: ReactNode;
}

export interface IFormControls extends IComponent {
    children?: ReactNode;
}

export interface IFormContext {
    bem: BemFc;
    activeStepId: string;
}
