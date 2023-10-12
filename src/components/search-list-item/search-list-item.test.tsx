import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import { makeFakeCameraItem } from '../../utils-for-test/mocks';
import MemoSearchListItem from './search-list-item';

describe('Component: Search List Item', () => {
  const mockCamera = makeFakeCameraItem();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <MemoSearchListItem camera={mockCamera} isCurrent={false} onClick={() => vi.fn() } />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);


    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByTestId('search-item')).toBeInTheDocument();
  });
});
