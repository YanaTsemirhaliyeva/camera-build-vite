import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import { makeFakeCameraItem, makeFakeSimilarProducts, makeFakeStore } from '../../utils-for-test/mocks';
import SimilarProducts from './similar-products';

describe('Component: Similar Products', () => {
  const mockSimilarProducts = makeFakeSimilarProducts();
  const mockCameraItem = makeFakeCameraItem();
  const mockStore = makeFakeStore();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <SimilarProducts similars={[...mockSimilarProducts]} setCurrentCamera={() => mockCameraItem} setIsModalActive={() => false} />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
  });
});
