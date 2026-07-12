import { createContext, useContext } from 'react';
import type { AccordionBreakpoint } from './types.ts';

interface AccordionContextValue {
    breakpoint?: AccordionBreakpoint;
}

export const AccordionContext = createContext<AccordionContextValue>({});

export const useAccordionContext = () => useContext(AccordionContext);
