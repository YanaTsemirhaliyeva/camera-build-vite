import { Status } from '../../const';
import { makeFakePromoList } from '../../utils-for-test/mocks';
import { fetchPromoAction } from '../api-actions';
import { promo } from './promo.slice';

describe('Promo Slice', () => {
  const emptyAction = {type: ''};
  const initialState = {
    promo: [],
    isPromoDataLoading: false,
    status: Status.Idle,
  };

  it('should return initial state with empty action', () => {
    const expectedState = {...initialState};

    const result = promo.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const expectedState = {...initialState };

    const result = promo.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isPromoDataLoading" to "true" with "fetchPromoAction.pending"', () => {
    const expectedState = {
      ...initialState,
      isPromoDataLoading: true,
      status: Status.Loading,
    };

    const result = promo.reducer(undefined, fetchPromoAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "promos" to array with promo, "isPromoDataLoading" to "false" with "fetchPromoAction.fulfilled"', () => {
    const mockPromos = makeFakePromoList();
    const expectedState = {
      ...initialState,
      promo: [...mockPromos],
      status: Status.Success,
    };

    const result = promo.reducer(
      undefined,
      fetchPromoAction.fulfilled(
        mockPromos, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isPromoDataLoading" to "false" with "fetchPromoAction.rejected', () => {
    const expectedState = {
      ...initialState,
      status: Status.Error
    };

    const result = promo.reducer(
      undefined,
      fetchPromoAction.rejected,
    );

    expect(result).toEqual(expectedState);
  });
});
