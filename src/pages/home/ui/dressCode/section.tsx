import { Section } from '@ui/section';
import { Palette } from '@entities/palette';
import { dressCodeSection } from './mock.tsx';

export const DressCodeSection = () => (
    <Section
        id={dressCodeSection.anchorId}
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

        <p>При подборе образов покажите эту палитру консультатам/стилистам в магазине.</p>
    </Section>
);
