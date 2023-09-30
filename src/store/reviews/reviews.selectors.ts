import { NameSpace, Status } from '../../const';
import { Review } from '../../types/review';
import { State } from '../../types/state';


export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;
export const isReviewsDataLoading = (state: State): boolean => state[NameSpace.Reviews].isReviewsDataLoading;

export const getPostReviewStatus = (state: State): Status => state[NameSpace.Reviews].status;
export const isPostReviewStatusSuccess = (state: State): boolean => state[NameSpace.Reviews].status === Status.Success;
