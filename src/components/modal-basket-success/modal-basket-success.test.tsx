import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import ModalBasketSuccess from './modal-basket-success';

describe('Component: Modal Basket Success', () => {

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <ModalBasketSuccess isActive setIsModalActive={() => true} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Спасибо за покупку/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
  });
});
