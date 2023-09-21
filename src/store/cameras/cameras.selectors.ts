import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { State } from '../../types/state';

export const getCameras = (state: State): Camera[] => state[NameSpace.Cameras].cameras;
export const isCamerasDataStatusLoading = (state: State): boolean => state[NameSpace.Cameras].isCamerasDataLoading;

export const getCameraItem = (state: State): Camera | null => state[NameSpace.Cameras].cameraItem;
export const isCameraItemStatusLoading = (state: State): boolean => state[NameSpace.Cameras].isCameraItemDataLoading;
