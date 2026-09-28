'use client';

import type { FC, Ref } from 'react';
import { motion } from 'motion/react';

import { useBEM } from '@lib/bem';
import type { IButton } from '../config/types';

export const Button: FC<IButton> = ({
    extraCN = {},
    utilCN,
    href,
    extraAttrs,
    type = 'button',
    style,
    label,
    size,
    children,
    ref,
    motion: motionProps = { whileTap: { y: 5 }, whileHover: { scale: 1.02 } },
    ...handlers
}) => {
    const { bem } = useBEM('btn');
    const props = {
        className: bem('', { extraCN: { ...extraCN, ...(size ? { [`isSize${size}`]: true } : {}) }, utilCN }),
        style,
        ...extraAttrs,
        ...(typeof motionProps === 'object' ? motionProps : {}),
        ...handlers,
    };
    const content = (
        <>
            {label && <span className={bem('label')}>{label}</span>}
            {children}
        </>
    );

    return type === 'link' ? (
        <motion.a {...props} href={href} ref={ref as Ref<HTMLAnchorElement>}>
            {content}
        </motion.a>
    ) : (
        <motion.button {...props} type={type} ref={ref as Ref<HTMLButtonElement>}>
            {content}
        </motion.button>
    );
};
