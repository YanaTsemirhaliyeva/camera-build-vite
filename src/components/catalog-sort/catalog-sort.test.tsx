import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import CatalogSort from './catalog-sort';

describe('Component: Catalog Filter', () => {

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <CatalogSort />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('catalog-sort')).toBeInTheDocument();
  });
});
