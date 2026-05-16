import type { IFormContext, IFormMessage } from '@ui/form/config/types.ts';
import { type FC, useContext } from 'react';
import { ctx as FormContext } from '@ui/form';
import { motion } from 'motion/react';

export const FormMessage: FC<IFormMessage> = ({
    extraCN,
    utilCN,
    children
}) => {
    const { bem } = useContext<IFormContext>(FormContext);

    return (
        <motion.div
            className={bem("message", { extraCN, utilCN })}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
        >
            {children}
        </motion.div>
    )
}
