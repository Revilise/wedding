import { useBEM } from '@lib/bem';
import type { FC } from 'react';
import type { IFlex } from '../config/types';

export const Flex: FC<IFlex> = ({ extraCN, utilCN, children }) => {
    const { bem } = useBEM('flex');

    return <div className={bem('', { extraCN, utilCN })}>{children}</div>;
};
