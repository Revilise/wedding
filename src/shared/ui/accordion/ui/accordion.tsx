import { Button } from '@ui/button';
import { type FC, useState } from 'react';
import { useBEM } from '@lib/bem';
import { AccordionContext, BP_MODIFIER } from '../config';
import { useAccordionContext } from '../model';
import type { IAccordion } from '../config/types.ts';

export const Accordion: FC<IAccordion> = ({
    extraCN,
    utilCN,
    label,
    children,
    defaultOpen = false,
    breakpoint: breakpointProp,
}) => {
    const { bem } = useBEM('accordion');
    const { breakpoint: breakpointCtx } = useAccordionContext();
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const breakpoint = breakpointProp ?? breakpointCtx;
    const bpMod = breakpoint ? { [BP_MODIFIER[breakpoint]]: true } : {};

    return (
        <AccordionContext value={{ breakpoint }}>
            <div className={bem('', { extraCN, utilCN })}>
                <div className={bem('item', { extraCN: { ...bpMod, ...extraCN }, utilCN })} data-open={isOpen}>
                    <Button
                        utilCN={[bem('trigger')]}
                        type='button'
                        onClick={() => setIsOpen(o => !o)}
                        extraCN={{ isSpacedRow: true }}
                        motion={false}
                        extraAttrs={{ 'aria-expanded': isOpen }}
                    >
                        <span className={bem('label')}>{label}</span>
                        <span className={bem('icon')} aria-hidden='true' />
                    </Button>
                    <div className={bem('body')} role='region'>
                        <div className={bem('inner')}>{children}</div>
                    </div>
                </div>
            </div>
        </AccordionContext>
    );
};
