import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isPostReviewStatusSuccess } from '../../store/reviews/reviews.selectors';
import { resetPostStatus } from '../../store/reviews/reviews.slice';
import LayoutModal from '../layout-modal/layoyt-modal';

function ModalSuccessfulFeedback(): JSX.Element {
  const dispatch = useAppDispatch();
  const isReviewStatusSuccess = useAppSelector(isPostReviewStatusSuccess);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isReviewStatusSuccess) {
      dispatch(resetPostStatus);
      setIsActive(isReviewStatusSuccess);
    }
  }, [dispatch, isReviewStatusSuccess]);


  return (
    <LayoutModal isActive={isActive} setIsModalActive={setIsActive} modalFeedback>
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={() => {
            dispatch(resetPostStatus());
            setIsActive(false);
          }}
        >Вернуться к покупкам
        </button>
      </div>
    </LayoutModal>
  );
}

export default ModalSuccessfulFeedback;
