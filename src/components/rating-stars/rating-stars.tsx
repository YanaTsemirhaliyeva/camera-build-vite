import { RATING } from '../../const';

type RatingStarsProps = {
  rating: number;
}

function RatingStars({rating}: RatingStarsProps): JSX.Element {
  return (
    <>
      {RATING.map((item) => {
        const href = item <= rating ? '#icon-full-star' : '#icon-star';
        return(
          <svg width="17" height="16" aria-hidden="true" key={item}>
            <use xlinkHref={href}></use>
          </svg>);
      })}
    </>
  );
}

export default RatingStars;
