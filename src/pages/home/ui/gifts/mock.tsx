import Cover2 from '@images/banners/mail-gift.jpg';

import { homeSectionAnchors } from '../../config/sectionAnchors.ts';

export const giftsSection = {
    anchorId: homeSectionAnchors.gifts,
    heading: 'Подарки',
    content: (
        <>
            <p>
                Ваше присутствие — главный подарок для нас!
                Если вы хотите помочь исполнить наши мечты, вы можете сделать <b>вклад суммой в конверте</b>.
            </p>
            <p>
                На площадке будет оборудована казна, запасные конверты и канцелярция. <mark>За самый оригинальный конверт будет разыгран приз.</mark>
            </p>
        </>
    ),
    image: {
        extraCN: { isFullHeight: true, 'isAspect[300/470]': true },
        src: Cover2 as string,
    },
};
