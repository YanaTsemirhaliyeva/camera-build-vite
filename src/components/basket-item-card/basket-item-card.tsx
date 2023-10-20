import { ChangeEvent, KeyboardEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import { minusCountItem, plusCountItem, setCountItem } from '../../store/basket/basket.slice';
import { Basket } from '../../types/state';
import { Camera } from '../../types/camera';
import { KeyCode, MAX_QUANTITY_ITEMS, MIN_QUANTITY_ITEMS } from '../../const';

type BasketItemCardProps = {
  item: Basket;
  setCamera: (arg: Camera) => void;
  setActive: (arg: boolean) => void;
}

function BasketItemCard({item, setCamera, setActive}: BasketItemCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement | null>(null);
  const {id, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name, type, level, price, vendorCode, count} = item;

  const sourceSrcSet = `../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`;
  const imgSrcSet = `../../${previewImg2x} 2x`;
  const imgPreview = `../../${previewImg}`;

  const handleBasketItemDelete = () => {
    setCamera(item);
    setActive(true);
  };

  const handlePlusItem = () => {
    dispatch(plusCountItem(id));
  };

  const handleMinusItem = () => {
    dispatch(minusCountItem(id));
  };

  const handleInputValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    if (+value > MAX_QUANTITY_ITEMS) {
      dispatch(setCountItem({ id: id, count: MAX_QUANTITY_ITEMS }));
      return;
    }

    dispatch(setCountItem({ id: id, count: Math.round(+value) }));
  };

  const handleInputValueBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    if (+value < MIN_QUANTITY_ITEMS) {
      dispatch(setCountItem({ id: id, count: MIN_QUANTITY_ITEMS }));
    }
  };

  const handleEnterClick = (evt: KeyboardEvent<HTMLInputElement>) => {
    const {target} = evt;
    if (evt.key === KeyCode.Enter && target instanceof HTMLInputElement && ref.current) {
      ref.current.blur();
    }
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={sourceSrcSet} />
          <img src={imgPreview} srcSet={imgSrcSet} width="140" height="120" alt={`Фотоаппарат ${name}`} />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{type} фотокамера</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
      </p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара"
          onClick={handleMinusItem}
          disabled={count <= MIN_QUANTITY_ITEMS}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1" min="1" max="99" aria-label="количество товара"
          ref={ref}
          onChange={handleInputValueChange}
          onBlur={handleInputValueBlur}
          value={count || ''}
          onKeyDown={handleEnterClick}
        />
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара"
          onClick={handlePlusItem}
          disabled={count === MAX_QUANTITY_ITEMS}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{(price * count).toLocaleString()} ₽
      </div>
      <button className="cross-btn" type="button" aria-label="Удалить товар"
        onClick={handleBasketItemDelete}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default BasketItemCard;
