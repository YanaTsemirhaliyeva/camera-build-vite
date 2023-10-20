import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import ModalAddItemSuccess from './modal-add-item.success';

describe('Component: Modal Add Item Success', () => {

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <ModalAddItemSuccess isActive setIsModalActive={() => true} page='catalog' />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    const expectedText = 'Товар успешно добавлен в корзину';

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });
});
