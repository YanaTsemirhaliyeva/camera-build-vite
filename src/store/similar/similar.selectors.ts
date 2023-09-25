import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { State } from '../../types/state';

export const getSimilarProducts = (state: State): Camera[] => state[NameSpace.Similar].similar;
export const isSimilarProductsLoading = (state: State): boolean => state[NameSpace.Similar].isSimilarDataLoading;
