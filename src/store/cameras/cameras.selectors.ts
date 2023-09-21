import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { State } from '../../types/state';

export const getCameras = (state: State): Camera[] => state[NameSpace.Cameras].cameras;
export const isCamerasDataStatusLoading = (state: State): boolean => state[NameSpace.Cameras].isCamerasDataLoading;
