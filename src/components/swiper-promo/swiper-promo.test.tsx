import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen} from '@testing-library/react';
import SwiperPromo from './swiper-promo';
import { makeFakePromoList } from '../../utils-for-test/mocks';

describe('Component: Swiper Promo', () => {
  const mockPromoList = makeFakePromoList();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <SwiperPromo />, {
        PROMO: {
          promo: [...mockPromoList],
          isPromoDataLoading: false,
        },
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getAllByTestId('swiper').length).toBe(mockPromoList.length);
  });
});
