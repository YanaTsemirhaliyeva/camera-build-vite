import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import CatalogSort from './catalog-sort';
import { Status } from '../../const';

describe('Component: Catalog Sort', () => {

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <CatalogSort />, {
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

    expect(screen.getByTestId('catalog-sort')).toBeInTheDocument();
  });
});
