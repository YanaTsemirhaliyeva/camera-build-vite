import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import styles from './basket-empty.module.css';
import classNames from 'classnames';

function BasketEmpty(): JSX.Element {
  return (
    <>
      <div className={styles.title}>Корзина пуста</div>
      <div className={styles.description}>Чтобы найти товары, воспользуйтесь поиском</div>
      <Link className={classNames(`${styles.button} btn btn--purple product-card__btn`)} to={AppRoute.Index}>
        За покупками
      </Link>
    </>
  );
}

export default BasketEmpty;
