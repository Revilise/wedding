import type { FC } from 'react';
import type { IPopover } from '../config/types.ts';

// @ts-expect-error The portal package does not provide TypeScript declarations.
import { Portal } from '@openagenda/react-portal-ssr';

import { PopoverBase } from './popoverBase';

export const Popover: FC<IPopover> = props => {
    return (
        <Portal>
            <PopoverBase {...props} />
        </Portal>
    );
};
