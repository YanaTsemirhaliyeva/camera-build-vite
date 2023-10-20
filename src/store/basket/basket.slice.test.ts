import { describe } from 'vitest/dist/index.js';
import { CouponType, Status } from '../../const';
import { postCouponAction, postOrderAction } from '../api-actions';
import { basket } from './basket.slice';


describe('Basket Slice', () => {
  const emptyAction = {type: ''};
  const initialState = {
    items: [],
    discount: 0,
    promoCode: null,
    hasError: false,
    isPromoCodeValid: false,
    status: Status.Idle,
  };

  describe('postCouponAction', () => {
    it('should return initial state with empty action', () => {
      const expectedState = {...initialState};

      const result = basket.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action', () => {
      const expectedState = {...initialState };

      const result = basket.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should set hasError to "false" and isPromoCodeValid to "false" with "postCouponAction.pending"', () => {
      const originalState = {
        ...initialState,
        isPromoCodeValid: true,
        hasError: true,
      };

      const expectedState = {
        ...initialState,
        isPromoCodeValid: false,
        hasError: false,
      };

      const result = basket.reducer(originalState, postCouponAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set number of "discount", "isPromoCodeValid" to "true" with "postCouponAction.fulfilled"', () => {
      const expectedState = {
        ...initialState,
        discount: 15,
        isPromoCodeValid: true,
      };

      const result = basket.reducer(
        undefined,
        postCouponAction.fulfilled(
          15, '', CouponType['camera-333'])
      );

      expect(result).toEqual(expectedState);
    });

    it('should set "hasError" to "true" & "discount" to "0" with "postCouponAction.rejected', () => {
      const expectedState = {
        ...initialState,
        hasError: true,
        discount: 0
      };

      const result = basket.reducer(
        undefined,
        postCouponAction.rejected,
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('postOrderAction', () => {
    it('should set status to "loading" with "postOrderAction.pending"', () => {
      const expectedState = {
        ...initialState,
        status: Status.Loading,
      };

      const result = basket.reducer(undefined, postOrderAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set  status to "success" with "postOrderAction.fulfilled"', () => {
      const expectedState = {
        ...initialState,
        status: Status.Success,
      };

      const result = basket.reducer(
        undefined,
        postOrderAction.fulfilled(
          12, '', {camerasIds: [1, 2], coupon: CouponType['camera-333']})
      );

      expect(result).toEqual(expectedState);
    });

    it('should set "status" to "error" with "postOrderAction.rejected', () => {
      const expectedState = {
        ...initialState,
        status: Status.Error,
      };

      const result = basket.reducer(
        undefined,
        postOrderAction.rejected,
      );

      expect(result).toEqual(expectedState);
    });
  });
});
