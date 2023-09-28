import { Status } from '../../const';
import { makeFakeReviewList } from '../../utils-for-test/mocks';
import { fetchReviewsAction, postReviewAction } from '../api-actions';
import { reviews } from './reviews.slice';

describe('Reviews Slice', () => {
  const emptyAction = {type: ''};
  const initialState = {
    reviews: [],
    isReviewsDataLoading: false,
    status: Status.Idle,
  };

  it('should return initial state with empty action', () => {
    const expectedState = {...initialState};

    const result = reviews.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const expectedState = {...initialState};

    const result = reviews.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewsDataLoading" to "true" & status to "loading" with "fetchReviewsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      isReviewsDataLoading: true,
      status: Status.Loading,
    };

    const result = reviews.reducer(undefined, fetchReviewsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to array with review, "isReviewsDataLoading" to "false" with "fetchReviewsAction.fulfilled"', () => {
    const mockReviews = makeFakeReviewList();
    const expectedState = {
      ...initialState,
      reviews: mockReviews,
      status: Status.Success,
    };

    const result = reviews.reducer(
      undefined,
      fetchReviewsAction.fulfilled(
        mockReviews, '', '')
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewsDataLoading" to "false" with "fetchReviewsAction.rejected', () => {
    const expectedState = {
      ...initialState,
      status: Status.Error,
    };

    const result = reviews.reducer(
      undefined,
      fetchReviewsAction.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should post new comment and add it to array with comments, "fetchReviewsAction" to "false" with "postReviewAction.fulfilled"', () => {
    const mockReviews = makeFakeReviewList();
    const postReview = makeFakeReviewList()[0];
    const allReviews = [postReview, ...mockReviews];

    const initialStatePost = {
      ...initialState,
      reviews: mockReviews,
    };

    const expectedState = {
      ...initialState,
      reviews: allReviews,
      status: Status.Success
    };

    const result = reviews.reducer(
      initialStatePost,
      { type: postReviewAction.fulfilled.type, payload: postReview }
    );

    expect(result).toEqual(expectedState);
  });
});

