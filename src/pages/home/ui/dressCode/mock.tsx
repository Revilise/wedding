import { Button } from '@ui/button';
import type { IOutfitLook } from './config/types';
import ManLook1 from '@images/looks/man-1.jpg';
import ManLook2 from '@images/looks/man-2.jpg';
import WomanLook1 from '@images/looks/woman-1.jpg';
import WomanLook2 from '@images/looks/woman-2.jpg';

export const outfitInspiration = {
    heading: 'Образы для вдохновения',
    looks: [
        {
            id: WomanLook1,
            category: 'women',
            previewCard: {
                extraCN: { isLook: true },
                heading: <h3 className='h3'>{'Нежность шалфея'}</h3>,
                images: [{ src: WomanLook1, alt: 'Платье шалфейного оттенка с воланами и V-образным вырезом' }],
                tags: [{ label: 'Шалфей' }, { label: 'Летящая фактура', extraCN: { isOutline: true } }],
                children: <p>{'Воздушный силуэт, мягкие воланы и минимум украшений.'}</p>,
                footer: (
                    <Button
                        extraCN={{ isOutline: true }}
                        motion={false}
                        extraAttrs={{ 'aria-label': 'Рассмотреть образ «Нежность шалфея»' }}
                    >
                        Рассмотреть ↗
                    </Button>
                ),
            },
            fullscreenCard: {
                extraCN: { isLookFullscreen: true },
                heading: 'Нежность шалфея',
                images: [{ src: WomanLook1, alt: 'Платье шалфейного оттенка с воланами и V-образным вырезом' }],
            },
        },
        {
            id: ManLook1,
            category: 'men',
            previewCard: {
                extraCN: { isLook: true },
                heading: <h3 className='h3'>{'Тёплая терракота'}</h3>,
                images: [{ src: ManLook1, alt: 'Мужской терракотовый костюм со светлой рубашкой без галстука' }],
                tags: [{ label: 'Терракотовый' }, { label: 'Расслабленная классика', extraCN: { isOutline: true } }],
                children: <p>{'Костюм тёплого оттенка и светлая рубашка без галстука.'}</p>,
                footer: (
                    <Button
                        extraCN={{ isOutline: true }}
                        motion={false}
                        extraAttrs={{ 'aria-label': 'Рассмотреть образ «Тёплая терракота»' }}
                    >
                        Рассмотреть ↗
                    </Button>
                ),
            },
            fullscreenCard: {
                extraCN: { isLookFullscreen: true },
                heading: 'Тёплая терракота',
                images: [{ src: ManLook1, alt: 'Мужской терракотовый костюм со светлой рубашкой без галстука' }],
            },
        },
        {
            id: WomanLook2,
            category: 'women',
            previewCard: {
                extraCN: { isLook: true },
                heading: <h3 className='h3'>{'Лето в оливковой роще'}</h3>,
                images: [{ src: WomanLook2, alt: 'Оливковое платье с объёмными рукавами и золотистыми браслетами' }],
                tags: [{ label: 'Оливковый' }, { label: 'Естественные линии', extraCN: { isOutline: true } }],
                children: <p>{'Свободные рукава, натуральная фактура и золотистые акценты.'}</p>,
                footer: (
                    <Button
                        extraCN={{ isOutline: true }}
                        motion={false}
                        extraAttrs={{ 'aria-label': 'Рассмотреть образ «Лето в оливковой роще»' }}
                    >
                        Рассмотреть ↗
                    </Button>
                ),
            },
            fullscreenCard: {
                extraCN: { isLookFullscreen: true },
                heading: 'Лето в оливковой роще',
                images: [{ src: WomanLook2, alt: 'Оливковое платье с объёмными рукавами и золотистыми браслетами' }],
            },
        },
        {
            id: ManLook2,
            category: 'men',
            previewCard: {
                extraCN: { isLook: true },
                heading: <h3 className='h3'>{'Небо и песок'}</h3>,
                images: [{ src: ManLook2, alt: 'Голубая рубашка с бежевыми брюками и светлыми кедами' }],
                tags: [{ label: 'Голубой' }, { label: 'Лёгкость в деталях', extraCN: { isOutline: true } }],
                children: <p>{'Голубая рубашка, светлые брюки и удобная обувь для долгого вечера.'}</p>,
                footer: (
                    <Button
                        extraCN={{ isOutline: true }}
                        motion={false}
                        extraAttrs={{ 'aria-label': 'Рассмотреть образ «Небо и песок»' }}
                    >
                        Рассмотреть ↗
                    </Button>
                ),
            },
            fullscreenCard: {
                extraCN: { isLookFullscreen: true },
                heading: 'Небо и песок',
                images: [{ src: ManLook2, alt: 'Голубая рубашка с бежевыми брюками и светлыми кедами' }],
            },
        },
    ] satisfies IOutfitLook[],
};
