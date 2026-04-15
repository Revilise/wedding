export const Header = () => {
    return (
        <header className={'header'}>
            <div className={'header__wrapper'}>
                <div className={'header__info'}>
                    <span className={'text bold'}>01.08.2026</span>
                    <span className={'text bold'}>14:00</span>
                    <span className={'separator'} />
                    <span className={'text bold'}>улица Савушкина, 21 - ресторан "Юность"</span>
                </div>
                <div className={'header__logoWrapper'}>
                    <span className={'text bold'}>A&G</span>
                </div>
            </div>
        </header>
    );
};
