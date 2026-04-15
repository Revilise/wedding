import { useBEM } from '@lib/bem';
import type { FC } from 'react';
import type { IGridItem } from '@ui/grid/types.ts';

export const GridItem: FC<IGridItem> = ({ extraCN, utilCN, style, children }) => {
    const { bem } = useBEM('grid');

    return (
        <div className={bem('item', { extraCN, utilCN })} style={style}>
            {children}
        </div>
    );
};
