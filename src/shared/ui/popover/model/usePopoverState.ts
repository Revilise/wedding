import { useSyncExternalStore, useCallback } from 'react';
import observer from './observer';

export function usePopoverState(id: string) {
    const subscribe = useCallback(
        (notify: () => void) => {
            observer.subscribe(id, notify);
            return () => observer.unsubscribe(id, notify);
        },
        [id]
    );
    return useSyncExternalStore(
        subscribe,
        () => observer.opened.has(id),
        () => false
    );
}
