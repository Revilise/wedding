import { homeSectionAnchors } from '../../config/sectionAnchors.ts';
import SeatingPlanSvg from "@images/seating/seating-plan.svg";

export const seatingPlanSection = {
    anchorId: homeSectionAnchors.searingPlan,
    heading: 'План рассадки',
    image: {
        src: SeatingPlanSvg,
        alt: "План банкетного зала"
    },
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
                { place: 11, name: 'Александра Холопова' },
                { place: 12, name: 'Ксения Панова' },
                { place: 13, name: 'Алина Хисамутдинова' },
                { place: 14, name: 'Полина Коновалова' },
                { place: 15, name: 'Руслан Капинос' },
                { place: 16, name: 'Евгений Волошен' },
                { place: 17, name: 'Сергей Дунаев' },
                { place: 18, name: 'Андрей Шилов' },
                { place: 19, name: 'Денис Лаврик' },
                { place: 20, name: 'Иван Копылов' },
            ]
        },
        {
            guests: [
                { place: 21, name: 'Егор Афошин' },
                { place: 22, name: 'Алина Мамонова' },
                { place: 23, name: 'Дарья Нецвет' },
                { place: 24, name: 'Екатерина Злобина' },
                { place: 25, name: 'Мамед Багиров' },
                { place: 26, name: 'Алёна Баркетова' },
                { place: 27, name: 'Лена Скорнякова' },
                { place: 28, name: 'Егор Агафонов' },
                { place: 29, name: 'Данил Пономарев' },
                { place: 30, name: 'Антон Ерофеев' }
            ]
        }
    ]
}
