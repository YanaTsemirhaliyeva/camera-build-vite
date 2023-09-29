import { ProductInfoURL, Status } from '../const';
import { store } from '../store';
import { Camera } from './camera';
import { Promo } from './promo';
import { Review } from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CameraData = {
  cameras: Camera[];
  isCamerasDataLoading: boolean;
  cameraItem: Camera | null;
  isCameraItemDataLoading: boolean;
  hasError: boolean;
  activePage: number;
  activeCameraModal: Camera | undefined;
  status: Status;
  cameraInfo: ProductInfoURL;
};

export type PromoData = {
  promo: Promo[];
  isPromoDataLoading: boolean;
  status: Status;
};

export type SimilarData = {
  similar: Camera[];
  isSimilarDataLoading: boolean;
};

export type ReviewsData = {
  reviews: Review[];
  isReviewsDataLoading: boolean;
  status: Status;
};
