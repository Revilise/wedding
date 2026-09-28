import { Fragment } from 'react';
import { Section } from '@ui/section';
import { Grid, GridItem } from '@ui/grid';
import { programSection } from './mock';

export const ProgramSection = () => (
    <Section id={programSection.anchorId} extraCN={{ isOliveDrabBg: true, isProgram: true }}>
        <h2 className='h2'>{programSection.heading}</h2>
        <Grid extraCN={{ isMinAuto: true, isSchedule: true }}>
            {programSection.program.map(([time, label]) => (
                <Fragment key={time}>
                    <GridItem utilCN={['tabular-nums']}>{time}</GridItem>
                    <GridItem>{label}</GridItem>
                </Fragment>
            ))}
        </Grid>
    </Section>
);
