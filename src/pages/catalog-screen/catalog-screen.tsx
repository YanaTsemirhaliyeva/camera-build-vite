import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Layout from '../../components/layout/layout';
import Pagination from '../../components/pagination/pagination';
import ProductCard from '../../components/product-card/product-card';
import SwiperPromo from '../../components/swiper-promo/swiper-promo';
import { AppRoute, ITEMS_PER_PAGE, Status } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getActivePageNumber, getCameras, getCamerasDataStatus } from '../../store/cameras/cameras.selectors';
import { useEffect, useState } from 'react';
import ModalBuyProduct from '../../components/modal-buy-product/modal-buy-product';
import { fetchCamerasAction, fetchPromoAction } from '../../store/api-actions';


function CatalogScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const cameraList = useAppSelector(getCameras);
  const activePage = useAppSelector(getActivePageNumber);
  const camerasDataStatus = useAppSelector(getCamerasDataStatus);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if(camerasDataStatus === Status.Idle) {
        dispatch(fetchCamerasAction());
        dispatch(fetchPromoAction());
      }
    }

    return () => {
      isMounted = false;
    };
  }, [camerasDataStatus, dispatch]);

  const [isModalActive, setIsModalACtive] = useState(false);
  const [currentCamera, setCurrentCamera] = useState<number>();
  const activeCamera = cameraList.find((item) => item.id === currentCamera);

  const lastContentIndex = activePage * ITEMS_PER_PAGE;
  const firstContentIndex = lastContentIndex - ITEMS_PER_PAGE;

  return (
    <Layout pageTitle="Каталог">
      <main>
        <SwiperPromo />
        <div className="page-content">
          <Breadcrumbs page={AppRoute.Index} />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              {cameraList.length > 0 ?
                <div className="page-content__columns">
                  <div className="catalog__aside">
                    <CatalogFilter />
                  </div>
                  <div className="catalog__content">
                    <CatalogSort />

                    {cameraList.length > 0 &&
                    <div className="cards catalog__cards">
                      {cameraList.slice(firstContentIndex, lastContentIndex).map((item) =>
                        <ProductCard camera={item} key={item.id} setIsModalActive={setIsModalACtive} setCurrentCamera={setCurrentCamera} />)}
                    </div>}
                    <Pagination totalCountCameras={cameraList.length} />
                  </div>
                </div> : <div>Сегодня нет доступного товара. Приходите к нам позже</div>}
            </div>
          </section>
        </div>
        {activeCamera && <ModalBuyProduct isActive={isModalActive} setIsModalActive={setIsModalACtive} camera={activeCamera}/>}
      </main>
    </Layout>
  );
}

export default CatalogScreen;
