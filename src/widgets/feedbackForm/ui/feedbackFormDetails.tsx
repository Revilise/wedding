import { Textbox } from '@ui/textbox';
import { Input } from '@ui/input';
import { CheckerGroup } from '@ui/checkerGroup';
import { VALIDATION_RULES } from '@ui/form';
import type { FeedbackFormDetailsProps } from '../config';
export const FeedbackFormDetails = ({ register, errors }: FeedbackFormDetailsProps) => (
    <>
        <Textbox
            label={'Забавно представьтесь в 1-2 предложениях.'}
            error={errors.introduction?.message}
            {...register('introduction', {
                ...VALIDATION_RULES.requiredField,
                ...VALIDATION_RULES.maxLength(250),
            })}
        />
        <Input
            label={'У вас есть аллергия на продукты?'}
            error={errors.allergy?.message}
            {...register('allergy', {
                ...VALIDATION_RULES.maxLength(160),
            })}
        />
        <Input
            label={'Факт о паре?'}
            error={errors.fact?.message}
            {...register('fact', {
                ...VALIDATION_RULES.maxLength(250),
            })}
        />
        <Input
            label={'Песня-ассоциация с парой?'}
            error={errors.song?.message}
            {...register('song', {
                ...VALIDATION_RULES.maxLength(100),
            })}
        />
        <Textbox
            label={'История, связанная с женихом или невестой?'}
            error={errors.history?.message}
            {...register('history', {
                ...VALIDATION_RULES.maxLength(500),
            })}
        />

        <CheckerGroup
            label={'Будете ли алкоголь?'}
            type={'radio'}
            error={errors.alcohol?.message}
            options={[
                {
                    label: 'Да',
                    value: 'yes',
                    ...register('alcohol', {
                        ...VALIDATION_RULES.requiredChoice,
                    }),
                },
                {
                    label: 'Нет',
                    value: 'no',
                    ...register('alcohol', {
                        ...VALIDATION_RULES.requiredChoice,
                    }),
                },
            ]}
        />

        <Textbox
            label={'Комментарии'}
            error={errors.comment?.message}
            {...register('comment', {
                ...VALIDATION_RULES.maxLength(250),
            })}
        />
    </>
);
