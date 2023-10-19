import { Link, useNavigate } from 'react-router-dom';
import LayoutModal from '../layout-modal/layoyt-modal';
import { AppRoute } from '../../const';

type ModalAddItemSuccessProps = {
  isActive: boolean;
  setIsModalActive: (arg: boolean) => void;
  page: string;
}

function ModalAddItemSuccess({isActive, setIsModalActive, page}: ModalAddItemSuccessProps): JSX.Element {
  const navigate = useNavigate();

  const handleBasketNavigate = () => {
    navigate(AppRoute.Basket);
    setIsModalActive(false);
  };

  const handleCatalogNavigate = () => {
    setIsModalActive(false);
  };

  const route = page === AppRoute.Product ? AppRoute.Index : '#';

  return (
    <LayoutModal isActive={isActive} setIsModalActive={setIsModalActive} classname='modal--narrow'>
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width="86" height="80" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <div className="modal__buttons">
        <Link className="btn btn--transparent modal__btn" to={route} onClick={handleCatalogNavigate}>Продолжить покупки</Link>
        <button className="btn btn--purple modal__btn modal__btn--fit-width"
          onClick={handleBasketNavigate}
        >
          Перейти в корзину
        </button>
      </div>
    </LayoutModal>
  );
}

export default ModalAddItemSuccess;
