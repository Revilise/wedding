import type { IComponent } from '@shared/types/component.ts';
import type { ReactNode } from 'react';

export interface IDialogBox extends IComponent {
    isOpen: boolean;
    /** Текст вопроса (по центру на мобиле, слева на планшете/десктопе) */
    children: ReactNode;
    /** Кнопки/ссылки справа (десктоп) или под текстом (мобиле) */
    actions: ReactNode;
}
