import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import FilterCategory from './filter-category';
import { makeFakeStore } from '../../utils-for-test/mocks';

describe('Component: Filter Category', () => {
  const mockStore = makeFakeStore();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <FilterCategory />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
  });
});
