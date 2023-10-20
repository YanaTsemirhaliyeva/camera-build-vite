import { Link, useParams } from 'react-router-dom';
import MemoBreadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import MemoLayout from '../../components/layout/layout';
import ReviewBlock from '../../components/review-block/review-block';
import SimilarProducts from '../../components/similar-products/similar-products';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameraItem, isCameraItemStatusLoading } from '../../store/cameras/cameras.selectors';
import { useEffect, useState } from 'react';
import { fetchCameraItemAction, fetchReviewsAction, fetchSimilarProductsAction } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import MemoRatingStars from '../../components/rating-stars/rating-stars';
import { getSimilarProducts, isSimilarProductsLoading } from '../../store/similar/similar.selectors';
import { getReviews } from '../../store/reviews/reviews.selectors';
import ModalBuyProduct from '../../components/modal-buy-product/modal-buy-product';
import ModalFormReview from '../../components/modal-form-review/modal-form-review';
import { dropCameraItem, setActiveCameraModal } from '../../store/cameras/cameras.slice';
import { dropReviews } from '../../store/reviews/reviews.slice';
import { dropSimilar } from '../../store/similar/similar.slice';
import ProductTabs from '../../components/product-tabs/product-tabs';
import ModalSuccessfulFeedback from '../../components/modal-successful-feedback/modal-successful-feedback';
import ModalAddItemSuccess from '../../components/modal-add-item-success/modal-add-item.success';
import { Camera } from '../../types/camera';

function ProductScreen(): JSX.Element {
  const {cameraId} = useParams();
  const dispatch = useAppDispatch();

  const currentProduct = useAppSelector(getCameraItem);
  const isDataProductLoading = useAppSelector(isCameraItemStatusLoading);

  const similarProducts = useAppSelector(getSimilarProducts);
  const isSimilarDataLoading = useAppSelector(isSimilarProductsLoading);

  const reviews = useAppSelector(getReviews);
  const [isModalActive, setIsModalActive] = useState(false);

  const [isFormModalActive, setIsFormModalActive] = useState(false);
  const [isItemAddModalActive, setItemAddModalActive] = useState(false);
  const [camera, setCamera] = useState<Camera>();

  useEffect(() => {
    if (cameraId) {
      dispatch(fetchCameraItemAction(cameraId));
      dispatch(fetchSimilarProductsAction(cameraId));
      dispatch(fetchReviewsAction(cameraId));
    }

    return () => {
      dispatch(dropCameraItem());
      dispatch(dropReviews());
      dispatch(dropSimilar());
    };

  }, [cameraId, dispatch]);

  if (isDataProductLoading || isSimilarDataLoading) {
    return <Spinner />;
  }

  if (!currentProduct) {
    return <NotFoundScreen />;
  }

  const {name, price, vendorCode, type, level, category, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, description} = currentProduct;
  const productInfo = {vendorCode, type, level, category, description};
  const sourceSrcSet = `../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`;
  const imgSrcSet = `../../${previewImg2x} 2x`;
  const imgPreview = `../../${previewImg}`;

  const handleButtonBuyClick = () => {
    setIsModalActive(true);
    setCamera(currentProduct);
    dispatch(setActiveCameraModal(currentProduct.id));
  };

  return (
    <MemoLayout pageTitle="Карточка товара">
      <main>
        <div className="page-content">
          <MemoBreadcrumbs page={AppRoute.Product} breadCrumb={name} />
          <div className="page-content__section" data-testid='camera-item'>
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
                    <MemoRatingStars rating={rating} />
                    <p className="visually-hidden">Рейтинг: {rating}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽</p>
                  <button className="btn btn--purple" type="button"
                    onClick={handleButtonBuyClick}
                  >
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <ProductTabs tabsInfo={productInfo} />
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section" data-testid='similars'>
            {similarProducts.length > 0 && <SimilarProducts similars={similarProducts} setCurrentCamera={setCamera} setIsModalActive={setIsModalActive} />}
          </div>
          <div className="page-content__section" data-testid='reviews'>
            <ReviewBlock reviews={reviews} setIsModalActive={setIsFormModalActive} />
          </div>
        </div>
        {camera && <ModalBuyProduct isActive={isModalActive} setIsModalActive={setIsModalActive} camera={camera} setAddSuccess={setItemAddModalActive}/>}
        <ModalAddItemSuccess isActive={isItemAddModalActive} setIsModalActive={setItemAddModalActive} page={AppRoute.Product}/>
        <ModalFormReview isActive={isFormModalActive} setIsModalActive={setIsFormModalActive} />
        <ModalSuccessfulFeedback />
      </main>
      <Link className="up-btn" to="#header" data-testid='scroll'
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }}
      >
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </Link>
    </MemoLayout>
  );
}

export default ProductScreen;
