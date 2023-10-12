import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CameraData } from '../../types/state';
import { CameraCategory, CameraLevel, CameraTypes, NameSpace, SortOrder, SortType, Status } from '../../const';
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
  category: null,
  type: [],
  level: [],
  isReset: false,
  minPrice: 0,
  maxPrice: 0
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
    },
    changeSortOrder: (state, action: {payload: SortOrder}) => {
      state.sortOrder = action.payload;
      if (!state.sortType) {
        state.sortType = SortType.Price;
      }
    },
    setActiveType: (state, action: PayloadAction<CameraTypes>) => {
      if (!state.type.includes(action.payload)) {
        state.type.push(action.payload);
      }
    },
    setActiveCategory: (state, action: PayloadAction<CameraCategory>) => {
      state.category = action.payload;
    },
    setActiveLevel: (state, action: PayloadAction<CameraLevel>) => {
      if (!state.level.includes(action.payload)) {
        state.level.push(action.payload);
      }
    },
    changeFilterType: (state, action: PayloadAction<CameraTypes>) => {
      if (state.type.includes(action.payload)) {
        state.type = state.type.filter((type) => type !== action.payload);
        return;
      }
      state.type.push(action.payload);
    },
    changeFilterLevel: (state, action: PayloadAction<CameraLevel>) => {
      if (state.level.includes(action.payload)) {
        state.level = state.level.filter((level) => level !== action.payload);
        return;
      }
      state.level.push(action.payload);
    },
    setMinPrice: (state, action: {payload: number}) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: {payload: number}) => {
      state.maxPrice = action.payload;
    },
    resetFilters: (state) => {
      state.activePage = 1;
      state.sortType = null;
      state.sortOrder = null;
      state.category = null;
      state.type = [];
      state.level = [];
      state.minPrice = 0;
      state.maxPrice = 0;
      state.isReset = true;
    },
    changeResetStatus: (state) => {
      state.isReset = false;
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

export const {
  setActivePage,
  setActiveCameraModal,
  dropCameraItem,
  setCatalogStatus,
  changeSortType,
  changeSortOrder,
  setActiveType,
  setActiveCategory,
  setActiveLevel,
  changeFilterLevel,
  changeFilterType,
  resetFilters,
  changeResetStatus,
  setMinPrice,
  setMaxPrice,
} = cameras.actions;
