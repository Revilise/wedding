import { type FC, useContext } from 'react';
import type { IFormContext, IFormStep } from '@ui/form/config/types.ts';
import { ctx as FormContext } from '../config/ctx';
import { motion } from 'motion/react';

export const FormStep: FC<IFormStep> = ({ extraCN, utilCN, id = '0', children }) => {
    const { bem, activeStepId } = useContext<IFormContext>(FormContext);

    return (
        id === activeStepId && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={bem('step', { extraCN, utilCN })}
            >
                {children}
            </motion.div>
        )
    );
};
