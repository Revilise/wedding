import type { FC } from 'react';
import type { ICard } from '@ui/card/config/types.ts';
import { useBEM } from '@lib/bem';
import { Tag } from '@ui/tag';

export const Card: FC<ICard> = ({
    extraCN,
    utilCN,
    heading,
    footer,
    link,
    images = [],
    tags = [],
    media,
    children,
}) => {
    const { bem } = useBEM('card');
    const Root = link ? 'a' : 'div';

    return (
        <Root className={bem('', { extraCN, utilCN })} href={link}>
            <div className={bem('heading')}>{heading}</div>
            <div className={bem('images')}>
                {media ??
                    images.map(({ src, alt }) => (
                        <img key={src} className={bem('image')} src={src} alt={alt} loading='lazy' decoding='async' />
                    ))}
            </div>
            {tags.length > 0 && (
                <ul className={bem('tags')}>
                    {tags.map(({ label, extraCN }, index) => (
                        <li key={`${label}-${index}`}>
                            <Tag label={label} extraCN={extraCN} />
                        </li>
                    ))}
                </ul>
            )}
            <div className={bem('content')}>{children}</div>
            {footer != null && <div className={bem('footer')}>{footer}</div>}
        </Root>
    );
};
