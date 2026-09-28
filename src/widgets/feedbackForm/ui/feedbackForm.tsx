'use client';
import { FeedbackFormDetails } from './feedbackFormDetails';
import { type FC } from 'react';
import { Button } from '@ui/button';
import { CheckerGroup } from '@ui/checkerGroup';
import { Form, FormControls, FormStep, VALIDATION_RULES } from '@ui/form';
import { Input } from '@ui/input';
import { Popover } from '@ui/popover';
import type { IFeedbackForm } from '../config';
import { useFeedbackForm } from '../model/useFeedbackForm';

export const FeedbackForm: FC<IFeedbackForm> = ({ id = 'feedback-form', extraCN, utilCN }) => {
    const { uid, activeStep, register, errors, time, submit } = useFeedbackForm(id);

    return (
        <Popover id={id}>
            <Form
                extraCN={{ isFeedback: true, ...extraCN, isSuccess: activeStep === '2' }}
                utilCN={utilCN}
                activeStepId={activeStep}
                // Оборачиваем весь Form в onSubmit, чтобы обрабатывать Enter и кнопки
                onSubmit={submit}
            >
                {/* Шаг 0: Основная информация */}
                {activeStep === '0' && (
                    <FormStep key={`${uid}-0`} id={'0'}>
                        <Input
                            label={'Фамилия Имя'}
                            error={errors.name?.message}
                            {...register('name', {
                                ...VALIDATION_RULES.requiredField,
                                ...VALIDATION_RULES.maxLength(50),
                            })}
                        />
                        <CheckerGroup
                            label={'Вы придёте?'}
                            type={'radio'}
                            error={errors.visit?.message}
                            options={[
                                {
                                    label: 'Да',
                                    value: 'yes',
                                    ...register('visit', {
                                        ...VALIDATION_RULES.requiredChoice,
                                    }),
                                },
                                {
                                    label: 'Нет',
                                    value: 'no',
                                    ...register('visit', {
                                        ...VALIDATION_RULES.requiredChoice,
                                    }),
                                },
                            ]}
                        />
                        <FormControls>
                            <Button extraCN={{ isOutline: true }} type='submit'>
                                Далее
                            </Button>
                        </FormControls>
                    </FormStep>
                )}

                {/* Шаг 1: Подробности */}
                {activeStep === '1' && (
                    <FormStep key={`${uid}-1`} id={'1'}>
                        <FeedbackFormDetails register={register} errors={errors} />
                        <FormControls>
                            <Button extraCN={{ isOutline: true }} type='submit'>
                                Отправить
                            </Button>
                        </FormControls>
                    </FormStep>
                )}

                {/* Шаг 2: Успех */}
                {activeStep === '2' && (
                    <FormStep key={`${uid}-2`} id={'2'}>
                        <p className={'h4'}>Анкета успешно отправлена!</p>
                        <span>Форма закроется через {time} сек...</span>
                    </FormStep>
                )}
            </Form>
        </Popover>
    );
};
