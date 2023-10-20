import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import BasketSummaryOrder from './basket-summary-order';
import { makeFakeStore } from '../../utils-for-test/mocks';

describe('Component: Basket Summary Order', () => {
  const mockStore = makeFakeStore();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <BasketSummaryOrder totalPrice={0} orderIds={[]} setIsModalActive={() => false} />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    const expectedText = 'Если у вас есть промокод на скидку, примените его в этом поле';

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
  });
});
