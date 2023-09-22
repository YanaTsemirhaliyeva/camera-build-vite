import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CameraData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchCameraItemAction, fetchCamerasAction } from '../api-actions';

const initialState: CameraData = {
  cameras: [],
  isCamerasDataLoading: false,
  cameraItem: null,
  isCameraItemDataLoading: false,
  hasError: false,
  activePage: 1,
};

export const cameras = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<number>) => {
      state.activePage = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasDataLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isCamerasDataLoading = false;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isCamerasDataLoading = false;
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

export const { setActivePage } = cameras.actions;
