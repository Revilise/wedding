import ExampleImage from '@images/banner-flowers.jpg';
import ExampleImage2 from '@images/image-oranges.jpg';
import LocationImage from '@images/location.jpg';
import ManLook1 from '@images/looks/man-1.jpg';
import ManLook2 from '@images/looks/man-2.jpg';
import ManLook3 from '@images/looks/man-3.jpg';
import WomanLook1 from '@images/looks/woman-1.jpg';
import WomanLook2 from '@images/looks/woman-2.jpg';
import WomanLook3 from '@images/looks/woman-3.jpg';

import type { IBanner } from '@ui/banner';
import type { SwiperOptions } from 'swiper/types';

export const heroSection = {
    banner: {
        slides: [
            {
                image: {
                    src: ExampleImage as string,
                },
                title: (
                    <>
                        <div className={'h1 colorWhite'}>Анастасия</div>
                        <div className={'h1 colorWhite'}>&Георгий</div>
                    </>
                ),
                description: '',
                corner: {
                    position: 'right-bottom',
                    content: (
                        <div className={'text-2 bold align-right colorVintageCoral pt-24 pl-24'}>
                            <div>01.08</div>
                            <div>2026</div>
                            <div>14:00</div>
                        </div>
                    ),
                },
            },
        ],
    } satisfies IBanner,
};

export const inviteSection = {
    heading: 'Дорогие родные и близкие!',
    content:
        'Приглашаем вас на нашу свадьбу. Будьте с нами, станьте свидетелями этого светлого события, где мы обещаем друг другу вечную поддержку и радость в повседневности.',
    image: {
        extraCN: { isFullHeight: true },
        src: ExampleImage2 as string,
    },
};

export const timePlaceSection = {
    heading: (
        <>
            Время & <wbr />
            Место
        </>
    ),
    info: (
        <>
            <div>01.08.2026 в 12:00</div>
            <div>улица Савушкина, 21 - ресторан "Юность"</div>
        </>
    ),
    image: {
        extraCN: { isHeight280: true },
        src: LocationImage as string,
    },
    extraInfo: (
        <>
            <span className={'h4'}>Трансфер</span>
            <span>Среднее время дороги ~1.5 часа</span>
        </>
    ),
};


export const programSection = {
    heading: 'Расписание дня',
    program: [
        ["14:00", "Сбор гостей & welcome"],
        ["15:00", "Фуршет"],
        ["16:00", "Церемония"],
        ["16:20", "Банкет"],
        ["17:00", "Развлечения"],
        ["19:00", "Первый танец"],
        ["19:30", "Торт"],
        ["20:00", "Финал"]
    ],
    image: {
        src: ExampleImage2 as string,
    },
};

export const giftsSection = {
    heading: 'Подарки',
    qr: "data:image/png;base64,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",
    content: (
        <>
            <p>
                Просим не беспокоиться о выборе подарков — будем рады любой сумме
            </p>
            <p>Скоро тут появится <b>ссылка для сборов в сбере</b></p>
        </>
    ),
    image: {
        extraCN: { isFullHeight: true },
        src: ExampleImage2 as string,
    },
};

export const dressCodeSection = {
    heading: 'Dress Code',
    subTitle: <>Итальянское лето</>,
    description:
        'Друзья, мы создаем атмосферу солнечной Италии и просим вас стать ее частью. Единая палитра поможет нам сделать этот день визуально незабываемым.',
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

export const dressExamplesSection = {
    heading: 'Образы для вдохновения',
    swiperCfg: {
        slidesPerView: 'auto',
        spaceBetween: 20,
    } satisfies SwiperOptions,
    images: [ManLook1, WomanLook1, ManLook2, WomanLook2, ManLook3, WomanLook3],
};

export const communitySection = {
    heading: 'Telegram',
    qrCode: {
        link: 'https://t.me/+qUT-GT5l6PAzNzEy',
        name: 'qr',
        extraCN: { 'size-120': true },
    },
};

export const feedbackSection = {
    heading: 'Анкета',
    image: ExampleImage2 as string,
    popoverId: 'anketa',
    content: (
        <>
            <p>Мы подготовили для вас пару вопросов, которые помогут нам в организации торжества.</p>
            <p>Если вы идёте с парой и планируете взять детей информацию о них второй партнёр может не заполнять.</p>
            <p>Подростки от 16 лет могут заполнять анкету самостоятельно.</p>
        </>
    ),
};
