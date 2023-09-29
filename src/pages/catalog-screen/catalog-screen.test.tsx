import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen } from '@testing-library/react';
import CatalogScreen from './catalog-screen';
import { makeFakeCameraList, makeFakePromoList } from '../../utils-for-test/mocks';
import { ProductInfoURL, Status } from '../../const';

describe('Page: Catalog Screen', () => {
  const mockCameraList = makeFakeCameraList();
  const mockPromoList = makeFakePromoList();

  it('should render correctly with fetch.fullfiled cameras', () => {
    const {withStoreComponent} = withStore(<CatalogScreen />, {
      CAMERAS: {
        cameras: [...mockCameraList],
        isCamerasDataLoading: false,
        cameraItem: null,
        isCameraItemDataLoading: false,
        hasError: false,
        activePage: 1,
        activeCameraModal: undefined,
        status: Status.Idle,
        cameraInfo: ProductInfoURL.Description
      },
      PROMO: {
        promo: [...mockPromoList],
        isPromoDataLoading: false,
        status: Status.Idle,
      },
    });

    const expectedText = 'Каталог фото- и видеотехники';
    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
