import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import Pagination from './pagination';
import { Status } from '../../const';

describe('Component: Pagination', () => {
  const initialState = {
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
    }};

  it('should render correctly with 20 items', () => {

    const {withStoreComponent} = withStore(
      <Pagination totalCountCameras={20} />, {
        CAMERAS: {...initialState.CAMERAS}
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('should render correctly with 200 items & activePage = 4', () => {

    const {withStoreComponent} = withStore(
      <Pagination totalCountCameras={200} />, {
        CAMERAS: {
          ...initialState.CAMERAS,
          activePage: 4,
        }
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
  });
});
