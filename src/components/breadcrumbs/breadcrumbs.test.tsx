import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import MemoBreadcrumbs from './breadcrumbs';
import { AppRoute } from '../../const';

describe('Component: Breadcrumbs', () => {
  const expectedText = 'Главная';
  const expectedText2 = 'Каталог';

  it('should render correctly with AppRoute.Index', () => {

    const {withStoreComponent} = withStore(
      <MemoBreadcrumbs page={AppRoute.Index} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    const link: HTMLAnchorElement = screen.getByTestId('main-page');

    expect(link.href).toContain(AppRoute.Index);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
  });

  it('should render correctly with AppRoute.Basket', () => {

    const {withStoreComponent} = withStore(
      <MemoBreadcrumbs page={AppRoute.Basket} breadCrumb='Basket' />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    const link: HTMLAnchorElement = screen.getByTestId('main-page');

    expect(link.href).toContain(AppRoute.Index);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByText(/Basket/i)).toBeInTheDocument();
  });
});
