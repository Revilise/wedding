import { homeSectionAnchors } from '../../config/sectionAnchors.ts';

export const dressCodeSection = {
    anchorId: homeSectionAnchors.dressCode,
    heading: 'Dress Code',
    subTitle: <>Итальянское лето</>,
    content: (
        <>
            <p>
                <mark>Дамы</mark>
                : Платья миди/макси, костюм или комбинезон. Приветствуются акцентные украшения.
            </p>
            <p>
                <mark>Мужчины</mark>
                : Светлые летние костюмы, рубашки без галстуков.
            </p>

            <b>Просим избегать белый и черный и придерживаться натуральных тканей: лён, хлопок, шёлк.</b>
            <p>Спасибо, что разделяете нашу любовь к деталям!</p>
        </>
    ),
    palette: [
        { hex: '#3E4A34', name: 'Тёмно-оливковый' },
        { hex: '#BBC298', name: 'Шалфей' },
        { hex: '#D9B27B', name: 'Пшеничный' },
        { hex: '#F7B557', name: 'Янтарный' },
        { hex: '#688EB3', name: 'Стальной голубой' },
        { hex: '#D2603D', name: 'Терракотовый' },
    ],
};
