import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import ModalBuyProduct from './modal-buy-product';
import { makeFakeCameraItem } from '../../utils-for-test/mocks';

describe('Component: Modal Buy Product', () => {
  const mockCamera = makeFakeCameraItem();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <ModalBuyProduct isActive setIsModalActive={() => true} camera={{ ...mockCamera }} setAddSuccess={() => false} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByAltText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(`${mockCamera.level} уровень`)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });
});
