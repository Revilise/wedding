import type { FC } from 'react';
import type { IChecker } from '@ui/checker/config/types.ts';
import { useBEM } from '@lib/bem';
import { motion } from 'motion/react';

export const Checker: FC<IChecker> = ({
    extraCN,
    utilCN,
    isChecked,
    name,
    type = 'checkbox',
    label,
    value,
    ref,
    ...handlers
}) => {
    const { bem } = useBEM('checker');

    return (
        <motion.label whileTap={{ y: 5 }} className={bem('', { extraCN, utilCN })}>
            <span className={bem('pseudo')} />
            {label && <span className={bem('label')}>{label}</span>}
            <input
                ref={ref}
                className={bem('value')}
                name={name}
                type={type}
                value={value}
                checked={isChecked}
                {...handlers}
            />
        </motion.label>
    );
};
