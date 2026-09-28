import { request } from '@lib/request';
import { API, API_ENDPOINTS } from '@shared/const';
import { filterObject } from '@lib/object/filterObject';
import type { SuggestFormData, SuggestResponse } from '../config';

export function sendSuggestion(data: SuggestFormData, teamMembers: string[] | undefined): Promise<SuggestResponse> {
    const payload = filterObject(
        {
            name: data.name,
            suggestion: data.suggestion,
            duration: data.duration,
            requirements: data.requirements,
            participants: teamMembers || [],
        },
        ({ value }) => value !== '' && value !== undefined
    );
    return request(payload, { url: `${API}${API_ENDPOINTS.suggestion}`, method: 'post' });
}
