import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CameraData } from '../../types/state';
import { NameSpace, Status } from '../../const';
import { fetchCameraItemAction, fetchCamerasAction } from '../api-actions';

const initialState: CameraData = {
  cameras: [],
  isCamerasDataLoading: false,
  cameraItem: null,
  isCameraItemDataLoading: false,
  hasError: false,
  activePage: 1,
  activeCameraModal: undefined,
  status: Status.Idle,
};

export const cameras = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<number>) => {
      state.activePage = action.payload;
    },
    setActiveCameraModal: (state, action: PayloadAction<number>) => {
      state.activeCameraModal = state.cameras.slice().find((camera) => camera.id === action.payload);
    },
    dropCameraItem: (state) => {
      state.cameraItem = null;
    },
    setCatalogStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasDataLoading = true;
        state.status = Status.Loading;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isCamerasDataLoading = false;
        state.status = Status.Success;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isCamerasDataLoading = false;
        state.status = Status.Error;
      })
      .addCase(fetchCameraItemAction.pending, (state) => {
        state.isCameraItemDataLoading = true;
      })
      .addCase(fetchCameraItemAction.fulfilled, (state, action) => {
        state.cameraItem = action.payload;
        state.isCameraItemDataLoading = false;
      })
      .addCase(fetchCameraItemAction.rejected, (state) => {
        state.isCameraItemDataLoading = false;
      });
  },
});

export const { setActivePage, setActiveCameraModal, dropCameraItem, setCatalogStatus } = cameras.actions;
