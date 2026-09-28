import { feedbackFormApiHandlers } from '../../widgets/feedbackForm';
import { suggestFormApiHandlers } from '../../widgets/suggestForm';

export const handlers = [...feedbackFormApiHandlers, ...suggestFormApiHandlers];
