'use client';
import { SuggestFormTeamMembers } from './suggestFormTeamMembers';
import type { FC } from 'react';
import { Button } from '@ui/button';
import { CheckerGroup } from '@ui/checkerGroup';
import { Form, FormControls, FormMessage, FormStep, VALIDATION_RULES } from '@ui/form';
import { Input } from '@ui/input';
import { Textbox } from '@ui/textbox';
import type { ISuggestForm } from '../config';
import { useSuggestForm } from '../model/useSuggestForm';

export const SuggestForm: FC<ISuggestForm> = ({ extraCN, utilCN }) => {
    const { uid, isSuccess, register, errors, isTeam, fields, addTeamMember, deleteTeamMember, submit } =
        useSuggestForm();

    return (
        <Form extraCN={{ ...extraCN, isSuccess }} utilCN={['suggestForm', ...(utilCN ?? [])]} onSubmit={submit}>
            {!isSuccess && (
                <FormStep key={`${uid}-0`} id='0'>
                    <Input
                        label='Фамилия Имя'
                        error={errors.name?.message}
                        {...register('name', {
                            ...VALIDATION_RULES.requiredField,
                            ...VALIDATION_RULES.maxLength(50),
                        })}
                    />
                    <Textbox
                        label='Предложение'
                        placeholder='я хочу спеть, станцевать или сделать что-то необычное'
                        error={errors.suggestion?.message}
                        {...register('suggestion', {
                            ...VALIDATION_RULES.requiredField,
                            ...VALIDATION_RULES.maxLength(250),
                        })}
                    />
                    <Input
                        label='Сколько нужно времени'
                        placeholder='5-7 минут или чуть больше'
                        error={errors.duration?.message}
                        {...register('duration', {
                            ...VALIDATION_RULES.requiredField,
                            ...VALIDATION_RULES.maxLength(50),
                        })}
                    />
                    <Input
                        label='Что для этого понадобится'
                        placeholder='Гитара, колонки, телевизор'
                        error={errors.requirements?.message}
                        {...register('requirements', {
                            ...VALIDATION_RULES.requiredField,
                            ...VALIDATION_RULES.maxLength(250),
                        })}
                    />
                    <CheckerGroup
                        label='Участники'
                        type='radio'
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
                        <SuggestFormTeamMembers
                            fields={fields}
                            register={register}
                            errors={errors}
                            addTeamMember={addTeamMember}
                            deleteTeamMember={deleteTeamMember}
                        />
                    )}
                    <FormControls>
                        <Button extraCN={{ isOutline: true }} type='submit'>
                            Отправить
                        </Button>
                    </FormControls>
                </FormStep>
            )}

            {isSuccess && (
                <FormMessage key={'success-message'}>
                    <p className='h4'>Заявка успешно отправлена!</p>
                </FormMessage>
            )}
        </Form>
    );
};
