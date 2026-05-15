'use server';

import { Layout } from '@ui/layout';
import {
    CommunitySection,
    DressCodeSection,
    DressExamplesSection,
    FeedbackSection,
    GiftsSection,
    WelcomeSection,
    ProgramSection,
    TimePlaceSection,
} from './ui';
import { footerNavigation } from './config/footerNavigation.ts';

export const HomePage = () => {
    return (
        <Layout footerNavigation={footerNavigation}>
            <WelcomeSection />
            <TimePlaceSection />
            <ProgramSection />
            <GiftsSection />
            <DressCodeSection />
            <DressExamplesSection />
            <CommunitySection />
            <FeedbackSection />
        </Layout>
    );
};
