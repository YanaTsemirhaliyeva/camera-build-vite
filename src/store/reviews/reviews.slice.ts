import { createSlice } from '@reduxjs/toolkit';
import { ReviewsData } from '../../types/state';
import { NameSpace, Status } from '../../const';
import { fetchReviewsAction, postReviewAction } from '../api-actions';
import { toast } from 'react-toastify';

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
    resetPostStatus: (state) => {
      state.status = Status.Idle;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsDataLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsDataLoading = false;
        toast.warn('Ошибка загрузки отзывов');
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
        toast.warn('Ошибка отпраки отзыва. Пожалуйста, поробуйте позже');
      });
  },
});

export const { dropReviews, resetPostStatus } = reviews.actions;
