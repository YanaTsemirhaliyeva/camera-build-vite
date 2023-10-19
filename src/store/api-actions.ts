import { createAsyncThunk } from '@reduxjs/toolkit';
import { Camera } from '../types/camera';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, CouponType } from '../const';
import { Promo } from '../types/promo';
import { generatePath } from 'react-router-dom';
import { Review, ReviewPost } from '../types/review';
import { Order } from '../types/order';

export const fetchCamerasAction = createAsyncThunk<Camera[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchCameras',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Camera[]>(APIRoute.Cameras);
    return data;
  }
);

export const fetchPromoAction = createAsyncThunk<Promo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchPromo',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Promo[]>(APIRoute.Promo);
    return data;
  }
);

export const fetchCameraItemAction = createAsyncThunk<Camera, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchCameraItem',
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<Camera>(generatePath(APIRoute.CameraItem, {cameraId: cameraId}));
    return data;
  }
);

export const fetchSimilarProductsAction = createAsyncThunk<Camera[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchSimilar',
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<Camera[]>(generatePath(APIRoute.Similar, {cameraId: cameraId}));
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchReviews',
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<Review[]>(generatePath(APIRoute.Reviews, {cameraId: cameraId}));
    return data;
  }
);

export const postReviewAction = createAsyncThunk<Review, ReviewPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/postReview',
  async ({cameraId, userName, advantage, disadvantage, review, rating}, {extra: api}) => {
    const {data} = await api.post<Review>(APIRoute.ReviewPost, {cameraId, userName, advantage, disadvantage, review, rating});
    return data;
  }
);

export const postCouponAction = createAsyncThunk<number, CouponType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/postCoupon',
  async (coupon, {extra: api}) => {
    const {data} = await api.post<number>(APIRoute.Coupon, {coupon});
    return data;
  }
);

export const postOrderAction = createAsyncThunk<number, Order, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/postOrder',
  async ({camerasIds, coupon}, {extra: api}) => {
    const {data} = await api.post<number>(APIRoute.Order, {camerasIds, coupon});
    return data;
  }
);
