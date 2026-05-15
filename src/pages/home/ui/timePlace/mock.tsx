import LocationImage from '@images/location.jpg';

import { homeSectionAnchors } from '../../config/sectionAnchors.ts';

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
            <div>01.08.2026 в 14:00</div>
            <div>улица Савушкина, 21 - ресторан "Юность"</div>
        </>
    ),
    image: {
        extraCN: { 'isAspect[300/470]': true },
        src: LocationImage as string,
    },
    mapLink: "https://yandex.ru/maps/2/saint-petersburg/house/ulitsa_savushkina_21/Z0kYdA9lQUYAQFtjfXV5d3xkbQ==/?ll=30.286220%2C59.986136&z=17.6",
    extraInfo: (
        <>
            <span className={'h4'}>Трансфер</span>
            <span>Среднее время дороги ~1.5 часа</span>
        </>
    ),
};
