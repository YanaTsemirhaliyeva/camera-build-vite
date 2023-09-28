import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import BasketScreen from './basket-screen';

describe('Component: Page Basket Screen', () => {

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(<BasketScreen />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getAllByText('Корзина').length).toBe(2);
  });
});
