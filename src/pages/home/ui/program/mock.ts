import { homeSectionAnchors } from '../../config/sectionAnchors.ts';

export const programSection = {
    anchorId: homeSectionAnchors.program,
    heading: 'Программа',
    program: [
        ['14:00', 'Сбор гостей & welcome'],
        ['14:30', 'Церемония'],
        ['15:00', 'Фотосессия'],
        ['15:20', 'Активности, конкурсы и поздравления'],
        ['17:00', 'Первый танец'],
        ['17:45', 'Торт'],
        ['19:00', 'Дискотека']
    ] as const,
};
