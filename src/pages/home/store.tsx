import ExampleImage from '@images/banner-flowers.jpg';
import ExampleImage2 from '@images/image-oranges.jpg';
import LocationImage from '@images/location.jpg';
import ManLook1 from '@images/looks/man-1.jpg';
import ManLook2 from '@images/looks/man-2.jpg';
import ManLook3 from '@images/looks/man-3.jpg';
import WomanLook1 from '@images/looks/woman-1.jpg';
import WomanLook2 from '@images/looks/woman-2.jpg';
import WomanLook3 from '@images/looks/woman-3.jpg';

import ImageSunset from "@images/banners/sunset.jpg";
import ImageLeavesSky from "@images/banners/leaves.jpg";

import ImageSberQr from "@images/qr/sber-qr.png";

import type { IBanner } from '@ui/banner';
import type { SwiperOptions } from 'swiper/types';

/** Якоря секций главной: `id` у `<Section>` и хэши ссылок в футере. */
export const homeSectionAnchors = {
    timePlace: 'timing',
    program: 'program',
    dressCode: 'dress-code',
    feedback: 'form',
    telegram: 'telegram',
    gifts: 'gifts',
} as const;

export const footerNavigation: ReadonlyArray<{ href: string; label: string }> = [
    { href: `#${homeSectionAnchors.timePlace}`, label: 'Время и место' },
    { href: `#${homeSectionAnchors.program}`, label: 'Программа' },
    { href: `#${homeSectionAnchors.dressCode}`, label: 'Дресс-код' },
    { href: `#${homeSectionAnchors.feedback}`, label: 'Анкета' },
    { href: `#${homeSectionAnchors.telegram}`, label: 'Телеграм' },
    { href: `#${homeSectionAnchors.gifts}`, label: 'Подарки' },
];

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
        'Мы приглашаем вас разделить с нами день свадьбы. Приходите быть рядом и свидетелями этого тёплого, светлого события',
    image: {
        extraCN: { isFullHeight: true },
        src: ExampleImage2 as string,
    },
};

export const timePlaceSection = {
    anchorId: homeSectionAnchors.timePlace,
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
    anchorId: homeSectionAnchors.program,
    heading: 'Программа',
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
        src: ImageLeavesSky as string,
    },
};

export const giftsSection = {
    anchorId: homeSectionAnchors.gifts,
    heading: 'Подарки',
    qr: ImageSberQr,
    content: (
        <>
            <p>
                Просим не беспокоиться о выборе подарков — будем рады любой сумме
            </p>
            <p>Скоро тут появится <b>ссылка для сборов в сбере</b></p>
        </>
    ),
    image: {
        extraCN: { isFullHeight: true, "isAspect[300/470]": true },
        src: ExampleImage2 as string,
    },
};

export const dressCodeSection = {
    anchorId: homeSectionAnchors.dressCode,
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
    anchorId: homeSectionAnchors.telegram,
    heading: 'Telegram',
    qrCode: {
        link: 'https://t.me/+qUT-GT5l6PAzNzEy',
        name: 'qr',
        extraCN: { 'size-120': true },
    },
};

export const feedbackSection = {
    anchorId: homeSectionAnchors.feedback,
    heading: 'Анкета',
    image: ExampleImage2 as string,
    popoverId: 'anketa',
    content: (
        <>
            <p>Мы подготовили для вас пару вопросов, которые помогут нам в организации торжества.</p>
            <p>Подростки от 16 лет могут заполнять анкету самостоятельно.</p>
        </>
    ),
};
