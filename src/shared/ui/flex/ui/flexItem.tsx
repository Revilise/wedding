import { useBEM } from '@lib/bem';
import type { FC } from 'react';
import type { IFlexItem } from '../config/types';

export const FlexItem: FC<IFlexItem> = ({
    extraCN, utilCN, style, children }) => {
    const { bem } = useBEM('flex');

    return (
        <div className={bem('item', { extraCN, utilCN })} style={style}>
            {children}
        </div>
    );
};
