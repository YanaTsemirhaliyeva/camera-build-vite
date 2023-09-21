import { store } from '../store';
import { Camera } from './camera';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type Cameras = {
  cameras: Camera[];
  isCamerasDataLoading: boolean;
  cameraItem: Camera | null;
  isCameraItemDataLoading: boolean;
  hasError: boolean;
}
