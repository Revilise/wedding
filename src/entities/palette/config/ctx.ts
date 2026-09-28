import { createContext } from 'react';

import type { bemOptions } from '@lib/bem';

export const context = createContext<{ bem: (blockCN: string, options: Omit<bemOptions, 'baseCN'>) => string }>({
    bem: () => '',
});
