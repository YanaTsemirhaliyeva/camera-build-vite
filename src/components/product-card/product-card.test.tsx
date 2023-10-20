import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import { makeFakeCameraItem, makeFakeStore } from '../../utils-for-test/mocks';
import ProductCard from './product-card';

describe('Component: Product Card', () => {
  const mockCameraItem = makeFakeCameraItem();
  const mockStore = makeFakeStore();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <ProductCard camera={{...mockCameraItem}} setIsModalActive={() => false} setCurrentCamera={() => 1} />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(mockCameraItem.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockCameraItem.name)).toBeInTheDocument();
    expect(screen.getByText(mockCameraItem.reviewCount)).toBeInTheDocument();
  });
});
