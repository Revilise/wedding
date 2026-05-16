import { feedbackFormApiHandlers } from '../../widgets/feedbackForm/model/handlers.js';
import { suggestFormApiHandlers } from '../../widgets/suggestForm/model/handlers.js';

export const handlers = [...feedbackFormApiHandlers, ...suggestFormApiHandlers];
