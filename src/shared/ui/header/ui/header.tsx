import { Button } from '@ui/button';

export const Header = () => {
  return (
    <header className={"header"}>
      <div className={"header__wrapper"}>
        <div className={"header__info"}>
          <div className={"header__dateTime"}>
            <span>01.08.2026</span>
            <span>14:00</span>
          </div>
          <div className={'header__address'}>
            <address>улица Савушкина, 21 - ресторан "Юность"</address>
          </div>
        </div>
        <div className={'header__logoWrapper'}>
          <Button
              extraCN={{ isLogoLink: true }}
              type={"link"}
              href={"/"}
              label={"A&G"}
              motion={false}
          />
        </div>
      </div>
    </header>
  );
};

