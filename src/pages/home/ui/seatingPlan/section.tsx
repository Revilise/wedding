import { Section } from '@ui/section';
import { Zoom } from '@ui/zoom';
import { Accordion, AccordionItem } from '@ui/accordion';
import { seatingPlanSection } from './mock.ts';
import { Flex, FlexItem } from '@ui/flex';
import { Grid } from '@ui/grid';

export const SeatingPlanSection = () => {
    return (
        <Section id={seatingPlanSection.anchorId} extraCN={{}} heading={
            <h2 className={'h2'}>{seatingPlanSection.heading}</h2>
        }>

            <Zoom
                image={{
                    src: seatingPlanSection.image.src,
                    alt: seatingPlanSection.image.alt,
                }}
                extraCN={{
                    isOutline: true
                }}
                height={400}
                width={400}
                showControls
            />

            <Accordion label={seatingPlanSection.subtitle} breakpoint="mobile">
                <Grid extraCN={{ is3Cols: true }} utilCN={["pt-24"]}>
                    {seatingPlanSection.tables.map((table, idx) => (
                        <Flex key={idx} extraCN={{ isColumn: true }}>
                            {table.guests.map((guest, idx) => (
                                <FlexItem key={idx}>{guest.place}. {guest.name}</FlexItem>
                            ))}
                        </Flex>
                    ))}
                </Grid>
            </Accordion>
        </Section>
    )
}
