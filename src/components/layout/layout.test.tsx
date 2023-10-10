import { render, screen } from '@testing-library/react';
import MemoLayout from './layout';
import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { makeFakeStore } from '../../utils-for-test/mocks';

describe('Component: Layout', () => {
  const children: JSX.Element = (
    <>
      <h1>Hello, world!</h1>
      <p>Learning to test with Vitest</p>
    </>
  );
  const fakeStore = makeFakeStore();

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<MemoLayout pageTitle=''>{children}</MemoLayout>, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    expect(screen.getByText('Learning to test with Vitest')).toBeInTheDocument();
  });
});
