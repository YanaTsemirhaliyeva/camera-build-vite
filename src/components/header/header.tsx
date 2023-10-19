import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { memo, useEffect, useRef } from 'react';
import MemoSearchForm from '../search-form/search-form';
import { useAppSelector } from '../../hooks';
import { getBasketItems } from '../../store/basket/basket.selectors';

function Header(): JSX.Element {
  const basketItems = useAppSelector(getBasketItems);
  const quantityItems = basketItems.reduce((sum, item) => item.count + sum, 0);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(basketItems);
      localStorage.setItem('basket', json);
    }
    isMounted.current = true;
  }, [basketItems]);

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Index} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Index}>Каталог</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#">Гарантии</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#">Доставка</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <MemoSearchForm />
        <Link className="header__basket-link" to={AppRoute.Basket} data-testid='header-basket'>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {basketItems.length > 0 && <span className="header__basket-count">{quantityItems}</span>}
        </Link>
      </div>
    </header>
  );
}

const MemoHeader = memo(Header);
export default MemoHeader;
