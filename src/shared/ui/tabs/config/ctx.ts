import { createContext } from 'react';
import type { ITabsContext } from './types';

export const ctx = createContext<ITabsContext | null>(null);
