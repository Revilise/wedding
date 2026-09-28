import { useBEM } from '@lib/bem';
import type { IBannerText } from '../config/types';

export const BannerDisplayTitle = ({ children, extraCN, utilCN, extraAttrs }: IBannerText) => {
    const { bem } = useBEM('banner');
    return (
        <span className={bem('displayTitle', { extraCN, utilCN: ['h0', ...(utilCN ?? [])] })} {...extraAttrs}>
            {children}
        </span>
    );
};
