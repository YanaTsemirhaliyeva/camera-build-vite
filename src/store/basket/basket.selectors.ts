import { CouponType, NameSpace } from '../../const';
import { Basket, State } from '../../types/state';

export const getBasketItems = (state: State): Basket[] => state[NameSpace.Basket].items;
export const getDiscount = (state: State): number => state[NameSpace.Basket].discount;

export const getPromoCodeName = (state: State): CouponType | '' => state[NameSpace.Basket].promoCode;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Basket].hasError;
export const isPromoValid = (state: State): boolean => state[NameSpace.Basket].isPromoCodeValid;
