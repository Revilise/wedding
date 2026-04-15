import { type FC, useId } from 'react';
import type { IPalette } from './types';

import { useBEM } from '@lib/bem';
import { context as PaletteContext } from './ctx.ts';
import { PaletteColor } from './paletteColor.tsx';

export const Palette: FC<IPalette> = ({ extraCN, utilCN, colors = [] }) => {
    const id = useId();
    const { bem } = useBEM('palette');

    return (
        <PaletteContext.Provider value={{ bem }}>
            <div className={bem('', { extraCN, utilCN })}>
                {colors.map((color, idx: number) => (
                    <PaletteColor key={`${id}-${idx}`} {...color} />
                ))}
            </div>
        </PaletteContext.Provider>
    );
};
