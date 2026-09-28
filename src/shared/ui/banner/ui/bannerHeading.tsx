import { useBEM } from '@lib/bem';
import type { IBannerText } from '../config/types';

export const BannerHeading = ({ children, extraCN, utilCN, extraAttrs }: IBannerText) => {
    const { bem } = useBEM('banner');
    return (
        <h1 className={bem('heading', { extraCN, utilCN: ['h2', ...(utilCN ?? [])] })} {...extraAttrs}>
            {children}
        </h1>
    );
};
