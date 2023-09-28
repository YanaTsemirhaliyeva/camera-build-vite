import { createSlice } from '@reduxjs/toolkit';
import { SimilarData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchSimilarProductsAction } from '../api-actions';

const initialState: SimilarData = {
  similar: [],
  isSimilarDataLoading: false
};

export const similar = createSlice({
  name: NameSpace.Similar,
  initialState,
  reducers: {
    dropSimilar: (state) => {
      state.similar = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSimilarProductsAction.pending, (state) => {
        state.isSimilarDataLoading = true;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similar = action.payload;
        state.isSimilarDataLoading = false;
      })
      .addCase(fetchSimilarProductsAction.rejected, (state) => {
        state.isSimilarDataLoading = false;
      });
  },
});

export const { dropSimilar } = similar.actions;
