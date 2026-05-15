import { Section } from '@ui/section';
import { heroSection } from './mock.tsx';
import { Banner } from '@ui/banner';

export const WelcomeSection = () => (
    <Section extraCN={{ isWelcome: true, isLarge: true }}>
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

        {/*<Flex*/}
        {/*    extraCN={{ isColumn: true, isGap3: true }}*/}
        {/*>*/}
        {/*    <p className={'special'}>{heroSection.names}</p>*/}
        {/*    <h1 className={'h1'}>{heroSection.title}</h1>*/}
        {/*    <p>{heroSection.description}</p>*/}
        {/*</Flex>*/}

        {/*<Image*/}
        {/*    alt={heroSection.image.alt}*/}
        {/*    extraCN={{ 'isAspect[300/470]': true }}*/}
        {/*    src={heroSection.image.src}*/}
        {/*/>*/}
    </Section>
);
