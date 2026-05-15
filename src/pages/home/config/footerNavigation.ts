import { homeSectionAnchors } from './sectionAnchors.ts';

export const footerNavigation: ReadonlyArray<{ href: string; label: string }> = [
    { href: `#${homeSectionAnchors.timePlace}`, label: 'Время и место' },
    { href: `#${homeSectionAnchors.program}`, label: 'Программа' },
    { href: `#${homeSectionAnchors.dressCode}`, label: 'Дресс-код' },
    { href: `#${homeSectionAnchors.feedback}`, label: 'Анкета' },
    { href: `#${homeSectionAnchors.telegram}`, label: 'Телеграм' },
    { href: `#${homeSectionAnchors.gifts}`, label: 'Подарки' },
];
