import { Locale } from '@shared/const/locale.ts';

export const VALIDATION_RULES = {
    requiredField: {
        required: {
            value: true,
            message: Locale.form.invalid.requiredField
        },
    },
    requiredChoice: {
        required: {
            value: true,
            message: Locale.form.invalid.requiredChoice
        },
    },
    maxLength: (length: number) => ({
        maxLength: {
            value: length,
            message: `${Locale.form.invalid.tooLong} ${length}`,
        },
    })
}
