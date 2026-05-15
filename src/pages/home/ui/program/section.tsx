import { Fragment } from 'react';
import { Section } from '@ui/section';
import { Grid, GridItem } from '@ui/grid';
import { programSection } from './mock.ts';

export const ProgramSection = () => (
    <Section id={programSection.anchorId} extraCN={{ isOliveDrabBg: true }}>
        <Grid extraCN={{ isOffset: true }}>
            <h2 className={'h2'}>{programSection.heading}</h2>

            <GridItem
                utilCN={['p-24']}
                extraCN={{
                    isBorderRad32: true,
                    isContent: true,
                }}
            >
                <Grid extraCN={{ isMinAuto: true }} utilCN={['fullWidth']}>
                    {programSection.program.map(([time, label]) => (
                        <Fragment key={time}>
                            <span>{time}</span>
                            <span>{label}</span>
                        </Fragment>
                    ))}
                </Grid>
            </GridItem>
        </Grid>
    </Section>
);
