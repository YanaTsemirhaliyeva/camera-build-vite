import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen } from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import { makeFakeCameraList, makeFakePromoList } from '../../utils-for-test/mocks';
import { AppRoute, Status } from '../../const';

describe('Page: Not Found Screen', () => {
  const mockCameraList = makeFakeCameraList();
  const mockPromoList = makeFakePromoList();

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<NotFoundScreen />, {
      CAMERAS: {
        cameras: [...mockCameraList],
        isCamerasDataLoading: false,
        cameraItem: null,
        isCameraItemDataLoading: false,
        hasError: false,
        activePage: 1,
        activeCameraModal: undefined,
        status: Status.Idle,
        sortType: null,
        sortOrder: null,
      },
      PROMO: {
        promo: [...mockPromoList],
        isPromoDataLoading: false,
        status: Status.Idle
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);
    const link: HTMLAnchorElement = screen.getByTestId('back-home');
    const expectedText = 'Извините, но страница, которую вы ищете, не существует';

    expect(link.href).toContain(AppRoute.Index);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
