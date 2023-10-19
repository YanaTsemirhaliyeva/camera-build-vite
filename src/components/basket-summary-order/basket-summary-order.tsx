import { useRef } from 'react';
import { CouponType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCouponAction } from '../../store/api-actions';
import { getDiscount } from '../../store/basket/basket.selectors';
import classNames from 'classnames';

type BasketSummaryOrderProps = {
  totalPrice: number;
}

function BasketSummaryOrder({totalPrice}: BasketSummaryOrderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement>(null);
  const discountPercent = useAppSelector(getDiscount);
  const discount = totalPrice * discountPercent / 100;
  const priceWithDiscount = totalPrice - discount;

  const handlePromoCodeEnter = (value: string) => {
    const isValid = CouponType['camera-333'] === value || CouponType['camera-444'] === value || CouponType['camera-555'] === value;
    if (isValid) {
      dispatch(postCouponAction(value as CouponType));
    }
  };

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form action="#">
            <div className="custom-input">
              <label>
                <span className="custom-input__label">Промокод</span>
                <input type="text" name="promo" placeholder="Введите промокод" ref={ref} />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button className="btn" type="submit"
              onClick={() => handlePromoCodeEnter(ref.current ? ref.current.value : '')}
            >
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
        <button className="btn btn--purple" type="submit">Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default BasketSummaryOrder;
