import { Section } from '@ui/section';
import { Grid, GridItem } from '@ui/grid';
import { Image } from '@ui/image';
import { giftsSection } from './mock.tsx';

export const GiftsSection = () => (
    <Section id={giftsSection.anchorId}>
        <Grid extraCN={{ is2Cols: true, isAlignCenter: true }}>
            <GridItem>
                <Image {...giftsSection.image} />
            </GridItem>

            <GridItem utilCN={['flex-column gap-32 align-right']}>
                <h2 className={'h2'}>{giftsSection.heading}</h2>
                {giftsSection.content}
            </GridItem>
        </Grid>
    </Section>
);
