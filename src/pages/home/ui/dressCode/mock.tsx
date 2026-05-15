import { homeSectionAnchors } from '../../config/sectionAnchors.ts';

export const dressCodeSection = {
    anchorId: homeSectionAnchors.dressCode,
    heading: 'Dress Code',
    subTitle: <>Итальянское лето</>,
    content: (
        <>
            <p>Только натуральный лен, шелк или хлопок.</p>

            <p>
                <mark>Дамы</mark>: Платья миди/макси (кроме белого). Приветствуются акцентные украшения.
            </p>
            <p>
                <mark>Мужчины</mark>: Светлые летние костюмы, рубашки без галстуков.
            </p>

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
