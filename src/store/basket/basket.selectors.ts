import { NameSpace } from '../../const';
import { Basket, State } from '../../types/state';

export const getBasketItems = (state: State): Basket[] => state[NameSpace.Basket].items;
export const getDiscount = (state: State): number => state[NameSpace.Basket].discount;
