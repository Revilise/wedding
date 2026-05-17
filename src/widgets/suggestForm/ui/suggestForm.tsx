'use client';

import { type FC, useEffect, useId, useState } from 'react';
import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@ui/button';
import { CheckerGroup } from '@ui/checkerGroup';
import { Form, FormControls, FormMessage, FormStep } from '@ui/form';
import { Input } from '@ui/input';
import { Textbox } from '@ui/textbox';

import { useCountdown } from '@lib/countdown';
import { filterObject } from '@lib/object/filterObject.ts';
import { request } from '@lib/request';
import { API, API_ENDPOINTS } from '@shared/const';
import { Locale } from '@shared/const/locale';

import type { ISuggestForm, SuggestFormData } from '../config/types';
import { Flex } from '@ui/flex';
import { VALIDATION_RULES } from '@ui/form/config/const.ts';

const defaultValues: SuggestFormData = {
    name: '',
    suggestion: '',
    duration: '',
    requirements: '',
    participants: undefined,
    teamMembers: [],
};

export const SuggestForm: FC<ISuggestForm> = ({ extraCN, utilCN }) => {
    const uid = useId();
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        watch,
        trigger,
        setError,
        clearErrors,
        formState: { errors },
        reset: resetForm,
        getValues
    } = useForm<SuggestFormData>({ defaultValues });

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: 'teamMembers',
    });

    const participants = watch('participants');
    const isTeam = participants === 'team';

    const { start: startCountdown, reset: resetCountdown, isEnd } = useCountdown(5);

    useEffect(() => {
        if (isTeam) return;
        replace([]);
    }, [isTeam, replace]);

    const onSubmit: SubmitHandler<SuggestFormData> = async (data) => {
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

        const payload = filterObject(
            {
                name: data.name,
                suggestion: data.suggestion,
                duration: data.duration,
                requirements: data.requirements,
                participants: teamMembers || []
            },
            ({ value }) => value !== '' && value !== undefined,
        );

        request(payload, { url: `${API}${API_ENDPOINTS.suggestion}`, method: 'post' })
            .then(onSuccess)
            .catch(onFail);
    };

    const onSuccess = (resp: { success: boolean }) => {
        if (!resp.success) return;

        setIsSuccess(true)
        startCountdown();
    };

    const onFail = (error: Error) => {
        console.error('Submission error', error);
    };

    const deleteTeamMember = (fieldId: number) => {
        remove(fieldId);
    }

    const addTeamMember = () => {
        const isAnyEmpty = getValues("teamMembers").some(({ fullName }) => !fullName.trim());
        if (isAnyEmpty) return;

        clearErrors('teamMembers');
        append({ fullName: '' });
    }

    useEffect(() => {
        if (!isEnd) return;

        resetForm();
        resetCountdown();
        setIsSuccess(false);
    }, [isEnd]);

    return (
        <Form
            extraCN={extraCN}
            utilCN={utilCN}
            onSubmit={handleSubmit(onSubmit)}
        >
            {!isSuccess && (
                <FormStep key={`${uid}-0`} id="0">
                    <Input
                        label="Фамилия Имя"
                        error={errors.name?.message}
                        {...register('name', {
                            ...VALIDATION_RULES.requiredField,
                            ...VALIDATION_RULES.maxLength(50)
                        })}
                    />
                    <Textbox
                        label="Предложение"
                        placeholder="я хочу спеть, станцевать или сделать что-то необычное"
                        error={errors.suggestion?.message}
                        {...register('suggestion', {
                            ...VALIDATION_RULES.requiredField,
                            ...VALIDATION_RULES.maxLength(250),
                        })}
                    />
                    <Input
                        label="Сколько нужно времени"
                        placeholder="5-7 минут или чуть больше"
                        error={errors.duration?.message}
                        {...register('duration', {
                            ...VALIDATION_RULES.requiredField,
                            ...VALIDATION_RULES.maxLength(50),
                        })}
                    />
                    <Input
                        label="Что для этого понадобится"
                        placeholder="Гитара, колонки, телевизор"
                        error={errors.requirements?.message}
                        {...register('requirements', {
                            ...VALIDATION_RULES.requiredField,
                            ...VALIDATION_RULES.maxLength(250),
                        })}
                    />
                    <CheckerGroup
                        label="Участники"
                        type="radio"
                        error={errors.participants?.message}
                        options={[
                            {
                                label: 'Я один',
                                value: 'alone',
                                ...register('participants', {
                                    ...VALIDATION_RULES.requiredChoice,
                                }),
                            },
                            {
                                label: 'С командой',
                                value: 'team',
                                ...register('participants', {
                                    ...VALIDATION_RULES.requiredChoice,
                                }),
                            },
                        ]}
                    />
                    {isTeam && (
                        <>
                            {fields.length > 0 &&  <p>Участники команды</p>}
                            {fields.map((field, index) => (
                                <Flex>
                                    <Input
                                        utilCN={["fullWidth"]}
                                        key={field.id}
                                        error={errors.teamMembers?.[index]?.fullName?.message}
                                        {...register(`teamMembers.${index}.fullName`, {
                                            ...VALIDATION_RULES.requiredField,
                                            ...VALIDATION_RULES.maxLength(50)
                                        })}
                                    />
                                    <Button utilCN={["mt-36"]} onClick={() => deleteTeamMember(field.id)}>-</Button>
                                </Flex>
                            ))}
                            {errors.teamMembers?.message && (
                                <span className="form-error">{errors.teamMembers.message}</span>
                            )}
                            <Button
                                type="button"
                                extraCN={{ isOutline: true }}
                                onClick={addTeamMember}
                            >
                                + добавить участников
                            </Button>
                        </>
                    )}
                    <FormControls>
                        <Button extraCN={{ isOutline: true }} type="submit">
                            Отправить
                        </Button>
                    </FormControls>
                </FormStep>
            )}

            {isSuccess && (
                <FormMessage extraCN={{ isSuccess: true }} key={"success-message"}>
                    <p className="h4">Заявка успешно отправлена!</p>
                </FormMessage>
            )}
        </Form>
    );
};
