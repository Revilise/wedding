import { homeSectionAnchors } from '../../config/sectionAnchors.ts';
import ManLook1 from '@images/looks/man-1.jpg';
import ManLook2 from '@images/looks/man-2.jpg';
import WomanLook1 from '@images/looks/woman-1.jpg';
import WomanLook2 from '@images/looks/woman-2.jpg';

export const dressCodeSection = {
    anchorId: homeSectionAnchors.dressCode,
    heading: 'Dress Code',
    subTitle: <>Итальянское лето</>,
    content: (
        <>
            <p>
                <mark>Дамы</mark>: Платья миди/макси, костюм или комбинезон. Приветствуются акцентные украшения.
            </p>
            <p>
                <mark>Мужчины</mark>: Светлые летние костюмы, рубашки без галстуков или поло.
            </p>

            <b>Просим избегать белый и черный. Старайтесь придерживаться натуральных тканей: лён, хлопок, шёлк.</b>
            <p>Спасибо, что разделяете нашу любовь к деталям!</p>
        </>
    ),
    palette: [
        { hex: '#3E4A34', name: 'Тёмно-оливковый' },
        { hex: '#BBC298', name: 'Шалфей' },
        { hex: '#D9B27B', name: 'Пшеничный (песочный)' },
        { hex: '#F7B557', name: 'Янтарный' },
        { hex: '#688EB3', name: 'Голубой' },
        { hex: '#cb7e64', name: 'Светло-терракотовый' },
    ],
};

export const outfitInspiration = {
    heading: 'Образы для вдохновения',
    looks: [
        {
            src: WomanLook1,
            width: 1002,
            height: 774,
            category: 'women',
            title: 'Нежность шалфея',
            description: 'Воздушный силуэт, мягкие воланы и минимум украшений.',
            alt: 'Платье шалфейного оттенка с воланами и V-образным вырезом',
            color: '#BBC298',
            shade: 'Шалфей',
            detail: 'Летящая фактура',
        },
        {
            src: ManLook1,
            width: 754,
            height: 754,
            category: 'men',
            title: 'Тёплая терракота',
            description: 'Костюм тёплого оттенка и светлая рубашка без галстука.',
            alt: 'Мужской терракотовый костюм со светлой рубашкой без галстука',
            color: '#CB7E64',
            shade: 'Терракотовый',
            detail: 'Расслабленная классика',
        },
        {
            src: WomanLook2,
            width: 1002,
            height: 1570,
            category: 'women',
            title: 'Лето в оливковой роще',
            description: 'Свободные рукава, натуральная фактура и золотистые акценты.',
            alt: 'Оливковое платье с объёмными рукавами и золотистыми браслетами',
            color: '#BBC298',
            shade: 'Оливковый',
            detail: 'Естественные линии',
        },
        {
            src: ManLook2,
            width: 819,
            height: 1024,
            category: 'men',
            title: 'Небо и песок',
            description: 'Голубая рубашка, светлые брюки и удобная обувь для долгого вечера.',
            alt: 'Голубая рубашка с бежевыми брюками и светлыми кедами',
            color: '#688EB3',
            shade: 'Голубой',
            detail: 'Лёгкость в деталях',
        },
    ],
};
