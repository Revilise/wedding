import { useCallback, useEffect, useEffectEvent, useState } from 'react';

export const useCountdown = (count = 5, min = 2, onComplete?: () => void) => {
    const [isEnd, setIsEnd] = useState(true);
    const [time, setTime] = useState(count);
    const complete = useEffectEvent(() => onComplete?.());

    useEffect(() => {
        if (isEnd) return;
        const timeout = setTimeout(() => {
            if (time < min) {
                setIsEnd(true);
                complete();
            } else {
                setTime(time - 1);
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [time, isEnd, min]);

    const start = useCallback(() => {
        setTime(count);
        setIsEnd(false);
    }, [count]);
    const reset = useCallback(() => setIsEnd(true), []);
    return { start, time, isEnd, reset };
};
