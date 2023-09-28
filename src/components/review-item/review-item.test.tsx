import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import { makeFakeReviewList } from '../../utils-for-test/mocks';
import ReviewItem from './review-item';

describe('Component: Review Item', () => {
  const mockReview = makeFakeReviewList()[0];
  const {userName, review, advantage, disadvantage, createAt} = mockReview;
  const dateAttr = createAt.split('T')[0];
  const dateReview = new Date(dateAttr).toLocaleString('ru', { day: 'numeric', month: 'long'});

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <ReviewItem reviewItem={{...mockReview}} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(dateReview)).toBeInTheDocument();
    expect(screen.getByText(userName)).toBeInTheDocument();
    expect(screen.getByText(review)).toBeInTheDocument();
    expect(screen.getByText(advantage)).toBeInTheDocument();
    expect(screen.getByText(disadvantage)).toBeInTheDocument();
  });
});
