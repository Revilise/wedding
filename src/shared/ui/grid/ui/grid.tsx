import { useBEM } from '@lib/bem';
import type { FC } from 'react';
import type { IGrid } from '../config/types';

export const Grid: FC<IGrid> = ({ extraCN, utilCN, children }) => {
    const { bem } = useBEM('grid');

    return <div className={bem('', { extraCN, utilCN })}>{children}</div>;
};
