import { Section } from '@ui/section';
import { Image } from '@ui/image';
import { timePlaceSection } from './mock.tsx';

export const TimePlaceSection = () => (
    <Section
        extraCN={{ isTimePlace: true }}
        id={timePlaceSection.anchorId}
        heading={
            <>
                <h2 className={'h2'}>{timePlaceSection.heading}</h2>
                <div className={"align-right"}>{timePlaceSection.info}</div>
            </>
        }
    >
        <a target={'_blank'} href={timePlaceSection.mapLink}>
            <Image {...timePlaceSection.image} />
        </a>
    </Section>
);
