'use client';

import { type FC, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { IPopover } from '../config/types.ts';
import { useBEM } from '@lib/bem';
import PopoverObserver from '../model/observer.ts';
import { createPortal } from 'react-dom';
import { Button } from '@ui/button';
import { Icon } from '@ui/icon';
import { POPOVER } from '@shared/const';

export const PopoverBase: FC<IPopover> = ({ extraCN = {}, utilCN, id, children }) => {
    const { bem } = useBEM('popover');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const onOpenChange = (value: boolean) => setIsOpen(value);
        PopoverObserver.subscribe(id, onOpenChange);

        return function () {
            PopoverObserver.unsubscribe(id, onOpenChange);
        };
    }, [id]);

    return createPortal(
        <AnimatePresence initial={false}>
            {isOpen && (
                <>
                    <motion.div
                        className={'popover-overlay'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                    <motion.div
                        id={id}
                        className={bem('', { extraCN, utilCN })}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                    >
                        <div className={bem('wrapper')}>
                           <div className={bem("content")}>
                               <Button extraCN={{ isClosePopover: true }} extraAttrs={{ [POPOVER.HIDE]: id }}>
                                   <Icon name={'close'} />
                               </Button>

                               {children}
                           </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.getElementById('portal') || document.body
    );
};

