import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Layout from '../../components/layout/layout';
import ReviewBlock from '../../components/review-block/review-block';
import SimilarProducts from '../../components/similar-products/similar-products';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameraItem, isCameraItemStatusLoading } from '../../store/cameras/cameras.selectors';
import { useEffect } from 'react';
import { fetchCameraItemAction } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import RatingStars from '../../components/rating-stars/rating-stars';


function ProductScreen(): JSX.Element {
  const {cameraId} = useParams();
  const dispatch = useAppDispatch();

  const currentProduct = useAppSelector(getCameraItem);
  const isDataProductLoading = useAppSelector(isCameraItemStatusLoading);

  useEffect(() => {
    if (cameraId) {
      dispatch(fetchCameraItemAction(cameraId));
    }
  }, [cameraId, dispatch]);

  if (isDataProductLoading) {
    return <Spinner />;
  }

  if (!currentProduct) {
    return <NotFoundScreen />;
  }

  const {name, price, vendorCode, type, level, category, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, description} = currentProduct;
  const sourceSrcSet = `../${previewImgWebp}, ../${previewImgWebp2x} 2x`;
  const imgSrcSet = `../${previewImg2x} 2x`;
  const imgPreview = `../${previewImg}`;

  return (
    <Layout pageTitle="Карточка товара">
      <main>
        <div className="page-content">
          <Breadcrumbs page={AppRoute.Product} cameraTitle={name} />
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={sourceSrcSet} />
                    <img src={imgPreview} srcSet={imgSrcSet} width="560" height="480" alt={name} />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{name}</h1>
                  <div className="rate product__rate">
                    <RatingStars rating={rating} />
                    <p className="visually-hidden">Рейтинг: {rating}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽</p>
                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button className="tabs__control" type="button">Характеристики</button>
                      <button className="tabs__control is-active" type="button">Описание</button>
                    </div>
                    <div className="tabs__content">
                      <div className="tabs__element">
                        <ul className="product__tabs-list">
                          <li className="item-list"><span className="item-list__title">Артикул:</span>
                            <p className="item-list__text">{vendorCode}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{category}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{type}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className="tabs__element is-active">
                        <div className="product__tabs-text">
                          <p>{description.split('.')[0]}.</p>
                          <p>{description.split('.').slice(1, -1).join('.')}.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <SimilarProducts />
          </div>
          <div className="page-content__section">
            <ReviewBlock />
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
    </Layout>
  );
}

export default ProductScreen;
