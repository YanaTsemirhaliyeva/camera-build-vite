import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CameraData } from '../../types/state';
import { NameSpace, SortOrder, SortType, Status } from '../../const';
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
  sortType: null,
  sortOrder: null,
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
    changeSortType: (state, action: {payload: SortType}) => {
      state.sortType = action.payload;

      if (!state.sortOrder) {
        state.sortOrder = SortOrder.Up;
      }
      switch (state.sortType) {
        case SortType.Price:
          if (state.sortOrder === SortOrder.Up) {
            state.cameras.sort((a, b) => a.price - b.price);
          }
          if (state.sortOrder === SortOrder.Down) {
            state.cameras.sort((a, b) => b.price - a.price);
          }
          break;
        case SortType.Popular:
          if (state.sortOrder === SortOrder.Up) {
            state.cameras.sort((a, b) => a.rating - b.rating);
          }
          if (state.sortOrder === SortOrder.Down) {
            state.cameras.sort((a, b) => b.rating - a.rating);
          }
          break;
      }
    },
    changeSortOrder: (state, action: {payload: SortOrder}) => {
      state.sortOrder = action.payload;

      if (!state.sortType) {
        state.sortType = SortType.Price;
      }
      switch (state.sortOrder) {
        case SortOrder.Down:
          if (state.sortType === SortType.Price) {
            state.cameras.sort((a, b) => b.price - a.price);
          }
          if (state.sortType === SortType.Popular) {
            state.cameras.sort((a, b) => b.rating - a.rating);
          }
          break;
        case SortOrder.Up:
          if (state.sortType === SortType.Price) {
            state.cameras.sort((a, b) => a.price - b.price);
          }
          if (state.sortType === SortType.Popular) {
            state.cameras.sort((a, b) => a.rating - b.rating);
          }
          break;
      }
    }
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

export const { setActivePage, setActiveCameraModal, dropCameraItem, setCatalogStatus, changeSortType, changeSortOrder } = cameras.actions;
