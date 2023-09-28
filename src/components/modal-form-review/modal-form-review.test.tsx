import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import ModalFormReview from './modal-form-review';

describe('Component: Modal Form Review', () => {

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <ModalFormReview isActive setIsModalActive={() => true} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getAllByTestId('star-rating').length).toBe(5);
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваше имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();
  });
});
