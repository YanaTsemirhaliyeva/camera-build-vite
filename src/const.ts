export enum AppRoute {
  Index = '/',
  Product = '/camera',
  Basket = '/basket',
}

export enum APIRoute {
  Cameras = '/cameras',
  CameraItem = '/cameras/:cameraId',
  Similar = '/cameras/:cameraId/similar',
  Promo = '/promo',
  Reviews = '/cameras/:cameraId/reviews',
  ReviewPost = '/reviews',
  Coupon = '/coupon',
  Order = '/orders',
}

export enum NameSpace {
  Cameras = 'CAMERAS',
  Order = 'ORDERS',
  Reviews = 'REVIEWS',
  Promo = 'PROMO',
  Coupon = 'COUPON',
  Similar = 'SIMILAR',
}

export const ITEMS_PER_PAGE = 9;
export const MAX_PAGES_COUNT_PER_PAGE = 3;

export enum CameraTypes {
  Коллекционная = 'Коллекционная',
  Моментальная = 'Моментальная',
  Цифровая = 'Цифровая',
  Плёночная = 'Плёночная',
}

export enum CameraCategory {
  Видеокамера = 'Видеокамера',
  Фотоаппарат = 'Фотоаппарат'
}

export enum CameraLevel {
  Нулевой = 'Нулевой',
  Любительский = 'Любительский',
  Профессиональный = 'Профессиональный',
}

export enum CouponType {
  'camera-333' = 'camera-333',
  'camera-444' = 'camera-444',
  'camera-555' = 'camera-555',
}

export const RATING_VALUES = [1, 2, 3, 4, 5];

export const TITLE_RATING_VALUES = [
  'Отлично',
  'Хорошо',
  'Нормально',
  'Плохо',
  'Ужасно'
] as const;


export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}
