import { createSlice } from '@reduxjs/toolkit';
import { ReviewsData } from '../../types/state';
import { NameSpace, Status } from '../../const';
import { fetchReviewsAction, postReviewAction } from '../api-actions';

const initialState: ReviewsData = {
  reviews: [],
  isReviewsDataLoading: false,
  status: Status.Idle,
};

export const reviews = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    dropReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsDataLoading = true;
        state.status = Status.Loading;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsDataLoading = false;
        state.status = Status.Success;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsDataLoading = false;
        state.status = Status.Error;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
        state.status = Status.Success;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.status = Status.Error;
      });
  },
});

export const { dropReviews } = reviews.actions;
