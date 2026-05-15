import { Section } from '@ui/section';
import { MasonryFlow } from '@widgets/masonryFlow';
import { dressExamplesSection } from './mock.ts';

export const DressExamplesSection = () => (
    <Section extraCN={{ isDressCode: true }}>
        <h4>{dressExamplesSection.heading}</h4>

        <MasonryFlow
            images={dressExamplesSection.images}
            getAlt={(i) => `Пример образа для дресс-кода, вариант ${i + 1}`}
        />
    </Section>
);
