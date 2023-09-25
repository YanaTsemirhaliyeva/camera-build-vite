import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';
import RatingStars from '../rating-stars/rating-stars';
import { AppRoute } from '../../const';
import { CSSProperties } from 'react';

type SimilarCardProps = {
  card: Camera;
  style: CSSProperties;
}

function SimilarCard({card, style}: SimilarCardProps): JSX.Element {

  const {id, name, price, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = card;
  const sourceSrcSet = `../${previewImgWebp}, ../${previewImgWebp2x} 2x`;
  const imgSrcSet = `../${previewImg2x} 2x`;
  const imgPreview = `../${previewImg}`;

  return (
    <div className="product-card is-active" style={style}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={sourceSrcSet} />
          <img src={imgPreview} srcSet={imgSrcSet} width="280" height="240" alt="Фотоаппарат FastShot MR-5" />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStars rating={rating} />
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>Подробнее</Link>
      </div>
    </div>
  );
}

export default SimilarCard;
