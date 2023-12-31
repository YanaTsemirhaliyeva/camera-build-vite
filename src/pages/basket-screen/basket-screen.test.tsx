import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import BasketScreen from './basket-screen';
import { Status } from '../../const';

describe('Component: Page Basket Screen', () => {

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(<BasketScreen />, {
      CAMERAS: {
        cameras: [],
        isCamerasDataLoading: false,
        cameraItem: null,
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

    expect(screen.getAllByText('Корзина').length).toBe(2);
  });
});
