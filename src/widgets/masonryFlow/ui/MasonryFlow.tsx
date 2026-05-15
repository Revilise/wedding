'use client';

import Masonry from 'react-responsive-masonry';
import { useLayoutEffect, useMemo, useReducer, useState, type FC } from 'react';

import { Image } from '@ui/image';

import '../masonryFlow.pcss';
import type { IMasonryFlow } from '@widgets/masonryFlow/config/types.ts';
import { useBEM } from '@lib/bem';

const defaultColumns = { 0: 1, 769: 2 } as const;
const defaultGutters = { 0: '2.4rem', 769: '3rem' } as const;

const DEFAULT_COLUMN_COUNT = 1;
const DEFAULT_GUTTER = '10px';

/** Как в `ResponsiveMasonry`: при `windowWidth === 0` (SSR) остаётся значение с минимального брейкпоинта. */
function responsiveValueAtWidth<T>(
    breakPoints: Record<number, T>,
    windowWidth: number,
    fallback: T,
): T {
    const sortedKeys = Object.keys(breakPoints).sort((a, b) => Number(a) - Number(b));
    let value: T =
        sortedKeys.length > 0 ? breakPoints[Number(sortedKeys[0])]! : fallback;

    for (const key of sortedKeys) {
        const bp = Number(key);
        if (bp < windowWidth) {
            value = breakPoints[bp]!;
        }
    }

    return value;
}

/** Адаптивная masonry-сетка на `react-responsive-masonry` (картинки с пересчётом после загрузки). */
export const MasonryFlow: FC<IMasonryFlow> = ({
    images,
    getAlt = (i) => `Изображение ${i + 1}`,
    columnsCountBreakPoints = { ...defaultColumns },
    gutterBreakPoints = { ...defaultGutters },
    className,
}) => {
    const { bem } = useBEM("masonryFlow");
    const [, bumpLayout] = useReducer((n: number) => n + 1, 0);
    const rootClass = ['masonryFlow', className].filter(Boolean).join(' ');
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
        [columnsCountBreakPoints, windowWidth],
    );

    const gutter = useMemo(
        () => responsiveValueAtWidth(gutterBreakPoints, windowWidth, DEFAULT_GUTTER),
        [gutterBreakPoints, windowWidth],
    );

    return (
        <div className={rootClass}>
            <Masonry className={bem("masonry")} columnsCount={columnsCount} gutter={gutter}>
                {images.map((src, idx) => (
                    <figure className={bem("figure")} key={`masonry-flow-${idx}`}>
                        <Image
                            src={src}
                            alt={getAlt(idx)}
                            extraCN={{ isMasonryFlow: true }}
                            onLoad={() => bumpLayout()}
                        />
                    </figure>
                ))}
            </Masonry>
        </div>
    );
};
