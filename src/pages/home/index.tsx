'use server';

import { header } from './config/header';
import { Layout } from '@widgets/layout';
import {
    CommunitySection,
    DressCodeSection,
    FeedbackSection,
    GiftsSection,
    WelcomeSection,
    ProgramSection,
    TimePlaceSection,
    SuggestionsSection,
    GallerySection,
    SeatingPlanSection,
    DressCodePaletteSection,
} from './ui';
import { footerNavigation } from './config/footerNavigation.ts';

export const HomePage = () => {
    return (
        <Layout extraCN={{ isSpaced: true }} header={header} footerNavigation={footerNavigation}>
            <WelcomeSection />
            <GallerySection />
            <TimePlaceSection />
            <ProgramSection />
            <SeatingPlanSection />
            <GiftsSection />
            <DressCodePaletteSection />
            <DressCodeSection />
            <CommunitySection />
            <FeedbackSection />
            <SuggestionsSection />
        </Layout>
    );
};
