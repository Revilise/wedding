import { createContext } from 'react';
import type { IFormContext } from './types';

export const ctx = createContext<IFormContext>({
    bem() {
        return '';
    },
    activeStepId: '0',
});
