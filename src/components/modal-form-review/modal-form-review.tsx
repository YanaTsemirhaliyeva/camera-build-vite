import { ChangeEvent, useState } from 'react';
import { Status } from '../../const';
import LayoutModal from '../layout-modal/layoyt-modal';
import { ReviewPost } from '../../types/review';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import { postReviewAction } from '../../store/api-actions';
import classNames from 'classnames';
import { getPostReviewStatus } from '../../store/reviews/reviews.selectors';

type ModalFormReviewProps = {
  isActive: boolean;
  setIsModalActive: (arg: boolean) => void;
}

function ModalFormReview({isActive, setIsModalActive}: ModalFormReviewProps): JSX.Element {
  const dispatch = useAppDispatch();
  const id = useParams().cameraId;
  const isReviewDataPosting = useAppSelector(getPostReviewStatus) === Status.Loading;

  const [reviewText, setReviewText] = useState({review: ''});
  const [ratingValue, setRatingValue] = useState(0);

  const handleReviewChange =
    (evt: ChangeEvent<HTMLTextAreaElement>): void => {
      const {name, value} = evt.target;
      setReviewText({ ...reviewText, [name]: value});
    };

  const {register, handleSubmit, formState: {errors}, reset} = useForm<ReviewPost>({
    defaultValues: {},
    mode: 'onSubmit'
  });

  const handleFormSubmit = (data: ReviewPost) => {
    (async () => {
      const cameraId = Number(id);
      const rating = Number(data.rating);
      const action = await dispatch(postReviewAction({...data, cameraId, rating}));
      if (postReviewAction.fulfilled.match(action)) {
        setIsModalActive(false);
        setReviewText({ ...reviewText, review: ''});
        reset();
      }
    })();
  };

  return (
    <LayoutModal isActive={isActive} setIsModalActive={setIsModalActive}>
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form method="post" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="form-review__rate">
            <fieldset className={classNames({'is-invalid': errors.rating}, 'rate form-review__item')}>
              <legend className="rate__caption">Рейтинг
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </legend>
              <div className="rate__bar">
                <div className="rate__group">
                  <input data-testid='star-rating' onClick={() => setRatingValue(5)} className="visually-hidden" id="star-5" type="radio" value="5" {...register('rating', {required: true})}/>
                  <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                  <input data-testid='star-rating' onClick={() => setRatingValue(4)} className="visually-hidden" id="star-4" type="radio" value="4"{...register('rating', {required: true})}/>
                  <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                  <input data-testid='star-rating' onClick={() => setRatingValue(3)} className="visually-hidden" id="star-3" type="radio" value="3"{...register('rating', {required: true})}/>
                  <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                  <input data-testid='star-rating' onClick={() => setRatingValue(2)} className="visually-hidden" id="star-2" type="radio" value="2"{...register('rating', {required: true})}/>
                  <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                  <input data-testid='star-rating' onClick={() => setRatingValue(1)} className="visually-hidden" id="star-1" type="radio" value="1"{...register('rating', {required: true})}/>
                  <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                </div>
                <div className="rate__progress">
                  <span className="rate__stars">{ratingValue}</span> <span>/</span> <span className="rate__all-stars">5</span>
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
                <textarea placeholder="Поделитесь своим опытом покупки"
                  {...register('review', {
                    required: true,

                    minLength: {
                      value: 2,
                      message: 'Минимум 2 символа'
                    },
                    maxLength: {
                      value: 160,
                      message: 'Максимум 160 символов'
                    }
                  })}
                  onChange={handleReviewChange}
                >
                </textarea>
              </label>
              {reviewText.review.length === 0 && <div className="custom-textarea__error">Нужно добавить комментарий</div>}
              {errors.review && <div className="custom-textarea__error">{errors.review.message}</div>}

            </div>
          </div>
          <button className="btn btn--purple form-review__btn" type="submit" disabled={isReviewDataPosting}>
            Отправить отзыв
          </button>
        </form>
      </div>
    </LayoutModal>
  );
}

export default ModalFormReview;
