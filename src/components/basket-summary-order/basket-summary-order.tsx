import { CouponType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCouponAction } from '../../store/api-actions';
import { getDiscount, getErrorStatus, getPromoCodeName, isPromoValid } from '../../store/basket/basket.selectors';
import classNames from 'classnames';
import { setPromoCode } from '../../store/basket/basket.slice';
import { ChangeEvent, FormEvent, useState } from 'react';

type BasketSummaryOrderProps = {
  totalPrice: number;
}

function BasketSummaryOrder({totalPrice}: BasketSummaryOrderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const discountPercent = useAppSelector(getDiscount);
  const discount = Math.round(totalPrice * discountPercent / 100);
  const priceWithDiscount = Math.round(totalPrice - discount);
  const promoCode = useAppSelector(getPromoCodeName);
  const isError = useAppSelector(getErrorStatus);
  const isValid = useAppSelector(isPromoValid);
  const [promoText, setPromoText] = useState<string>(promoCode);


  const handleFormChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const {value} = evt.target;
    setPromoText(value);
  };

  const handlePromoCodeEnter = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(promoText.length > 0) {
      dispatch(postCouponAction(promoText as CouponType));
      dispatch(setPromoCode(promoText as CouponType));
    }
  };

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form action="#" onSubmit={handlePromoCodeEnter}>
            <div className={classNames({'is-invalid': isError, 'is-valid': isValid}, 'custom-input')}>
              <label>
                <span className="custom-input__label">Промокод</span>
                <input type="text" name="promo" placeholder="Введите промокод"
                  onChange={handleFormChange}
                  defaultValue={promoText}
                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button className="btn" type="submit">
              Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">{totalPrice.toLocaleString()} ₽</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span className={classNames({'basket__summary-value--bonus': discount > 0}, 'basket__summary-value')}>{discount.toLocaleString()} ₽</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
          <span className="basket__summary-value basket__summary-value--total">{priceWithDiscount.toLocaleString()} ₽</span>
        </p>
        <button className="btn btn--purple" type="submit">
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default BasketSummaryOrder;
