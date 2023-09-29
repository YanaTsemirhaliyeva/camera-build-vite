import { render, screen } from '@testing-library/react';
import MemoLayout from './layout';
import { withHistory } from '../../utils-for-test/mock-component';

describe('Component: Layout', () => {
  const children: JSX.Element = (
    <>
      <h1>Hello, world!</h1>
      <p>Learning to test with Vitest</p>
    </>
  );

  it('should render correctly', () => {
    const preparedComponent = withHistory(<MemoLayout pageTitle=''>{children}</MemoLayout>);

    render(preparedComponent);

    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    expect(screen.getByText('Learning to test with Vitest')).toBeInTheDocument();
  });
});
