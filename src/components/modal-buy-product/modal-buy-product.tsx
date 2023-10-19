import { useAppDispatch } from '../../hooks';
import { addItem } from '../../store/basket/basket.slice';
import { Camera } from '../../types/camera';
import LayoutModal from '../layout-modal/layoyt-modal';

type ModalBuyProductProps = {
  isActive: boolean;
  setIsModalActive: (arg: boolean) => void;
  camera: Camera;
  setAddSuccess: (arg: boolean) => void;
}

function ModalBuyProduct({isActive, setIsModalActive, camera, setAddSuccess}: ModalBuyProductProps): JSX.Element {

  const dispatch = useAppDispatch();

  const {name, type, level, vendorCode, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = camera;
  const sourceSrcSet = `../${previewImgWebp}, ../${previewImgWebp2x} 2x`;
  const imgSrcSet = `../${previewImg2x} 2x`;

  const handleItemBasketAdd = () => {
    dispatch(addItem(camera));
    setIsModalActive(false);
    setAddSuccess(true);
  };

  return (
    <LayoutModal isActive={isActive} setIsModalActive={setIsModalActive}>
      <p className="title title--h4">Добавить товар в корзину</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={sourceSrcSet} />
            <img src={`../${previewImg}`} srcSet={imgSrcSet} width="140" height="120" alt={name} />
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
          <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽</p>
        </div>
      </div>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
          onClick={handleItemBasketAdd}
        >
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>Добавить в корзину
        </button>
      </div>
    </LayoutModal>
  );
}

export default ModalBuyProduct;
