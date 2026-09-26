import { Section } from '@ui/section';
import { seatingPlanSection } from './mock.ts';
import { SeatingPlan } from './seatingPlan.tsx';

export const SeatingPlanSection = () => (
    <Section
        id={seatingPlanSection.anchorId}
        heading={
            <>
                <h2 className='h2'>{seatingPlanSection.heading}</h2>
                <p>Найдите своё имя — и своё место за праздничным столом.</p>
            </>
        }
    >
        <SeatingPlan image={seatingPlanSection.image} tables={seatingPlanSection.tables} />
    </Section>
);
