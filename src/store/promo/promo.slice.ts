import { createSlice } from '@reduxjs/toolkit';
import { PromoData } from '../../types/state';
import { NameSpace, Status } from '../../const';
import { fetchPromoAction } from '../api-actions';

const initialState: PromoData = {
  promo: [],
  isPromoDataLoading: false,
  status: Status.Idle,
};

export const promo = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoDataLoading = true;
        state.status = Status.Loading;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoDataLoading = false;
        state.status = Status.Success;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.isPromoDataLoading = false;
        state.status = Status.Error;
      });
  }
});
