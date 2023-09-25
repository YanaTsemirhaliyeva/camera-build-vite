import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { cameras } from './cameras/cameras.slice';
import { promo } from './promo/promo.slice';
import { similar } from './similar/similar.slice';
import { reviews } from './reviews/reviews.slice';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: cameras.reducer,
  [NameSpace.Promo]: promo.reducer,
  [NameSpace.Similar]: similar.reducer,
  [NameSpace.Reviews]: reviews.reducer,
});
