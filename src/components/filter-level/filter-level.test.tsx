import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import FilterLevel from './filter-level';
import { makeFakeStore } from '../../utils-for-test/mocks';

describe('Component: Filter Level', () => {
  const mockStore = makeFakeStore();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <FilterLevel />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
  });
});
