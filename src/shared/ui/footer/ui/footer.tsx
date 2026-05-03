import type { FC } from 'react';
import type { IFooter } from '../config/types.ts';
import { useBEM } from '@lib/bem';
import { Button } from '@ui/button';
import { Icon } from '@ui/icon';

export const Footer: FC<IFooter> = ({ extraCN, utilCN, navigation = [] }) => {
    const { bem } = useBEM('footer');

    return (
        <footer className={bem('', { extraCN, utilCN })}>
            <div className={bem('wrapper')}>
                <nav className={bem('navigation')}>
                    {navigation.map(({ href, label }, idx) => (
                        <Button
                            key={`footer-navigation-${idx}`}
                            extraCN={{ isNavLink: true }}
                            href={href}
                            type={'link'}
                        >
                            {label}
                        </Button>
                    ))}
                </nav>

                <div className={bem('logoWrapper')}>
                    <Icon extraCN={{ 'size-64': true }} name={'revilise'} />
                </div>
            </div>
        </footer>
    );
};
