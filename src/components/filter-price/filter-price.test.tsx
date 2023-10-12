import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import FilterPrice from './filter-price';
import { makeFakeStore } from '../../utils-for-test/mocks';

describe('Component: Filter Price', () => {
  const mockStore = makeFakeStore();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <FilterPrice resetFilters={false} />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
  });
});
