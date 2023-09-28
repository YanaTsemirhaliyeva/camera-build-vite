import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';
import { AppRoute } from '../../const';
import RatingStars from '../rating-stars/rating-stars';

type ProductCardProps = {
  camera: Camera;
  setIsModalActive: (arg: boolean) => void;
  setCurrentCamera: (arg: number) => void;
}

function ProductCard({camera, setIsModalActive, setCurrentCamera}: ProductCardProps): JSX.Element {

  const {id, name, price, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = camera;
  const sourceSrcSet = `${previewImgWebp}, ${previewImgWebp2x} 2x`;
  const imgSrcSet = `${previewImg2x} 2x`;

  const handleButtonBuyClick = () => {
    setCurrentCamera(id);
    setIsModalActive(true);
  };

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={sourceSrcSet} />
          <img src={previewImg} srcSet={imgSrcSet} width="280" height="240" alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStars rating={rating} />
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button"
          onClick={handleButtonBuyClick}
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
