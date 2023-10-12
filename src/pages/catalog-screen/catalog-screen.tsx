import MemoBreadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import MemoLayout from '../../components/layout/layout';
import Pagination from '../../components/pagination/pagination';
import ProductCard from '../../components/product-card/product-card';
import SwiperPromo from '../../components/swiper-promo/swiper-promo';
import { AppRoute, CameraCategory, CameraLevel, CameraTypes, ITEMS_PER_PAGE, SortOrder, SortType, Status } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getActivePageNumber, getCamerasDataStatus, getCurrentFilterCategory, getCurrentFilterLevel, getCurrentFilterType, getCurrentMaxPrice, getCurrentMinPrice, getCurrentSortOrder, getCurrentSortType, getFilteredCameraList, isStatusReset } from '../../store/cameras/cameras.selectors';
import { useEffect, useMemo, useState } from 'react';
import ModalBuyProduct from '../../components/modal-buy-product/modal-buy-product';
import { fetchCamerasAction, fetchPromoAction } from '../../store/api-actions';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '../../types/query-params';
import { changeResetStatus, changeSortOrder, changeSortType, setActiveCategory, setActiveLevel, setActivePage, setActiveType, setMaxPrice, setMinPrice } from '../../store/cameras/cameras.slice';


function CatalogScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const activePage = useAppSelector(getActivePageNumber);
  const camerasDataStatus = useAppSelector(getCamerasDataStatus);
  const isReset = useAppSelector(isStatusReset);

  let currentPage = Number(searchParams.get('page'));

  const currentSortType = useAppSelector(getCurrentSortType);
  const currentSortOrder = useAppSelector(getCurrentSortOrder);
  const currentType = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const activeFilterCategory = useAppSelector(getCurrentFilterCategory);
  const currentFilterCategory = searchParams.get('category');
  const activeFilterType = useAppSelector(getCurrentFilterType);
  const currentFilterType: string[] = [];
  const activeFilterLevel = useAppSelector(getCurrentFilterLevel);
  const currentFilterLevel: string[] = [];
  for (const [key, value] of searchParams.entries()) {
    if (key === 'type' && !currentFilterType.includes(value)) {
      currentFilterType.push(value);
    }
    if (key === 'level' && !currentFilterLevel.includes(value)) {
      currentFilterLevel.push(value);
    }
  }
  const activeMinPrice = useAppSelector(getCurrentMinPrice);
  const activeMaxPrice = useAppSelector(getCurrentMaxPrice);
  const currentMinPrice = searchParams.get('price_gt');
  const currentMaxPrice = searchParams.get('price_lt');

  const cameraList = useAppSelector(getFilteredCameraList);

  const pageCount = Math.ceil(cameraList.length / ITEMS_PER_PAGE);
  if (pageCount && pageCount < currentPage || isReset) {
    currentPage = 1;
  }

  useEffect(() => {
    if (currentPage && currentPage <= pageCount) {
      dispatch(setActivePage(currentPage));
    }
  }, [currentPage, dispatch, pageCount]);

  useEffect(() => {
    if (currentOrder && currentType) {
      dispatch(changeSortType(currentType as SortType));
      dispatch(changeSortOrder(currentOrder as SortOrder));
    }
    if (currentFilterCategory) {
      dispatch(setActiveCategory(currentFilterCategory as CameraCategory));
    }
    if (currentFilterType.length) {
      currentFilterType.forEach((type) => {
        dispatch(setActiveType(type as CameraTypes));
      });
    }
    if (currentFilterLevel.length) {
      currentFilterLevel.forEach((level) => {
        dispatch(setActiveLevel(level as CameraLevel));
      });
    }
    if (currentMinPrice) {
      dispatch(setMinPrice(+currentMinPrice));
    }

    if (currentMaxPrice) {
      dispatch(setMaxPrice(+currentMaxPrice));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const currentParams = useMemo(() => {
    const params: QueryParams = {};
    if (!currentPage) {
      params.page = activePage.toString();
    }
    if (currentPage) {
      params.page = currentPage.toString();
    }
    if (currentSortType && currentSortOrder) {
      params.sort = currentSortType;
      params.order = currentSortOrder;
    }
    if (activeFilterCategory) {
      params.category = activeFilterCategory;
    }
    if (activeFilterType.length) {
      params.type = activeFilterType;
    }
    if (activeFilterLevel.length) {
      params.level = activeFilterLevel;
    }
    if (activeMinPrice) {
      params['price_gt'] = activeMinPrice.toString();
    }
    if (activeMaxPrice) {
      params['price_lt'] = activeMaxPrice.toString();
    }
    return params;
  }, [activeFilterCategory, activeFilterLevel, activeFilterType, activeMaxPrice, activeMinPrice, activePage, currentPage, currentSortOrder, currentSortType]);

  useEffect(() => {
    setSearchParams(currentParams);
  }, [setSearchParams, currentParams]);

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

  useEffect(() => {
    if (isReset) {
      dispatch(changeResetStatus());
    }
  }, [dispatch, isReset]);

  const [isModalActive, setIsModalACtive] = useState(false);
  const [currentCamera, setCurrentCamera] = useState<number>();
  const activeCamera = cameraList.find((item) => item.id === currentCamera);

  const lastContentIndex = activePage * ITEMS_PER_PAGE;
  const firstContentIndex = lastContentIndex - ITEMS_PER_PAGE;

  return (
    <MemoLayout pageTitle="Каталог">
      <main>
        <SwiperPromo />
        <div className="page-content">
          <MemoBreadcrumbs page={AppRoute.Index} />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <CatalogFilter />
                </div>
                <div className="catalog__content">
                  <CatalogSort />

                  {cameraList.length > 0 ?
                    <div className="cards catalog__cards">
                      {cameraList.slice(firstContentIndex, lastContentIndex).map((item) =>
                        <ProductCard camera={item} key={item.id} setIsModalActive={setIsModalACtive} setCurrentCamera={setCurrentCamera} />)}
                    </div> : <div style={{paddingTop: '30px'}}>По вашему запросу ничего не найдено</div>}
                  {pageCount > 1 && <Pagination totalCountCameras={cameraList.length} />}
                </div>
              </div>
            </div>
          </section>
        </div>
        {activeCamera && <ModalBuyProduct isActive={isModalActive} setIsModalActive={setIsModalACtive} camera={activeCamera}/>}
      </main>
    </MemoLayout>
  );
}

export default CatalogScreen;
