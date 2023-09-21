import { createSlice } from '@reduxjs/toolkit';
import { PromoData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchPromoAction } from '../api-actions';

const initialState: PromoData = {
  promo: [],
  isPromoDataLoading: false,
};

export const promo = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoDataLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoDataLoading = false;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.isPromoDataLoading = false;
      });
  }
});
