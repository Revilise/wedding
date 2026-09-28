'use client';

import Masonry from 'react-responsive-masonry';
import type { FC } from 'react';
import { defaultColumns, defaultGutters } from '../config';
import { useMasonryFlow } from '../model';

import { Image } from '@ui/image';

import type { IMasonryFlow } from '../config';
import { useBEM } from '@lib/bem';

/** Адаптивная masonry-сетка на `react-responsive-masonry` (картинки с пересчётом после загрузки). */
export const MasonryFlow: FC<IMasonryFlow> = ({
    images,
    getAlt = i => `Изображение ${i + 1}`,
    columnsCountBreakPoints = { ...defaultColumns },
    gutterBreakPoints = { ...defaultGutters },
    className,
}) => {
    const { bem } = useBEM('masonryFlow');
    const { bumpLayout, columnsCount, gutter } = useMasonryFlow({ columnsCountBreakPoints, gutterBreakPoints });
    const rootClass = ['masonryFlow', className].filter(Boolean).join(' ');

    return (
        <div className={rootClass}>
            <Masonry className={bem('masonry')} columnsCount={columnsCount} gutter={gutter}>
                {images.map((src, idx) => (
                    <figure className={bem('figure')} key={`masonry-flow-${idx}`}>
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
