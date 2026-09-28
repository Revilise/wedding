import { useLayoutEffect, useMemo, useReducer, useState } from 'react';
import { DEFAULT_COLUMN_COUNT, DEFAULT_GUTTER } from '../config';
import type { MasonryFlowModelOptions } from '../config';
/** Как в `ResponsiveMasonry`: при `windowWidth === 0` (SSR) остаётся значение с минимального брейкпоинта. */
function responsiveValueAtWidth<T>(breakPoints: Record<number, T>, windowWidth: number, fallback: T): T {
    const sortedKeys = Object.keys(breakPoints).sort((a, b) => Number(a) - Number(b));
    let value: T = sortedKeys.length > 0 ? breakPoints[Number(sortedKeys[0])]! : fallback;

    for (const key of sortedKeys) {
        const bp = Number(key);
        if (bp < windowWidth) {
            value = breakPoints[bp]!;
        }
    }

    return value;
}

export function useMasonryFlow({ columnsCountBreakPoints, gutterBreakPoints }: MasonryFlowModelOptions) {
    const [, bumpLayout] = useReducer((n: number) => n + 1, 0);
    /** Совпадает с SSR: до эффекта ширина 0, не «настоящий» viewport (иначе гидрация ломается). */
    const [windowWidth, setWindowWidth] = useState(0);

    useLayoutEffect(() => {
        const onResize = () => setWindowWidth(window.innerWidth);

        onResize();
        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    const columnsCount = useMemo(
        () => responsiveValueAtWidth(columnsCountBreakPoints, windowWidth, DEFAULT_COLUMN_COUNT),
        [columnsCountBreakPoints, windowWidth]
    );

    const gutter = useMemo(
        () => responsiveValueAtWidth(gutterBreakPoints, windowWidth, DEFAULT_GUTTER),
        [gutterBreakPoints, windowWidth]
    );

    return { bumpLayout, columnsCount, gutter };
}
