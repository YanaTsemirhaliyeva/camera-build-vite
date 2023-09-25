import { Fragment } from 'react';
import { RATING_VALUES, TITLE_RATING_VALUES } from '../../const';
import LayoutModal from '../layout-modal/layoyt-modal';
import { ReviewPost } from '../../types/review';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks';
import { useParams } from 'react-router-dom';
import { postReviewAction } from '../../store/api-actions';
import classNames from 'classnames';

type ModalFormReviewProps = {
  isActive: boolean;
  setIsModalActive: (arg: boolean) => void;
}

function ModalFormReview({isActive, setIsModalActive}: ModalFormReviewProps): JSX.Element {
  const dispatch = useAppDispatch();
  const id = useParams().cameraId;

  const {register, handleSubmit, formState: {errors}, reset} = useForm<ReviewPost>({
    defaultValues: {},
    mode: 'onSubmit'
  });

  const onFormSubmit = (data: ReviewPost) => {
    (async () => {
      const cameraId = Number(id);
      const rating = Number(data.rating);
      const action = await dispatch(postReviewAction({...data, cameraId, rating}));
      if (postReviewAction.fulfilled.match(action)) {
        setIsModalActive(false);
        reset();
      }
    })();
  };

  return (
    <LayoutModal isActive={isActive} setIsModalActive={setIsModalActive}>
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form method="post" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="form-review__rate">
            <fieldset className={classNames({'is-invalid': errors.rating}, 'rate form-review__item')}>
              <legend className="rate__caption">Рейтинг
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </legend>
              <div className="rate__bar">
                <div className="rate__group">
                  {RATING_VALUES.reverse().map((item) => (
                    <Fragment key={item}>
                      <input className="visually-hidden"
                        id={`star-${item}`} type="radio"
                        value={item}
                        {...register('rating', {required: true})}
                      />
                      <label className="rate__label" htmlFor={`star-${item}`} title={TITLE_RATING_VALUES[item]}></label>
                    </Fragment>
                  ))}
                </div>
                <div className="rate__progress">
                  <span className="rate__stars">0</span> <span>/</span> <span className="rate__all-stars">5</span>
                </div>
              </div>
              {errors.rating && <p className="rate__message">Нужно оценить товар</p>}
            </fieldset>
            <div className={classNames({'is-invalid': errors.userName}, 'custom-input form-review__item')}>
              <label>
                <span className="custom-input__label">Ваше имя
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input type="text" placeholder="Введите ваше имя"
                  {...register('userName', {required: true})}
                  data-autofocus
                />
              </label>
              {errors.userName && <p className="custom-input__error">Нужно указать имя</p>}
            </div>
            <div className={classNames({'is-invalid': errors.advantage}, 'custom-input form-review__item')}>
              <label>
                <span className="custom-input__label">Достоинства
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input type="text" placeholder="Основные преимущества товара"
                  {...register('advantage', {required: true})}
                />
              </label>
              {errors.advantage && <p className="custom-input__error">Нужно указать достоинства</p>}
            </div>
            <div className={classNames({'is-invalid': errors.disadvantage}, 'custom-input form-review__item')}>
              <label>
                <span className="custom-input__label">Недостатки
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input type="text" placeholder="Главные недостатки товара"
                  {...register('disadvantage', {required: true})}
                />
              </label>
              {errors.disadvantage && <p className="custom-input__error">Нужно указать недостатки</p>}
            </div>
            <div className={classNames({'is-invalid': errors.review}, 'custom-textarea form-review__item')}>
              <label>
                <span className="custom-textarea__label">Комментарий
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <textarea minLength={5} placeholder="Поделитесь своим опытом покупки"
                  {...register('review', {
                    required: true,

                    minLength: {
                      value: 10,
                      message: 'Минимум 10 символов'
                    },
                    maxLength: {
                      value: 160,
                      message: 'Максимум 160 символов'
                    }
                  })}
                >
                </textarea>
              </label>
              {/* {errors.review && <div className="custom-textarea__error">Нужно добавить комментарий</div>} */}
              {errors.review && <div className="custom-textarea__error">{errors.review.message}</div>}

            </div>
          </div>
          <button className="btn btn--purple form-review__btn" type="submit">
            Отправить отзыв
          </button>
        </form>
      </div>
    </LayoutModal>
  );
}

export default ModalFormReview;
