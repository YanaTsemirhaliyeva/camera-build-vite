import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import BasketItemCard from './basket-item-card';
import { makeFakeCameraItem, makeFakeStore } from '../../utils-for-test/mocks';

describe('Component: Basket Item Card', () => {
  const mockStore = makeFakeStore();
  const mockCameraItem = makeFakeCameraItem();
  const {name, type} = mockCameraItem;

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <BasketItemCard item={{...mockCameraItem, count: 1}} setCamera={() => mockCameraItem} setActive={() => false} />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(`${type} фотокамера`)).toBeInTheDocument();
    expect(screen.getByAltText(`Фотоаппарат ${name}`)).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
