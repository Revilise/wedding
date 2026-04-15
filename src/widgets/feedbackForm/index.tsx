import type { FC } from 'react';
import { ErrorBoundary } from '@features/errorBoundary';

import type { IFeedbackForm } from './types.ts';
import { FeedbackForm as FeedbackFormComponent } from './feedbackForm.tsx';

export const FeedbackForm: FC<IFeedbackForm> = props => {
    return (
        <ErrorBoundary>
            <FeedbackFormComponent {...props} />
        </ErrorBoundary>
    );
};
