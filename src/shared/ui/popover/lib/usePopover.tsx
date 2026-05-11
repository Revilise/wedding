import { useCallback } from 'react';

import PopoverObserver from '../model/observer.ts';

export const usePopover = (id: string) => {
    const close = useCallback(() => {
        PopoverObserver.notify(id, 'hide');
    }, [id]);

    const open = useCallback(() => {
        PopoverObserver.notify(id, 'show');
    }, [id]);

    return { close, open };
};
