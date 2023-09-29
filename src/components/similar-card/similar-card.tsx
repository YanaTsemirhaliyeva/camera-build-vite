import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';
import MemoRatingStars from '../rating-stars/rating-stars';
import { AppRoute } from '../../const';
import { CSSProperties } from 'react';
import { useAppDispatch } from '../../hooks';
import { setActiveCameraModal } from '../../store/cameras/cameras.slice';

type SimilarCardProps = {
  card: Camera;
  style: CSSProperties;
  setIsModalActive: (arg: boolean) => void;
}

function SimilarCard({card, style, setIsModalActive}: SimilarCardProps): JSX.Element {

  const {id, name, price, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = card;
  const dispatch = useAppDispatch();

  const sourceSrcSet = `../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`;
  const imgSrcSet = `../../${previewImg2x} 2x`;
  const imgPreview = `../../${previewImg}`;

  return (
    <div className="product-card is-active" style={style}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={sourceSrcSet} />
          <img src={imgPreview} srcSet={imgSrcSet} width="280" height="240" alt={`Фотоаппарат ${name}`} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <MemoRatingStars rating={rating} />
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button"
          onClick={() => {
            setIsModalActive(true);
            dispatch(setActiveCameraModal(id));
          }}
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>Подробнее</Link>
      </div>
    </div>
  );
}

export default SimilarCard;
