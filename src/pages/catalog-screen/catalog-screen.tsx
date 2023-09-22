import { useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Layout from '../../components/layout/layout';
import Pagination from '../../components/pagination/pagination';
import ProductCard from '../../components/product-card/product-card';
import SwiperPromo from '../../components/swiper/swiper';
import { ITEMS_PER_PAGE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getActivePageNumber, getCameras } from '../../store/cameras/cameras.selectors';
import { useEffect, useMemo } from 'react';
import { setActivePage } from '../../store/cameras/cameras.slice';
import { QueryParams } from '../../types/query-params';

function CatalogScreen(): JSX.Element {

  const dispatch = useAppDispatch();
  const cameraList = useAppSelector(getCameras);
  const activePage = useAppSelector(getActivePageNumber);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page');

  const currentParams = useMemo(() => {
    const params: QueryParams = {};
    if (activePage) {
      params.page = activePage.toString();
    }
    return params;
  }, [activePage]);

  useEffect(() => {
    if(currentPage) {
      dispatch(setActivePage(Number(currentPage)));
    }
  }, [currentPage, dispatch]);

  useEffect(() => {
    setSearchParams(currentParams);
  }, [setSearchParams, currentParams]);


  const lastContentIndex = activePage * ITEMS_PER_PAGE;
  const firstContentIndex = lastContentIndex - ITEMS_PER_PAGE;

  return (
    <Layout pageTitle="Каталог">
      <main>
        <SwiperPromo />
        <div className="page-content">
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <CatalogFilter />
                </div>
                <div className="catalog__content">
                  <CatalogSort />

                  {cameraList.length > 0 &&
                  <div className="cards catalog__cards">
                    {cameraList.slice(firstContentIndex, lastContentIndex).map((item) => <ProductCard camera={item} key={item.id} />)}
                  </div>}
                  <Pagination totalCountCameras={cameraList.length} currentPage={activePage} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default CatalogScreen;
