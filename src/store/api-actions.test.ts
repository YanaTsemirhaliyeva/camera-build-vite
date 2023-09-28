import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fetchCameraItemAction, fetchCamerasAction, fetchPromoAction, fetchReviewsAction, fetchSimilarProductsAction, postReviewAction } from './api-actions';
import { makeFakeCameraItem, makeFakeCameraList, makeFakePostReview, makeFakePromoList, makeFakeReviewList, makeFakeSimilarProducts } from '../utils-for-test/mocks';
import { APIRoute } from '../const';
import { generatePath } from 'react-router-dom';

type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({CAMERAS: {cameras: []}});
  });

  describe('fetchCamerasAction', () => {
    it('should dispatch "fetchCamerasAction.pending", "fetchCamerasAction.fullfiled", when server response 200', async () => {
      const mockCameraList = makeFakeCameraList();
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(200, mockCameraList);

      await store.dispatch(fetchCamerasAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCamerasActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCamerasAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.fulfilled.type
      ]);

      expect(fetchCamerasActionFulfilled.payload).toEqual(mockCameraList);
    });

    it('should dispatch "fetchCamerasAction.pending", "fetchCamerasAction.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(400, []);

      await store.dispatch(fetchCamerasAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.rejected.type,
      ]);
    });
  });

  describe('fetchCamerasAction', () => {
    it('should dispatch "fetchPromoAction.pending", "fetchPromoAction.fullfiled", when server response 200', async () => {
      const mockPromoList = makeFakePromoList();
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromoList);

      await store.dispatch(fetchPromoAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromoActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCamerasAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.fulfilled.type
      ]);

      expect(fetchPromoActionFulfilled.payload).toEqual(mockPromoList);
    });

    it('should dispatch "fetchPromoAction.pending", "fetchPromoAction.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, []);

      await store.dispatch(fetchPromoAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.rejected.type,
      ]);
    });
  });

  describe('fetchCameraItemAction', () => {
    const mockCameraItem = makeFakeCameraItem();

    it('should dispatch "fetchCameraItemAction.pending", "fetchCameraItemAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(generatePath(APIRoute.CameraItem, {cameraId: mockCameraItem.id.toString()})).reply(200, mockCameraItem);

      await store.dispatch(fetchCameraItemAction(mockCameraItem.id.toString()));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCameraItemActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCameraItemAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCameraItemAction.pending.type,
        fetchCameraItemAction.fulfilled.type,
      ]);

      expect(fetchCameraItemActionFulfilled.payload)
        .toEqual(mockCameraItem);
    });

    it('should dispatch "fetchCameraItemAction.pending", "fetchCameraItemAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(generatePath(APIRoute.CameraItem, {cameraId: mockCameraItem.id.toString()})).reply(400, []);

      await store.dispatch(fetchCameraItemAction(mockCameraItem.id.toString()));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCameraItemAction.pending.type,
        fetchCameraItemAction.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarProductsAction', () => {
    const mockCameraItem = makeFakeCameraItem();
    const mockSimilarList = makeFakeSimilarProducts();

    it('should dispatch "fetchSimilarProductsAction.pending", "fetchSimilarProductsAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(generatePath(APIRoute.Similar, {cameraId: mockCameraItem.id.toString()})).reply(200, mockSimilarList);

      await store.dispatch(fetchSimilarProductsAction(mockCameraItem.id.toString()));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarProductsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSimilarProductsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarProductsAction.pending.type,
        fetchSimilarProductsAction.fulfilled.type,
      ]);

      expect(fetchSimilarProductsActionFulfilled.payload)
        .toEqual(mockSimilarList);
    });

    it('should dispatch "fetchSimilarProductsAction.pending", "fetchSimilarProductsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(generatePath(APIRoute.Similar, {cameraId: mockCameraItem.id.toString()})).reply(400, []);

      await store.dispatch(fetchSimilarProductsAction(mockCameraItem.id.toString()));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarProductsAction.pending.type,
        fetchSimilarProductsAction.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsAction', () => {
    const mockCameraItem = makeFakeCameraItem();
    const mockReviews = makeFakeReviewList();

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(generatePath(APIRoute.Reviews, {cameraId: mockCameraItem.id.toString()})).reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(mockCameraItem.id.toString()));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload)
        .toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(generatePath(APIRoute.Reviews, {cameraId: mockCameraItem.id.toString()})).reply(400, []);

      await store.dispatch(fetchReviewsAction(mockCameraItem.id.toString()));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });

  describe('postReviewAction', () => {
    const mockPostReview = makeFakePostReview();
    const {cameraId, userName, advantage, disadvantage, review, rating} = mockPostReview;

    it('should dispatch "postReviewAction.pending", "postReviewAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onPost(APIRoute.ReviewPost, {cameraId, userName, advantage, disadvantage, review, rating}).reply(200, mockPostReview);

      await store.dispatch(postReviewAction({cameraId, userName, advantage, disadvantage, review, rating}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postReviewActionFulfilled = emittedActions.at(1) as ReturnType<typeof postReviewAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postReviewAction.pending.type,
        postReviewAction.fulfilled.type,
      ]);

      expect(postReviewActionFulfilled.payload)
        .toEqual(mockPostReview);
    });

    it('should dispatch "postReviewAction.pending", "postReviewActionn.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.ReviewPost, {cameraId, userName, advantage, disadvantage, review, rating}).reply(400, []);

      await store.dispatch(postReviewAction({cameraId, userName, advantage, disadvantage, review, rating}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReviewAction.pending.type,
        postReviewAction.rejected.type,
      ]);
    });
  });

});
