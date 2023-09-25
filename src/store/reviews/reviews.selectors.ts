import { NameSpace } from '../../const';
import { Review } from '../../types/review';
import { State } from '../../types/state';


export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;
export const isReviewsDataLoading = (state: State): boolean => state[NameSpace.Reviews].isReviewsDataLoading;
