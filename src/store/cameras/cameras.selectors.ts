import { createSelector } from '@reduxjs/toolkit';
import { CameraCategory, CameraLevel, CameraTypes, NameSpace, SortOrder, SortType, Status } from '../../const';
import { Camera } from '../../types/camera';
import { State } from '../../types/state';
import { filterCameras, sortCameras } from '../../utils';

export const getCameras = (state: State): Camera[] => state[NameSpace.Cameras].cameras;
export const isCamerasDataStatusLoading = (state: State): boolean => state[NameSpace.Cameras].isCamerasDataLoading;

export const getCameraItem = (state: State): Camera | null => state[NameSpace.Cameras].cameraItem;
export const isCameraItemStatusLoading = (state: State): boolean => state[NameSpace.Cameras].isCameraItemDataLoading;

export const getActivePageNumber = (state: State): number => state[NameSpace.Cameras].activePage;
export const getActiveCameraModal = (state: State): Camera | undefined => state[NameSpace.Cameras].activeCameraModal;

export const getCamerasDataStatus = (state: State): Status => state[NameSpace.Cameras].status;

export const getCurrentSortType = (state: State): SortType | null => state[NameSpace.Cameras].sortType;
export const getCurrentSortOrder = (state: State): SortOrder | null => state[NameSpace.Cameras].sortOrder;

export const getCurrentFilterType = (state: State): CameraTypes[] => state[NameSpace.Cameras].type;
export const getCurrentFilterCategory = (state: State): CameraCategory | null => state[NameSpace.Cameras].category;
export const getCurrentFilterLevel = (state: State): CameraLevel[] => state[NameSpace.Cameras].level;

export const isStatusReset = (state: State): boolean => state[NameSpace.Cameras].isReset;
export const getCurrentMinPrice = (state: State): number => state[NameSpace.Cameras].minPrice;
export const getCurrentMaxPrice = (state: State): number => state[NameSpace.Cameras].maxPrice;

export const getSortedCameraList = createSelector(
  [getCameras, getCurrentSortType, getCurrentSortOrder],
  (cameras, sortType, sortOrder) => sortCameras(cameras, sortType, sortOrder)
);

export const getFilteredCameraList = createSelector(
  [getSortedCameraList, getCurrentFilterCategory, getCurrentFilterType, getCurrentFilterLevel, getCurrentMinPrice, getCurrentMaxPrice],
  (cameras, category, type, level, minPrice, maxPrice) => filterCameras(cameras, category, type, level, minPrice, maxPrice)
);
