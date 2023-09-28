import { makeFakeSimilarProducts } from '../../utils-for-test/mocks';
import { fetchSimilarProductsAction } from '../api-actions';
import { similar } from './similar.slice';

describe('Similar Slice', () => {
  const emptyAction = {type: ''};
  const initialState = {
    similar: [],
    isSimilarDataLoading: false
  };

  it('should return initial state with empty action', () => {
    const expectedState = {...initialState};

    const result = similar.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const expectedState = {...initialState };

    const result = similar.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isSimilarDataLoading" to "true" with "fetchSimilarProductsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      isSimilarDataLoading: true,
    };

    const result = similar.reducer(undefined, fetchSimilarProductsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "promos" to array with promo, "isSimilarDataLoading" to "false" with "fetchSimilarProductsAction.fulfilled"', () => {
    const mockSimilar = makeFakeSimilarProducts();
    const expectedState = {
      ...initialState,
      similar: [...mockSimilar]
    };

    const result = similar.reducer(
      undefined,
      fetchSimilarProductsAction.fulfilled(
        mockSimilar, '', '')
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isSimilarDataLoading" to "false" with "fetchSimilarProductsAction.rejected', () => {
    const expectedState = {...initialState};

    const result = similar.reducer(
      undefined,
      fetchSimilarProductsAction.rejected
    );

    expect(result).toEqual(expectedState);
  });
});
