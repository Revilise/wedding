import { type FC, useEffect, useState } from 'react';
import type { IFullscreen } from '../config';
import { useBEM } from '@lib/bem';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '@ui/button';
import { generateId } from '@lib/random';

export const Fullscreen: FC<IFullscreen> = ({ extraCN, utilCN, preview, isOpen: defaultIsOpen = false, children }) => {
    const { bem } = useBEM('fullscreen');
    const [isOpen, setIsOpen] = useState(defaultIsOpen);
    const [layoutId] = useState(() => generateId());

    function handleKeydown(e: KeyboardEvent) {
        if (e.key.toLowerCase() === 'escape') {
            setIsOpen(false);
        }
    }

    useEffect(function listenKeyboard() {
        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    return (
        <div className={bem('', { extraCN, utilCN })}>
            <motion.div layoutId={layoutId} className={bem('preview')} onClick={() => setIsOpen(true)}>
                {preview}
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={bem('wrapper')}
                        layoutId={layoutId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className={bem('modal')}>
                            <div className={bem('close')}>
                                <Button
                                    extraCN={{ isSquareGhost: true }}
                                    onClick={() => setIsOpen(false)}
                                    label={'X'}
                                />
                            </div>
                            <div className={bem('content')}>{children}</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
