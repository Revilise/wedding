import type { FC } from 'react';
import type { Iinput } from '../config/types';
import { useBEM } from '@lib/bem';

export const Input: FC<Iinput> = ({
    extraCN,
    utilCN,
    type = 'text',
    name,
    label,
    value,
    ref,
    error,
    autocomplete = false,
    placeholder,
    ...handlers
}) => {
    const { bem } = useBEM('input');
    console.log(error);
    return (
        <label className={bem('', { extraCN, utilCN })}>
            {label && <span className={bem('label')}>{label}</span>}
            <input
                ref={ref}
                name={name}
                type={type}
                className={bem('value')}
                value={value}
                aria-invalid={!!error}
                placeholder={placeholder}
                {...handlers}
                autoComplete={autocomplete ? 'on' : 'off'}
            />
            {error && <span className={bem('error', { utilCN: ['form-error'] })}>{error}</span>}
        </label>
    );
};
