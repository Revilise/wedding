import { type FC, useCallback, useContext, useState } from 'react';

import type { IPaletteColor } from '@entities/palette/types.ts';
import { copyToClipboard } from '@features/copy/lib.ts';
import { context as PaletteContext } from './ctx.ts';
import { motion } from 'motion/react';

export const PaletteColor: FC<IPaletteColor> = ({ hex, name }) => {
    const { bem } = useContext(PaletteContext);
    const [status, setStatus] = useState('default');

    const onClick = useCallback(() => {
        copyToClipboard(hex)
            .then(() => setStatus('success'))
            .catch(() => setStatus('error'))
            .finally(() => {
                setTimeout(() => setStatus('default'), 1000);
            });
    }, [hex]);

    const extraCN = {
        isSuccess: status === 'success',
        isError: status === 'error',
    };

    return (
        <motion.div
            className={bem('color', { extraCN })}
            style={{ background: hex, color: hex }}
            whileTap={{ y: 5 }}
            whileHover={{ scale: 1.02 }}
            onClick={onClick}
        >
            {status === 'success' && <span>Скопировано!</span>}

            {status === 'error' && <span>Ошибка копирования :(</span>}

            {status === 'default' && (
                <>
                    <span>{hex}</span>
                    <span>{name}</span>
                </>
            )}
        </motion.div>
    );
};
