import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import CatalogFilter from './catalog-filter';

describe('Component: Catalog Filter', () => {

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <CatalogFilter />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('catalog-filter')).toBeInTheDocument();
  });
});
