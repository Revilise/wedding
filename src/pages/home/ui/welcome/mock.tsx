import { BannerDisplayTitle } from '@ui/banner';
import CoupleImage from '@images/banners/rings.jpg';

export const heroSection = {
    names: (
        <BannerDisplayTitle>
            Анастасия
            <br />& Георгий
        </BannerDisplayTitle>
    ),
    image: {
        alt: 'Анастасия и Георгий',
        src: CoupleImage as string,
    },
    title: <>МЫ ЖЕНИМСЯ</>,
    description:
        'Мы приглашаем вас разделить с нами день свадьбы. Приходите быть рядом и свидетелями этого тёплого, светлого события!',
};
