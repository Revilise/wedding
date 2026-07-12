import { type FC, useState } from 'react';
import { useBEM } from '@lib/bem';
import { AccordionContext, useAccordionContext } from '../config/context.ts';
import type { AccordionBreakpoint, IAccordion } from '../config/types.ts';

const BP_MODIFIER: Record<AccordionBreakpoint, string> = {
    mobile: 'isMobileOnly',
    tablet: 'isTabletOnly',
    smallMobile: 'isSmallMobileOnly',
};

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
                <div
                    className={bem('item', { extraCN: { ...bpMod, ...extraCN }, utilCN })}
                    data-open={isOpen}
                >
                    <button
                        className={bem('trigger')}
                        type="button"
                        onClick={() => setIsOpen(o => !o)}
                        aria-expanded={isOpen}
                    >
                        <span className={bem('label')}>{label}</span>
                        <span className={bem('icon')} aria-hidden="true" />
                    </button>
                    <div className={bem('body')} role="region">
                        <div className={bem('inner')}>{children}</div>
                    </div>
                </div>
            </div>
        </AccordionContext>
    );
};
