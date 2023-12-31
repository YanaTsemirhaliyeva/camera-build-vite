import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import { makeFakeCameraItem, makeFakeReviewList, makeFakeSimilarProducts } from '../../utils-for-test/mocks';
import ProductScreen from './product-screen';
import { Status } from '../../const';


describe('Component: Page Product Screen', () => {
  const mockCameraItem = makeFakeCameraItem();
  const mockSimilarProducts = makeFakeSimilarProducts();
  const mockReviews = makeFakeReviewList();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(<ProductScreen />, {
      CAMERAS: {
        cameras: [],
        isCamerasDataLoading: false,
        cameraItem: {...mockCameraItem},
        isCameraItemDataLoading: false,
        hasError: false,
        activePage: 1,
        activeCameraModal: undefined,
        status: Status.Idle,
        sortType: null,
        sortOrder: null,
        isReset: false,
        minPrice: 0,
        maxPrice: 0,
        type: [],
        category: null,
        level: [],
      },
      PROMO: {
        promo: [],
        isPromoDataLoading: false,
        status: Status.Idle
      },
      SIMILAR: {
        similar: [...mockSimilarProducts],
        isSimilarDataLoading: false,
      },
      REVIEWS: {
        reviews: [...mockReviews],
        isReviewsDataLoading: false,
        status: Status.Idle,
      },
      BASKET: {
        items: [],
        discount: 0,
        promoCode: null,
        hasError: false,
        isPromoCodeValid: false,
        status: Status.Idle,
      },
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('camera-item')).toBeInTheDocument();
    expect(screen.getByTestId('similars')).toBeInTheDocument();
    expect(screen.getByTestId('reviews')).toBeInTheDocument();
  });
});
