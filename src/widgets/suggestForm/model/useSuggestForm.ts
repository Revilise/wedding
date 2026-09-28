import { useEffect, useId, useState } from 'react';
import { useFieldArray, useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { Locale } from '@shared/const/locale';
import { useCountdown } from '@lib/countdown';
import { sendSuggestion } from '../api/sendSuggestion';
import type { SuggestFormData, SuggestResponse } from '../config';
import { defaultValues } from '../config/const';

export function useSuggestForm() {
    const uid = useId();
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        trigger,
        setError,
        clearErrors,
        formState: { errors },
        reset: resetForm,
        getValues,
    } = useForm<SuggestFormData>({ defaultValues });

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: 'teamMembers',
    });

    const participants = useWatch({ control, name: 'participants' });
    const isTeam = participants === 'team';

    const { start: startCountdown } = useCountdown(5, 2, () => {
        resetForm();
        setIsSuccess(false);
    });

    useEffect(() => {
        if (isTeam) return;
        replace([]);
    }, [isTeam, replace]);

    const onSubmit: SubmitHandler<SuggestFormData> = async data => {
        const isValid = await trigger([
            'name',
            'suggestion',
            'duration',
            'requirements',
            'participants',
            ...(data.participants === 'team' ? (['teamMembers'] as const) : []),
        ]);

        if (!isValid) return;

        const teamMembers =
            data.participants === 'team'
                ? data.teamMembers.map(({ fullName }) => fullName.trim()).filter(Boolean)
                : undefined;

        if (data.participants === 'team' && !teamMembers?.length) {
            setError('teamMembers', { message: Locale.form.invalid.requiredField });
            return;
        }

        clearErrors('teamMembers');

        await sendSuggestion(data, teamMembers).then(onSuccess).catch(onFail);
    };

    const onSuccess = (resp: SuggestResponse) => {
        if (!resp.success) return;

        setIsSuccess(true);
        startCountdown();
    };

    const onFail = (error: Error) => {
        console.error('Submission error', error);
    };

    const deleteTeamMember = (fieldId: number) => {
        remove(fieldId);
    };

    const addTeamMember = () => {
        const isAnyEmpty = getValues('teamMembers').some(({ fullName }) => !fullName.trim());
        if (isAnyEmpty) return;

        clearErrors('teamMembers');
        append({ fullName: '' });
    };

    return {
        uid,
        isSuccess,
        register,
        errors,
        isTeam,
        fields,
        addTeamMember,
        deleteTeamMember,
        submit: handleSubmit(onSubmit),
    };
}
