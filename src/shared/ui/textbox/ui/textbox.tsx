import type { FC } from 'react';
import type { Itextbox } from '../config/types';
import { useBEM } from '@lib/bem';

export const Textbox: FC<Itextbox> = ({
    extraCN,
    utilCN,
    name,
    label,
    value,
    ref,
    error,
    rows = 4,
    autocomplete = false,
    ...handlers
}) => {
    const { bem } = useBEM('textbox');

    return (
        <label className={bem('', { extraCN, utilCN })}>
            {label && <span className={bem('label')}>{label}</span>}
            <textarea
                ref={ref}
                name={name}
                rows={rows}
                className={bem('value')}
                value={value}
                aria-invalid={!!error}
                {...handlers}
                autoComplete={autocomplete ? 'on' : 'off'}
            />
            {error && <span className={bem('error', { utilCN: ['form-error'] })}>{error}</span>}
        </label>
    );
};
