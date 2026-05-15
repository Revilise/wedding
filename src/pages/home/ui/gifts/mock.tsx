import Cover2 from '@images/banners/gift.jpg';

import { homeSectionAnchors } from '../../config/sectionAnchors.ts';

export const giftsSection = {
    anchorId: homeSectionAnchors.gifts,
    heading: 'Подарки',
    content: (
        <>
            <p>
                Ваше присутствие — главный подарок для нас!
                Если вы хотите помочь исполнить нашу мечту, вы можете сделать
                вклад на наш <a target={'_blank'} href={'https://messenger.online.sberbank.ru/sl/ZsD6SVV8GoieqfmRu'}>специальный счёт</a>.
            </p>
            <p>Мы решили отказаться от бумажных конвертов в пользу современных технологий.</p>
        </>
    ),
    image: {
        extraCN: { isFullHeight: true, 'isAspect[300/470]': true },
        src: Cover2 as string,
    },
};
