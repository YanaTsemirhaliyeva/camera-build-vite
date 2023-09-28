import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import { makeFakeSimilarProducts } from '../../utils-for-test/mocks';
import SimilarProducts from './similar-products';

describe('Component: Similar Products', () => {
  const mockSimilarProducts = makeFakeSimilarProducts();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <SimilarProducts similars={[...mockSimilarProducts]} setIsModalActive={() => false} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
  });
});
