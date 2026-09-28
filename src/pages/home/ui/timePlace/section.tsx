import { Section } from '@ui/section';
import { Image } from '@ui/image';
import { timePlaceSection } from './mock.tsx';
import { Flex } from '@ui/flex';

export const TimePlaceSection = () => (
    <Section extraCN={{ isTwoColumns: true, isLarge: true }} id={timePlaceSection.anchorId}>
        <Flex extraCN={{ isColumn: true, isGap3: true, isPadY3: true, isJustifyCenter: true }} utilCN={['text-left']}>
            <h2 className={'h2'}>{timePlaceSection.heading}</h2>
            <div className={'text-left'}>{timePlaceSection.info}</div>
        </Flex>

        <a target={'_blank'} href={timePlaceSection.mapLink}>
            <Image {...timePlaceSection.image} extraCN={{ ...timePlaceSection.image.extraCN, isLandscape: true }} />
        </a>
    </Section>
);
