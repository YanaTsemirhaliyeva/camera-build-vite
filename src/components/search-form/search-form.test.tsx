import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import MemoSearchForm from './search-form';
import { Status } from '../../const';

describe('Component: Search Form', () => {

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <MemoSearchForm />, {
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
        },
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });
});
