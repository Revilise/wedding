import { request } from '@lib/request';
import { API, API_ENDPOINTS } from '@shared/const';
import { filterObject } from '@lib/object/filterObject';
import { toBoolean } from '@shared/lib';
import type { FeedbackFormData, FeedbackResponse } from '../config';

export function sendFeedback(data: FeedbackFormData, step: string): Promise<FeedbackResponse> {
    const payload = filterObject(
        {
            ...data,
            step,
            alcohol: toBoolean(data.alcohol),
            visit: toBoolean(data.visit),
        },
        ({ value }) => value !== ''
    );
    return request(payload, { url: `${API}${API_ENDPOINTS.feedback}`, method: 'post' });
}
