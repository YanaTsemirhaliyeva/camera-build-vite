import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import { makeFakeReviewList } from '../../utils-for-test/mocks';
import ReviewBlock from './review-block';

describe('Component: Review Block', () => {
  const mockReviews = makeFakeReviewList();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <ReviewBlock reviews={[...mockReviews]} setIsModalActive={() => false} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByText('Оставить свой отзыв')).toBeInTheDocument();
  });
});
