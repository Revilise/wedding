import {http, HttpResponse} from "msw";
import {API, API_ENDPOINTS} from "@shared/const";

import * as responses from "./mock.ts";
import type {FeedbackFormData} from "@widgets/feedbackForm/types.ts";

export const feedbackFormApiHandlers = [
   http.post(`${API}${API_ENDPOINTS.feedback}`, async ({ request, params }) => {
      const body = await request.json() as FeedbackFormData;

      if (body.step === "1") {
         return HttpResponse.json(responses.step1Success)
      }

      return HttpResponse.json(responses.step0Success)
   }),
]
