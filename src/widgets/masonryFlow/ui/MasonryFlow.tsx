'use client';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useReducer, type FC } from 'react';

import { Image } from '@ui/image';

import '../masonryFlow.pcss';

const defaultColumns = { 0: 1, 769: 2 } as const;
const defaultGutters = { 0: '2.4rem', 769: '3rem' } as const;

export interface IMasonryFlow {
    /** URL картинок по порядку */
    images: readonly string[];
    /** Подписи к `alt`; по умолчанию нейтральная формулировка */
    getAlt?: (index: number) => string;
    columnsCountBreakPoints?: Record<number, number>;
    gutterBreakPoints?: Record<number, string>;
    /** Доп. класс на корневой контейнер */
    className?: string;
}

/** Адаптивная masonry-сетка на `react-responsive-masonry` (картинки с пересчётом после загрузки). */
export const MasonryFlow: FC<IMasonryFlow> = ({
    images,
    getAlt = (i) => `Изображение ${i + 1}`,
    columnsCountBreakPoints = { ...defaultColumns },
    gutterBreakPoints = { ...defaultGutters },
    className,
}) => {
    const [, bumpLayout] = useReducer((n: number) => n + 1, 0);

    const rootClass = ['masonryFlow', className].filter(Boolean).join(' ');

    return (
        <div className={rootClass}>
            <ResponsiveMasonry
                columnsCountBreakPoints={columnsCountBreakPoints}
                gutterBreakPoints={gutterBreakPoints as unknown as { [breakpoint: number]: number }}
            >
                <Masonry className={'masonryFlow__masonry'}>
                    {images.map((src, idx) => (
                        <figure className={'masonryFlow__figure'} key={`masonry-flow-${idx}`}>
                            <Image
                                src={src}
                                alt={getAlt(idx)}
                                extraCN={{ isMasonryFlow: true }}
                                onLoad={() => {
                                    bumpLayout();
                                }}
                            />
                        </figure>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    );
};
