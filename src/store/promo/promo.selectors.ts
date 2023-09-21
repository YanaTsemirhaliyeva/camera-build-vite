import { NameSpace } from '../../const';
import { Promo } from '../../types/promo';
import { State } from '../../types/state';

export const getPromo = (state: State): Promo[] => state[NameSpace.Promo].promo;
export const isPromoDataLoading = (state: State): boolean => state[NameSpace.Promo].isPromoDataLoading;
