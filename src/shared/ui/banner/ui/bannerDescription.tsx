import { useBEM } from '@lib/bem';
import type { IBannerText } from '../config/types';

export const BannerDescription = ({ children, extraCN, utilCN, extraAttrs }: IBannerText) => {
    const { bem } = useBEM('banner');
    return (
        <p className={bem('description', { extraCN, utilCN: [...(utilCN ?? [])] })} {...extraAttrs}>
            {children}
        </p>
    );
};
