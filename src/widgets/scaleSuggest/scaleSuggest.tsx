import { type FC, useEffect, useId } from 'react';
import type { IScaleSuggest } from './types.ts';
import { Popover } from '@ui/popover';

import { StorageFactory, StorageType } from '@lib/storage';
import { usePopover } from '@ui/popover/lib/usePopover.tsx';

export const ScaleSuggest: FC<IScaleSuggest> = ({ cookieName = 'scale' }) => {
    const id = useId();
    const { open: openPopover } = usePopover(id);

    const Storage = StorageFactory(StorageType.cookies);

    useEffect(() => {
        if (!Storage.has(cookieName)) {
            openPopover();
        }
    }, []);

    return (
        <Popover extraCN={{ isPrompt: true }} id={id}>
            <div>Вы можете настроить сайт</div>
        </Popover>
    );
};
