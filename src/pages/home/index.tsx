'use server';

import { Layout } from '@ui/layout';
import { Section } from '@ui/section';
import { Banner } from '@ui/banner';
import {
    communitySection,
    dressCodeSection,
    dressExamplesSection,
    feedbackSection,
    giftsSection,
    heroSection,
    inviteSection,
    programSection,
    timePlaceSection,
} from './store.tsx';
import { POPOVER } from '@shared/const';
import { Image } from '@ui/image';
import { Grid, GridItem } from '@ui/grid';
import { Icon } from '@ui/icon';
import { Button } from '@ui/button';
import { FeedbackForm } from '@widgets/feedbackForm';
import { Palette } from '@entities/palette';

export const HomePage = () => {
    return (
        <Layout>
            {/* Hero Banner */}
            <Section extraCN={{ isLarge: true }}>
                <Banner {...heroSection.banner} />
            </Section>

            {/* Invite guests */}
            <Section extraCN={{ isWelcome: true }} heading={<h2 className={'h2'}>{inviteSection.heading}</h2>}>
                <Grid extraCN={{ isVariant1: true }}>
                    <GridItem>
                        <p>{inviteSection.content}</p>
                    </GridItem>
                    <GridItem>
                        <Image {...inviteSection.image} />
                    </GridItem>
                </Grid>
            </Section>

            {/* Time & Place */}
            <Section>
                <Grid>
                    <Grid extraCN={{ isVariant2: true }}>
                        <h2 className={'h2'}>{timePlaceSection.heading}</h2>
                        <p>{timePlaceSection.info}</p>
                    </Grid>

                    <a
                        target={'_blank'}
                        href={
                            'https://yandex.ru/maps/2/saint-petersburg/house/ulitsa_savushkina_21/Z0kYdA9lQUYAQFtjfXV5d3xkbQ==/?ll=30.286220%2C59.986136&z=17.6'
                        }
                    >
                        <Image {...timePlaceSection.image} />
                    </a>
                </Grid>
            </Section>

            {/* Program/Timing */}
            <Section>
                <Grid extraCN={{ isOffset: true }}>
                    <GridItem
                        utilCN={['p-24']}
                        extraCN={{
                            isContent: true,
                        }}
                    >
                        <h2 className={'h2'}>{programSection.heading}</h2>
                    </GridItem>

                    <GridItem extraCN={{ isBorderRad32: true }}>
                        <Image extraCN={{ isHeight280: true }} src={programSection.image.src} />
                    </GridItem>

                    <GridItem
                        utilCN={['p-24']}
                        extraCN={{
                            isBorderRad32: true,
                            isContent: true,
                        }}
                    >
                        <Grid extraCN={{ isMinAuto: true }} utilCN={['fullWidth']}>
                            {programSection.program}
                        </Grid>
                    </GridItem>
                </Grid>
            </Section>

            <Section>
                <Grid extraCN={{ isVariant2: true }}>
                    <GridItem>
                        <Image {...giftsSection.image} />
                    </GridItem>

                    <GridItem utilCN={['flex-column gap-32 align-right']}>
                        <h2 className={'h2'}>{giftsSection.heading}</h2>
                        {giftsSection.content}
                    </GridItem>
                </Grid>
            </Section>

            {/* Dress code */}
            <Section
                extraCN={{ isDressCode: true }}
                heading={
                    <>
                        <h2 className={'h2'}>{dressCodeSection.heading}</h2>
                        <h4 className={'h4'}>{dressCodeSection.subTitle}</h4>
                    </>
                }
            >
                <div className={'flex-column gap-16'}>{dressCodeSection.content}</div>

                <Palette colors={dressCodeSection.palette} />
            </Section>

            <Section extraCN={{ isDressCode: true }}>
                <h4>{dressExamplesSection.heading}</h4>

                <Grid extraCN={{ isAuto: true, isMob2Cols: true }}>
                    {dressExamplesSection.images.map((image, idx) => (
                        <GridItem key={`dress-example-${idx}`}>
                            <Image src={image} />
                        </GridItem>
                    ))}
                </Grid>
            </Section>

            <Section extraCN={{ isCommunication: true, isSweetGreyBg: true, isWideVerticalPad: true }}>
                <div className={'flex-column gap-32'}>
                    <h2 className={'h2'}>{communitySection.heading}</h2>
                    <p>Присоединяйтесь к нашему телеграмм-каналу - будем делиться фото и видео с праздника</p>
                </div>

                <Button
                    extraCN={{ isQr: true }}
                    href={communitySection.qrCode.link}
                    type={'link'}
                    extraAttrs={{ target: '_blank' }}
                >
                    <Icon {...communitySection.qrCode} />
                </Button>
            </Section>

            <Section heading={<h2>{feedbackSection.heading}</h2>}>
                <Grid extraCN={{ isVariant2: true }}>
                    <Image src={feedbackSection.image} />

                    {feedbackSection.content}

                    <Button extraCN={{ isFit: true }} extraAttrs={{ [POPOVER.SHOW]: feedbackSection.popoverId }}>
                        Пройти опрос
                    </Button>

                    <FeedbackForm id={feedbackSection.popoverId} />
                </Grid>
            </Section>

            {/*<ScaleSuggest />*/}
        </Layout>
    );
};
