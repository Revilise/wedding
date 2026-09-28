import { useId } from 'react';
import type { FC, MouseEventHandler } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Button } from '@ui/button';
import { useBEM } from '@lib/bem';
import { ctx } from '../config';
import type { ITabs } from '../config';
import { useTabs } from '../model';

export const Tabs: FC<ITabs> = ({ children, activeTab, items, extraCN, utilCN, id, style, extraAttrs }) => {
    const tabs = useTabs({ activeTab });
    const { bem } = useBEM('tabs');
    const tabsId = useId();
    const reducedMotion = useReducedMotion();

    return (
        <ctx.Provider value={tabs}>
            <div {...extraAttrs} id={id} className={bem('', { extraCN, utilCN })} style={style}>
                <div className={bem('navigation')}>
                    {items.map((item, index) =>
                        item.navigation?.map((navigation, buttonIndex) => (
                            <Button
                                {...navigation}
                                key={`${index}-${buttonIndex}`}
                                type='button'
                                utilCN={[
                                    ...(navigation.utilCN ?? []),
                                    ...(tabs.activeTab === index ? ['isActive'] : []),
                                ]}
                                extraAttrs={{
                                    ...navigation.extraAttrs,
                                    'aria-pressed': tabs.activeTab === index,
                                    'aria-controls': `${tabsId}-content`,
                                }}
                                onClick={event => {
                                    (
                                        navigation.onClick as
                                            | MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
                                            | undefined
                                    )?.(event);
                                    if (!event.defaultPrevented) tabs.setActiveTab(index);
                                }}
                            />
                        ))
                    )}
                </div>
                <div id={`${tabsId}-content`} className={bem('content')}>
                    {children}
                    <AnimatePresence initial={false} mode='wait'>
                        {items.map((item, index) =>
                            tabs.activeTab === index ? (
                                <motion.div
                                    key={index}
                                    className={bem('panel')}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: reducedMotion ? 0 : 0.2 }}
                                >
                                    {item.children}
                                </motion.div>
                            ) : null
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </ctx.Provider>
    );
};
