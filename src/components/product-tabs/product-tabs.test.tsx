import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import ProductTabs from './product-tabs';
import { CameraCategory, CameraLevel, CameraTypes, Status } from '../../const';

describe('Component: Rating Stars', () => {
  const info = {
    vendorCode: 'BVG78VB',
    type: CameraTypes.Collection,
    level: CameraLevel.Zero,
    category: CameraCategory.Videocamera,
    description: 'qwerty ytrewq'
  };

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <ProductTabs tabsInfo={info} />, {
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
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
  });
});
