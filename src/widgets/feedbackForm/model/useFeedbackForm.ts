import { useId, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { usePopover } from '@ui/popover';
import { useFeedback } from '@entities/feedback';
import { useCountdown } from '@lib/countdown';
import { sendFeedback } from '../api/sendFeedback';
import type { FeedbackFormData, FeedbackResponse } from '../config';
import { defaultValues, validation } from '../config/const';

export function useFeedbackForm(id: string) {
    const uid = useId();
    const [activeStep, setActiveStep] = useState('0');

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        reset: resetForm,
    } = useForm<FeedbackFormData>({ defaultValues });

    const { close: closePopover } = usePopover(id);
    const { start: startCountdown, time } = useCountdown(2, 2, () => {
        closePopover();
        resetForm();
        setActiveStep('0');
    });
    const { updateFeedback } = useFeedback();

    const onSubmit: SubmitHandler<FeedbackFormData> = async data => {
        if (!(await trigger(validation[activeStep]))) return;

        await sendFeedback(data, activeStep).then(onSuccess).catch(onFail);
    };

    const onSuccess = (resp: FeedbackResponse) => {
        const nextStep = resp.step;
        setActiveStep(nextStep);

        if (nextStep === '2' && resp.success) {
            startCountdown();
            updateFeedback(true);
        }
    };

    const onFail = (error: Error) => {
        console.error('Submission error', error);
    };

    return { uid, activeStep, register, errors, time, submit: handleSubmit(onSubmit) };
}
