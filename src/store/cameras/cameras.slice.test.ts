import { ProductInfoURL, Status } from '../../const';
import { makeFakeCameraItem, makeFakeCameraList } from '../../utils-for-test/mocks';
import { fetchCameraItemAction, fetchCamerasAction } from '../api-actions';
import { cameras } from './cameras.slice';

describe('Cameras Slice', () => {
  const initialState = {
    cameras: [],
    isCamerasDataLoading: false,
    cameraItem: null,
    isCameraItemDataLoading: false,
    hasError: false,
    activePage: 1,
    activeCameraModal: undefined,
    status: Status.Idle,
    cameraInfo: ProductInfoURL.Description
  };
  const emptyAction = {type: ''};

  describe('fetchCamerasAction', () => {
    it('should return initial state with empty action', () => {
      const expectedState = {...initialState};

      const result = cameras.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action', () => {
      const expectedState = {...initialState};

      const result = cameras.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should set "isCamerasDataLoading" to "true" with "fetchCamerasAction.pending"', () => {
      const expectedState = {
        ...initialState,
        isCamerasDataLoading: true,
        status: Status.Loading,
      };

      const result = cameras.reducer(undefined, fetchCamerasAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "cameras" to array with camera, "isCamerasDataLoading" to "false" with "fetchCamerasAction.fulfilled"', () => {
      const mockCameras = makeFakeCameraList();
      const expectedState = {
        ...initialState,
        cameras: [...mockCameras],
        status: Status.Success,
      };

      const result = cameras.reducer(
        undefined,
        fetchCamerasAction.fulfilled(
          mockCameras, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });

    it('should set "isCamerasDataLoading" to "false" with "fetchCamerasAction.rejected', () => {
      const expectedState = {
        ...initialState,
        status: Status.Error
      };

      const result = cameras.reducer(
        undefined,
        fetchCamerasAction.rejected
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchCameraItemAction', () => {
    it('should return initial state with empty action', () => {
      const expectedState = {...initialState};

      const result = cameras.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action', () => {
      const expectedState = {...initialState};

      const result = cameras.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should set "isCameraItemDataLoading" to "true" with "fetchCameraItemAction.pending"', () => {
      const expectedState = {
        ...initialState,
        isCameraItemDataLoading: true,
      };

      const result = cameras.reducer(undefined, fetchCameraItemAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "camera", "isCameraItemDataLoading" to "false" with "fetchCameraItemAction.fulfilled"', () => {
      const mockCamera = makeFakeCameraItem();
      const expectedState = {
        ...initialState,
        cameraItem: {...mockCamera},
      };

      const result = cameras.reducer(
        undefined,
        fetchCameraItemAction.fulfilled(
          mockCamera, '', '')
      );

      expect(result).toEqual(expectedState);
    });

    it('should set "isCameraItemDataLoading" to "false" with "fetchCameraItemAction.rejected', () => {
      const expectedState = {...initialState};

      const result = cameras.reducer(
        undefined,
        fetchCameraItemAction.rejected
      );

      expect(result).toEqual(expectedState);
    });
  });
});
