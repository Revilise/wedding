import type { IFormContext, IFormControls } from '@ui/form/config/types.ts';
import { type FC, useContext } from 'react';
import { ctx as FormContext } from '../config/ctx';

export const FormControls: FC<IFormControls> = ({ extraCN, utilCN, children }) => {
    const { bem } = useContext<IFormContext>(FormContext);

    return <div className={bem('controls', { extraCN, utilCN })}>{children}</div>;
};
