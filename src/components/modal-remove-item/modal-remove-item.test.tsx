import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import ModalRemoveItem from './modal-remove-item';
import { makeFakeCameraItem } from '../../utils-for-test/mocks';

describe('Component: Modal Remove Item', () => {
  const mockCameraItem = makeFakeCameraItem();
  const {name, type} = mockCameraItem;

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <ModalRemoveItem isActive camera={mockCameraItem} setActive={() => false} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
    expect(screen.getByText(`${type} фотокамера`)).toBeInTheDocument();
    expect(screen.getByAltText(`Фотоаппарат ${name}`)).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getAllByText(/Удалить/i).length).toBe(2);
  });
});
