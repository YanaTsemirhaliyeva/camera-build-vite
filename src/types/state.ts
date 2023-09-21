import { store } from '../store';
import { Camera } from './camera';
import { Promo } from './promo';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CameraData = {
  cameras: Camera[];
  isCamerasDataLoading: boolean;
  cameraItem: Camera | null;
  isCameraItemDataLoading: boolean;
  hasError: boolean;
};

export type PromoData = {
  promo: Promo[];
  isPromoDataLoading: boolean;
};
