import { Review } from '../../types/review';
import MemoRatingStars from '../rating-stars/rating-stars';

type ReviewItemProps = {
  reviewItem: Review;
}

function ReviewItem({reviewItem}: ReviewItemProps): JSX.Element {

  const {userName, review, rating, advantage, disadvantage, createAt} = reviewItem;
  const dateAttr = createAt.split('T')[0];
  const dateReview = new Date(dateAttr).toLocaleString('ru', { day: 'numeric', month: 'long'});

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={dateAttr}>{dateReview}</time>
      </div>
      <div className="rate review-card__rate">
        <MemoRatingStars rating={rating} />
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewItem;
