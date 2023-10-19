import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';
import LayoutModal from '../layout-modal/layoyt-modal';
import { useAppDispatch } from '../../hooks';
import { deleteAllItems } from '../../store/basket/basket.slice';

type ModalRemoveItemProps = {
  camera: Camera;
  isActive: boolean;
  setActive: (arg: boolean) => void;
}

function ModalRemoveItem({camera, isActive, setActive}: ModalRemoveItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const {id, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name, vendorCode, type, level} = camera;
  const sourceSrcSet = `../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`;
  const imgSrcSet = `../../${previewImg2x} 2x`;
  const imgPreview = `../../${previewImg}`;

  const handleButtonItemDelete = () => {
    dispatch(deleteAllItems(id));
    setActive(false);
  };


  return (
    <LayoutModal isActive={isActive} setIsModalActive={setActive}>
      <p className="title title--h4">Удалить этот товар?</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={sourceSrcSet} />
            <img
              src={imgPreview} srcSet={imgSrcSet} width="140" height="120"
              alt={`Фотоаппарат ${name}`}
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{type} фотокамера</li>
            <li className="basket-item__list-item">{level} уровень</li>
          </ul>
        </div>
      </div>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--half-width" type="button"
          onClick={handleButtonItemDelete}
        >
          Удалить
        </button>
        <Link className="btn btn--transparent modal__btn modal__btn--half-width" to="#"
          onClick={() => setActive(false)}
        >
          Продолжить покупки
        </Link>
      </div>
    </LayoutModal>
  );
}

export default ModalRemoveItem;
