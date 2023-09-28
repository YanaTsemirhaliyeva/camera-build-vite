import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import { makeFakePromoList } from '../../utils-for-test/mocks';
import Banner from './banner';

describe('Component: Banner', () => {
  const mockPromoItem = makeFakePromoList()[0];

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <Banner promoItem={{...mockPromoItem}} />, {});
    const expectedText = 'Профессиональная камера от известного производителя';

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByAltText('баннер')).toBeInTheDocument();
    expect(screen.getByText(mockPromoItem.name)).toBeInTheDocument();
  });
});
