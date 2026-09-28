import { Section } from '@ui/section';
import { heroSection } from './mock.tsx';
import { Banner, BannerHeading, BannerDescription } from '@ui/banner';

export const WelcomeSection = () => (
    <Section extraCN={{ isLarge: true, isMobInset: true }}>
        <Banner
            extraCN={{ isSplit: true }}
            title={heroSection.names}
            image={heroSection.image}
            children={
                <>
                    <BannerHeading>{heroSection.title}</BannerHeading>
                    <BannerDescription>{heroSection.description}</BannerDescription>
                </>
            }
        />
    </Section>
);
