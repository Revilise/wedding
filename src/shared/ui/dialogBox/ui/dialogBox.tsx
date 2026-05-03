'use client';

import { useBEM } from '@lib/bem';
import type { IDialogBox } from '@ui/dialogBox/config/types.ts';
import type { FC } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';

export const DialogBox: FC<IDialogBox> = ({ extraCN, utilCN, isOpen, children, actions }) => {
    const { bem } = useBEM('dialog-box');

    const portalRoot =
        typeof document !== 'undefined' ? document.getElementById('portal') || document.body : null;

    if (!portalRoot) {
        return null;
    }

    return createPortal(
        <AnimatePresence initial={false}>
            {isOpen && (
                <div className={bem('', { extraCN, utilCN })}>
                    <motion.div
                        className={bem('backdrop')}
                        aria-hidden
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.div
                        className={bem('panel')}
                        role="dialog"
                        aria-modal="true"
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className={bem('body')}>{children}</div>
                        <div className={bem('actions')}>{actions}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        portalRoot,
    );
};
