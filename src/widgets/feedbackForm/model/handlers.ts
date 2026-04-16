import { http, HttpResponse } from "msw";

import { API, API_ENDPOINTS } from "@shared/const";

import type { FeedbackFormData } from "../config/types";
import * as responses from "./mock";

export const feedbackFormApiHandlers = [
  http.post(`${API}${API_ENDPOINTS.feedback}`, async ({ request }) => {
    const body = (await request.json()) as FeedbackFormData;

    if (body.step === "1") {
      return HttpResponse.json(responses.step1Success);
    }

    return HttpResponse.json(responses.step0Success);
  }),
];

