'use client';

import type { FC } from 'react';

import { useBEM } from '@lib/bem';
import type { IBanner } from '../config/types';

export const Banner: FC<IBanner> = ({ extraCN, utilCN, image, title, children }) => {
    const { bem } = useBEM('banner');

    return (
        <div className={bem('', { extraCN, utilCN })}>
            {image && (
                <picture className={bem('picture')}>
                    {image.srcMobile && <source srcSet={image.srcMobile} />}
                    <img className={bem('image')} src={image.src} alt={image.alt} />
                </picture>
            )}

            <div className={bem('title')}>{title}</div>

            <div className={bem('content')}>{children}</div>
        </div>
    );
};
