import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import LayoutModal from './layoyt-modal';

describe('Component: Layout Modal', () => {
  const children: JSX.Element = (
    <>
      <h1>Hello, world!</h1>
      <p>Learning to test with Vitest</p>
    </>
  );

  it('should render correctly with AppRoute.Index', () => {

    const {withStoreComponent} = withStore(
      <LayoutModal isActive={false} setIsModalActive={() => true}>{children}</LayoutModal>, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('modal-container')).toBeInTheDocument();
    expect(screen.getByText(/Hello, world!/i)).toBeInTheDocument();
    expect(screen.getByText(/Learning to test with Vitest/i)).toBeInTheDocument();
  });
});
