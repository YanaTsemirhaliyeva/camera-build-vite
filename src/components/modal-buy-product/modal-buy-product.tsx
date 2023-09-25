import classNames from 'classnames';
import { Camera } from '../../types/camera';
import { useCallback, useEffect, useRef } from 'react';

type ModalBuyProductProps = {
  isActive: boolean;
  setIsModalActive: (arg: boolean) => void;
  camera: Camera;
}

function ModalBuyProduct({isActive, setIsModalActive, camera}: ModalBuyProductProps): JSX.Element {
  const modalRef = useRef(null);

  const onEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      setIsModalActive(false);
    }
  }, [setIsModalActive]);

  useEffect(() => {
    if (isActive && modalRef.current) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onEscapeKeydown);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onEscapeKeydown);
    };
  }, [isActive, onEscapeKeydown]);

  const {name, type, level, vendorCode, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = camera;
  const sourceSrcSet = `../${previewImgWebp}, ../${previewImgWebp2x} 2x`;
  const imgSrcSet = `../${previewImg2x} 2x`;

  return (
    <div className={classNames({'is-active': isActive}, 'modal')}
      ref={modalRef}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
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
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап"
            onClick={() => setIsModalActive(false)}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalBuyProduct;
