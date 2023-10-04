import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import MemoSearchForm from './search-form';

describe('Component: Search Form', () => {

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <MemoSearchForm />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });
});
