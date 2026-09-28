import { Button } from '@ui/button';

import type { IHeader } from '../config';

export const Header = ({ date, time, address, logo }: IHeader) => {
    return (
        <header className={'header'}>
            <div className={'header__wrapper'}>
                <div className={'header__info'}>
                    <div className={'header__dateTime'}>
                        <span>{date}</span>
                        <span>{time}</span>
                    </div>
                    <div className={'header__address'}>
                        <address>{address}</address>
                    </div>
                </div>
                <div className={'header__logoWrapper'}>
                    <Button
                        extraCN={{ isUnstyled: true, isSerif: true }}
                        type={'link'}
                        href={'/'}
                        label={logo}
                        motion={false}
                    />
                </div>
            </div>
        </header>
    );
};
