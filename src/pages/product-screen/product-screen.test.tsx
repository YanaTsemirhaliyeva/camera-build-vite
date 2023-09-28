import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import { makeFakeCameraItem, makeFakeReviewList, makeFakeSimilarProducts } from '../../utils-for-test/mocks';
import ProductScreen from './product-screen';
import { Status } from '../../const';
import userEvent from '@testing-library/user-event';


describe('Component: Page Product Screen', () => {
  const mockCameraItem = makeFakeCameraItem();
  const mockSimilarProducts = makeFakeSimilarProducts();
  const mockReviews = makeFakeReviewList();

  it('should render correctly', async () => {
    vi.spyOn(window, 'scrollTo');

    const {withStoreComponent} = withStore(<ProductScreen />, {
      CAMERAS: {
        cameras: [],
        isCamerasDataLoading: false,
        cameraItem: {...mockCameraItem},
        isCameraItemDataLoading: false,
        hasError: false,
        activePage: 1,
        activeCameraModal: undefined,
      },
      PROMO: {
        promo: [],
        isPromoDataLoading: false,
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
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    await userEvent.click(screen.getByTestId('scroll'));

    expect(screen.getByTestId('camera-item')).toBeInTheDocument();
    expect(screen.getByTestId('similars')).toBeInTheDocument();
    expect(screen.getByTestId('reviews')).toBeInTheDocument();
    expect(window.scrollY).toBe(0);
  });
});
