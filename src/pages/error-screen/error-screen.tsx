import styles from './error-screen.module.css';
import { useAppDispatch } from '../../hooks';
import { fetchCamerasAction } from '../../store/api-actions';

function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <section className={styles.error}>
        <h1 className={styles['error__title']}>Неизвестная ошибка</h1>
        <p className={styles['error__text']}>Товар не найден</p>
        <p className={styles['error__description']}>Ошибка загрузки данных.<br/>Пожалуйста, попробуйте позже</p>
        <button
          onClick={() => {
            dispatch(fetchCamerasAction());
          }}
          className={styles['error__button']}
        >Вперёд
        </button>
      </section>
    </div>
  );
}

export default ErrorScreen;
