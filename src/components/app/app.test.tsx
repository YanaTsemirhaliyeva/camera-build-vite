import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import App from './app';
import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { makeFakeStore } from '../../utils-for-test/mocks';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "CatalogScreen" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Index);

    render(withStoreComponent);

    const expectedText = 'Каталог фото- и видеотехники';

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render "BasketScreen" when user navigate to "/basket"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Basket);

    render(withStoreComponent);

    expect(screen.getAllByText('Корзина').length).toBe(2);
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    const link: HTMLAnchorElement = screen.getByTestId('back-home');
    const expectedText = 'Извините, но страница, которую вы ищете, не существует';

    expect(link.href).toContain(AppRoute.Index);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
