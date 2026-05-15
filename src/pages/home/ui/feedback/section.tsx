import { Section } from '@ui/section';
import { Grid } from '@ui/grid';
import { Button } from '@ui/button';
import { POPOVER } from '@shared/const';
import { FeedbackForm } from '@widgets/feedbackForm';
import { SurveyReminder } from '@widgets/surveyReminder';
import { feedbackSection } from './mock.tsx';

export const FeedbackSection = () => (
    <>
        <Section id={feedbackSection.anchorId} heading={<h2>{feedbackSection.heading}</h2>}>
            <Grid extraCN={{ isVariant2: true }}>
                {/*<Image src={feedbackSection.image} />*/}

                {feedbackSection.content}

                <Button extraCN={{ isFit: true, isOutline: true }} extraAttrs={{ [POPOVER.SHOW]: feedbackSection.popoverId }}>
                    Пройти опрос
                </Button>

                <FeedbackForm id={feedbackSection.popoverId} />
            </Grid>
        </Section>

        <SurveyReminder id={feedbackSection.popoverId} isOpen />
    </>
);
