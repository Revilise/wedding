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
    TimePlaceSection, SuggestionsSection, GallerySection,
} from './ui';
import { footerNavigation } from './config/footerNavigation.ts';

export const HomePage = () => {
    return (
        <Layout footerNavigation={footerNavigation}>
            <WelcomeSection />
            <GallerySection />
            <TimePlaceSection />
            <ProgramSection />
            <GiftsSection />
            <DressCodeSection />
            <DressExamplesSection />
            <CommunitySection />
            <FeedbackSection />
            <SuggestionsSection />
        </Layout>
    );
};
