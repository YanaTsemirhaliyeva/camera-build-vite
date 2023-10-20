import { useNavigate } from 'react-router-dom';
import LayoutModal from '../layout-modal/layoyt-modal';
import { AppRoute } from '../../const';

type ModalBasketSuccessProps = {
  isActive: boolean;
  setIsModalActive: (arg: boolean) => void;
}

function ModalBasketSuccess({isActive, setIsModalActive}: ModalBasketSuccessProps): JSX.Element {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(AppRoute.Index);
    setIsModalActive(false);
  };

  return (
    <LayoutModal isActive={isActive} setIsModalActive={setIsModalActive} classname='modal--narrow'>
      <p className="title title--h4">Спасибо за покупку</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
          onClick={handleButtonClick}
        >
          Вернуться к покупкам
        </button>
      </div>
    </LayoutModal>
  );
}

export default ModalBasketSuccess;
