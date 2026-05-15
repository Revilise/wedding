import { homeSectionAnchors } from '../../config/sectionAnchors.ts';

export const programSection = {
    anchorId: homeSectionAnchors.program,
    heading: 'Программа',
    program: [
        ['14:00', 'Сбор гостей & welcome'],
        ['15:00', 'Фуршет'],
        ['16:00', 'Церемония'],
        ['16:20', 'Банкет'],
        ['17:00', 'Развлечения'],
        ['19:00', 'Первый танец'],
        ['19:30', 'Торт'],
        ['20:00', 'Финал'],
    ] as const,
};
