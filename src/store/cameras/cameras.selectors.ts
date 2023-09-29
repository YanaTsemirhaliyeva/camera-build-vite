import { NameSpace, ProductInfoURL, Status } from '../../const';
import { Camera } from '../../types/camera';
import { State } from '../../types/state';

export const getCameras = (state: State): Camera[] => state[NameSpace.Cameras].cameras;
export const isCamerasDataStatusLoading = (state: State): boolean => state[NameSpace.Cameras].isCamerasDataLoading;

export const getCameraItem = (state: State): Camera | null => state[NameSpace.Cameras].cameraItem;
export const isCameraItemStatusLoading = (state: State): boolean => state[NameSpace.Cameras].isCameraItemDataLoading;

export const getActivePageNumber = (state: State): number => state[NameSpace.Cameras].activePage;
export const getActiveCameraModal = (state: State): Camera | undefined => state[NameSpace.Cameras].activeCameraModal;

export const getCamerasDataStatus = (state: State): Status => state[NameSpace.Cameras].status;

export const getCameraInfoActive = (state: State): ProductInfoURL => state[NameSpace.Cameras].cameraInfo;
