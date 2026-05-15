import { Section } from '@ui/section';
import { heroSection } from './mock.tsx';
import { Banner } from '@ui/banner';

export const WelcomeSection = () => (
    <Section extraCN={{ isWelcome: true, isLarge: true, isMobFull: true }}>
        <Banner
            title={heroSection.names}
            image={heroSection.image}
            children={(
                <>
                    <h1 className={"h2 align-right"}>{heroSection.title}</h1>
                    <p className={"width[48]"}>{heroSection.description}</p>
                </>
            )}
        />
    </Section>
);
