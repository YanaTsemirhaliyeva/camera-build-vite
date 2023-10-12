import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import FilterType from './filter-type';
import { makeFakeStore } from '../../utils-for-test/mocks';

describe('Component: Filter Type', () => {
  const mockStore = makeFakeStore();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <FilterType />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
  });
});
