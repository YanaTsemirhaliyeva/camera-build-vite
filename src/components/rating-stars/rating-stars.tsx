import { memo } from 'react';
import { RATING_VALUES } from '../../const';

type RatingStarsProps = {
  rating: number;
}

function RatingStars({rating}: RatingStarsProps): JSX.Element {
  return (
    <>
      {RATING_VALUES.map((item) => {
        const href = item <= rating ? '#icon-full-star' : '#icon-star';
        return(
          <svg width="17" height="16" aria-hidden="true" key={item} data-testid='rating-star'>
            <use xlinkHref={href}></use>
          </svg>);
      })}
    </>
  );
}

const MemoRatingStars = memo(RatingStars);
export default MemoRatingStars;
