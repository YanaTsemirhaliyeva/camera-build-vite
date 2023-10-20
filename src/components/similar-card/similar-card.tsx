import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';
import MemoRatingStars from '../rating-stars/rating-stars';
import { AppRoute } from '../../const';
import { CSSProperties } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBasketItems } from '../../store/basket/basket.selectors';
import { setActiveCameraModal } from '../../store/cameras/cameras.slice';


type SimilarCardProps = {
  card: Camera;
  style: CSSProperties;
  setCurrentCamera: (arg: Camera) => void;
  setIsModalActive: (arg: boolean) => void;
}

function SimilarCard({card, style, setCurrentCamera, setIsModalActive}: SimilarCardProps): JSX.Element {
  const basketItemList = useAppSelector(getBasketItems);
  const dispatch = useAppDispatch();

  const {id, name, price, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = card;
  const itemInBasket = basketItemList.find((item) => item.id === id);

  const sourceSrcSet = `../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`;
  const imgSrcSet = `../../${previewImg2x} 2x`;
  const imgPreview = `../../${previewImg}`;

  const handleButtonBuyClick = () => {
    setCurrentCamera(card);
    setIsModalActive(true);
    dispatch(setActiveCameraModal(id));
  };

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
        {itemInBasket !== undefined ?
          <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoute.Basket}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>
            В корзине
          </Link> :
          <button className="btn btn--purple product-card__btn" type="button"
            onClick={handleButtonBuyClick}
          >
            Купить
          </button>}
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>Подробнее</Link>
      </div>
    </div>
  );
}

export default SimilarCard;
