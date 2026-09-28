import type { FeedbackFormData } from './types';
export const defaultValues: FeedbackFormData = {
    visit: undefined,
    name: '',

    introduction: '',
    allergy: '',
    alcohol: undefined,
    step: '',
    fact: '',
    song: '',
    history: '',
    comment: '',
};

export const validation: Record<string, (keyof FeedbackFormData)[]> = {
    '0': ['name', 'visit'],
    '1': ['introduction', 'alcohol'],
};
