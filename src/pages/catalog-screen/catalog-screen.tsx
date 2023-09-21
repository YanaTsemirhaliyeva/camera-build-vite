import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Layout from '../../components/layout/layout';
import Pagination from '../../components/pagination/pagination';
import ProductCard from '../../components/product-card/product-card';
import SwiperPromo from '../../components/swiper/swiper';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/cameras/cameras.selectors';

function CatalogScreen(): JSX.Element {

  const cameraList = useAppSelector(getCameras);


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
                    {cameraList.map((item) => <ProductCard camera={item} key={item.id} />)}
                  </div>}
                  <Pagination />
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
