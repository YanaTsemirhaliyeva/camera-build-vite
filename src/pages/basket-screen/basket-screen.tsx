import BasketItemCard from '../../components/basket-item-card/basket-item-card';
import MemoBreadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import MemoLayout from '../../components/layout/layout';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getBasketItems } from '../../store/basket/basket.selectors';
import { calcTotalPrice } from '../../utils';
import ModalRemoveItem from '../../components/modal-remove-item/modal-remove-item';
import { useState } from 'react';
import { Camera } from '../../types/camera';
import BasketSummaryOrder from '../../components/basket-summary-order/basket-summary-order';
import BasketEmpty from '../../components/basket-empty/basket-empty';

function BasketScreen(): JSX.Element {
  const basketItemList = useAppSelector(getBasketItems);
  const totalPrice = calcTotalPrice(basketItemList);
  const orderIds: number[] = [];

  [...basketItemList].forEach((item) => {
    let i = 0;
    do {
      orderIds.push(item.id);
      i++;
    } while (i < item.count);
  });

  const [camera, setCamera] = useState<Camera>();
  const [isModalActive, setModalActive] = useState(false);


  return (
    <MemoLayout pageTitle="Корзина">
      <main>
        <div className="page-content">
          <MemoBreadcrumbs page={AppRoute.Basket} breadCrumb='Корзина' />

          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              {basketItemList.length > 0 ?
                <>
                  <ul className="basket__list">
                    {basketItemList.map((item) => <BasketItemCard key={item.id} item={item} setCamera={setCamera} setActive={setModalActive}/>)}
                  </ul>
                  <BasketSummaryOrder totalPrice={totalPrice} orderIds={orderIds} />
                </> :
                <BasketEmpty />}
            </div>
          </section>
        </div>
        {camera && <ModalRemoveItem camera={camera} isActive={isModalActive} setActive={setModalActive} />}
      </main>
    </MemoLayout>
  );
}

export default BasketScreen;
