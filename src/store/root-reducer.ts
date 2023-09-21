import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { cameras } from './cameras/cameras.slice';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: cameras.reducer,
});
