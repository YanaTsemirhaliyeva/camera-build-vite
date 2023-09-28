import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import Footer from './footer';
import { AppRoute } from '../../const';

describe('Component: Footer', () => {

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <Footer />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const link: HTMLAnchorElement = screen.getByTestId('footer-link-main');

    expect(link.href).toContain(AppRoute.Index);
    expect(screen.getByText(/Навигация/i)).toBeInTheDocument();
    expect(screen.getByText(/Ресурсы/i)).toBeInTheDocument();
    expect(screen.getByText(/Поддержка/i)).toBeInTheDocument();
  });
});
