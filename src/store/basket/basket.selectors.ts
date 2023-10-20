import { CouponType, NameSpace, Status } from '../../const';
import { Basket, State } from '../../types/state';

export const getBasketItems = (state: State): Basket[] => state[NameSpace.Basket].items;
export const getDiscount = (state: State): number => state[NameSpace.Basket].discount;

export const getPromoCodeName = (state: State): CouponType | null => state[NameSpace.Basket].promoCode;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Basket].hasError;
export const isPromoValid = (state: State): boolean => state[NameSpace.Basket].isPromoCodeValid;

export const getPostOrderStatus = (state: State): Status => state[NameSpace.Basket].status;
