import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import { makeFakeCameraItem, makeFakeSimilarProducts, makeFakeStore } from '../../utils-for-test/mocks';
import SimilarCard from './similar-card';

describe('Component: Similar Card', () => {
  const mockSimilarProduct = makeFakeSimilarProducts()[0];
  const mockCameraItem = makeFakeCameraItem();
  const mockStore = makeFakeStore();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <SimilarCard card={{...mockSimilarProduct}} style={{width: '100%', margin: 0}} setCurrentCamera={() => mockCameraItem} setIsModalActive={() => false} />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(mockSimilarProduct.name)).toBeInTheDocument();
    expect(screen.getByAltText(`Фотоаппарат ${mockSimilarProduct.name}`)).toBeInTheDocument();
  });
});
