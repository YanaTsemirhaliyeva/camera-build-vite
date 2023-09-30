import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import ModalSuccessfulFeedback from './modal-successful-feedback';
import { Status } from '../../const';

describe('Component: ModalSuccessfulFeedback', () => {

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(<ModalSuccessfulFeedback />, {
      REVIEWS: {
        reviews: [],
        isReviewsDataLoading: false,
        status: Status.Idle,
      }
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
  });
});
