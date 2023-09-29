import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import MemoRatingStars from './rating-stars';

describe('Component: Rating Stars', () => {

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <MemoRatingStars rating={3} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getAllByTestId('rating-star').length).toBe(5);
  });
});
