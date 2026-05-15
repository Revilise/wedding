import { Section } from '@ui/section';
import { Icon } from '@ui/icon';
import { Button } from '@ui/button';
import { communitySection } from './mock.ts';

export const CommunitySection = () => (
    <Section
        id={communitySection.anchorId}
        extraCN={{ isCommunication: true, isSweetGreyBg: true, isWideVerticalPad: true }}
    >
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
);
