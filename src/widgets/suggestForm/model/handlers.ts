import { http, HttpResponse } from 'msw';

import { API, API_ENDPOINTS } from '@shared/const';

import * as responses from './mock';

export const suggestFormApiHandlers = [
    http.post(`${API}${API_ENDPOINTS.suggestions}`, async () => {
        return HttpResponse.json(responses.submitSuccess);
    }),
];
