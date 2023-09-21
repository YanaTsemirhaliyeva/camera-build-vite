import { createSlice } from '@reduxjs/toolkit';
import { Cameras } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchCamerasAction } from '../api-actions';

const initialState: Cameras = {
  cameras: [],
  isCamerasDataLoading: false,
  cameraItem: null,
  isCameraItemDataLoading: false,
  hasError: false,
};

export const cameras = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
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
      });
  },
});
