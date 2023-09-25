import { useState } from 'react';
import { Review } from '../../types/review';
import ReviewItem from '../review-item/review-item';

type ReviewsBlockProps = {
  reviews: Review[];
  setIsModalActive: (arg: boolean) => void;
}

function ReviewBlock({reviews, setIsModalActive}: ReviewsBlockProps): JSX.Element {
  const reviewsSortedByTime = reviews && [...reviews].sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt));
  const [activeSlice, setActiveSlice] = useState(3);


  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button"
            onClick={() => setIsModalActive(true)}
          >
            Оставить свой отзыв
          </button>
        </div>
        <ul className="review-block__list">
          {reviews.length > 0 && reviewsSortedByTime.slice(0, activeSlice).map((review) => <ReviewItem key={review.id} reviewItem={review} />)}
        </ul>
        {reviewsSortedByTime.length > activeSlice &&
        <div className="review-block__buttons">
          <button
            className="btn btn--purple"
            type="button"
            onClick={() => setActiveSlice(activeSlice + 3)}
            disabled={reviewsSortedByTime.length < activeSlice}
          >
            Показать больше отзывов
          </button>
        </div>}
      </div>
    </section>
  );
}

export default ReviewBlock;
