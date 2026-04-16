import { type FC } from 'react';
import type { IForm } from '../config/types';
import { useBEM } from '@lib/bem';
import { ctx as FormContext } from '../config/ctx';
import { AnimatePresence } from 'motion/react';

export const Form: FC<IForm> = ({
    extraCN,
    utilCN,
    children,
    activeStepId = '0',
    ...props
}) => {
    const { bem } = useBEM('form');

    return (
        <FormContext.Provider value={{ bem, activeStepId }}>
            <form className={bem('', { extraCN, utilCN })} {...props}>
                <AnimatePresence>{children}</AnimatePresence>
            </form>
        </FormContext.Provider>
    );
};
