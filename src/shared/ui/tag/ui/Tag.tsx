import type { FC } from 'react';
import { useBEM } from '@lib/bem';
import type { ITag } from '../config';

export const Tag: FC<ITag> = ({ label, extraCN, utilCN, id, style, extraAttrs }) => {
    const { bem } = useBEM('tag');

    return (
        <span {...extraAttrs} id={id} className={bem('', { extraCN, utilCN })} style={style}>
            {label}
        </span>
    );
};
