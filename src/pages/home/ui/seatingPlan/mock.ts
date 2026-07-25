import { homeSectionAnchors } from '../../config/sectionAnchors.ts';
import SeatingPlanSvg from "@images/seating/seating-plan.svg";

export const seatingPlanSection = {
    anchorId: homeSectionAnchors.searingPlan,
    heading: 'План рассадки',
    image: {
        src: SeatingPlanSvg,
        alt: "План банкетного зала"
    },
    subtitle: "Показать список гостей",
    tables: [
        {
            guests: [
                { place: 1, name: 'Алексей Коряковский' },
                { place: 2, name: 'Лариса Коряковская' },
                { place: 3, name: 'Олег Мутных' },
                { place: 4, name: 'Анна Панова' },
                { place: 5, name: 'Мария Панова' },
                { place: 6, name: 'Миша Панов' },
                { place: 7, name: 'Александр Панов' },
                { place: 8, name: 'Ирина Базарбаева' },
                { place: 9, name: 'Светлана Михайлова' },
                { place: 10, name: 'Елена Илларионова' },
            ]
        },
        {
            guests: [
                { place: 11, name: 'Алина Мамонова' },
                { place: 12, name: 'Ксения Панова' },
                { place: 13, name: 'Александра Холопова' },
                { place: 14, name: 'Екатерина Злобина' },
                { place: 15, name: 'Дарья Нецвет' },
                { place: 16, name: 'Руслан Капинос' },
                { place: 17, name: 'Евгений Волошен' },
                { place: 18, name: 'Егор Афошин' },
            ]
        },
        {
            guests: [
                { place: 19, name: 'Андрей Шилов' },
                { place: 20, name: 'Денис Лаврик' },
                { place: 21, name: 'Иван Копылов' },
                { place: 22, name: 'Мамед Багиров' },
                { place: 23, name: 'Алёна Баркетова' },
                { place: 24, name: 'Лена Скорнякова' },
                { place: 25, name: 'Егор Агафонов' },
                { place: 26, name: 'Данил Пономарев' },
                { place: 27, name: 'Антон Ерофеев' },
                { place: 28, name: 'Сергей Дунаев' }
            ]
        }
    ]
}
