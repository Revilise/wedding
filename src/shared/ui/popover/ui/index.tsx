import { Popover as PopoverBase } from './popover.tsx';
import type { FC } from 'react';
import type { IPopover } from '@ui/popover/config/types.ts';
// @ts-ignore
import { Portal } from '@openagenda/react-portal-ssr';

export const Popover: FC<IPopover> = props => {
    return (
        <Portal>
            <PopoverBase {...props} />
        </Portal>
    );
};
