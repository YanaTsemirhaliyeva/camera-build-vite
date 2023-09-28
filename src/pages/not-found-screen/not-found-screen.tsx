import { Link } from 'react-router-dom';
import styles from './not-found-screen.module.css';
import { AppRoute } from '../../const';

function NotFoundScreen(): JSX.Element {
  return (
    <div className={styles['container__not-found']}>
      <section className={styles['not-found']}>
        <h1 className={styles['not-found__title']}>404</h1>
        <p className={styles['not-found__text']}>Страница не найдена</p>
        <p className={styles['not-found__description']}>Извините, но страница, которую вы ищете, не существует</p>
        <Link to={AppRoute.Index} className={styles['not-found__button']} data-testid='back-home'>Вернуться домой</Link>
      </section>
    </div>
  );
}

export default NotFoundScreen;
