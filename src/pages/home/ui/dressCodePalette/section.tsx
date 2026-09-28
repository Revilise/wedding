import { Section } from '@ui/section';
import { Palette } from '@entities/palette';
import { dressCodeSection } from './mock.tsx';

export const DressCodePaletteSection = () => {
    return (
        <Section
            id={dressCodeSection.anchorId}
            extraCN={{ isStacked: true }}
            heading={
                <>
                    <h2 className='h2'>{dressCodeSection.heading}</h2>
                    <h4 className='h4'>{dressCodeSection.subTitle}</h4>
                </>
            }
        >
            <div className='flex-column gap-16'>{dressCodeSection.content}</div>
            <Palette colors={dressCodeSection.palette} />
            <p>При подборе образов покажите эту палитру консультантам или стилистам в магазине.</p>
        </Section>
    );
};
