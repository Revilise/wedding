import { type FC, useId } from 'react';
import type { ICheckerGroup } from '../config/types';
import { useBEM } from '@lib/bem';
import { Checker } from '@ui/checker';

export const CheckerGroup: FC<ICheckerGroup> = ({
    extraCN,
    utilCN,
    label,
    type = 'checkbox',
    options,
    error,
    ...handlers
}) => {
    const { bem } = useBEM('checkerGroup');
    const id = useId();

    return (
        <div className={bem('', { extraCN, utilCN })}>
            {label && <span className={bem('label')}>{label}</span>}
            <fieldset className={bem('options')} {...handlers}>
                {options.map((option, idx) => (
                    <Checker key={`${id}-${idx}`} type={type} {...option} />
                ))}
            </fieldset>
            {error && <span className={bem('error', { utilCN: ['form-error'] })}>{error}</span>}
        </div>
    );
};
