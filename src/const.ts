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
  Coupon = '/coupons',
  Order = '/orders',
}

export enum NameSpace {
  Cameras = 'CAMERAS',
  Order = 'ORDERS',
  Reviews = 'REVIEWS',
  Promo = 'PROMO',
  Coupon = 'COUPON',
  Similar = 'SIMILAR',
  Basket = 'BASKET'
}

export const ITEMS_PER_PAGE = 9;
export const MAX_PAGES_COUNT_PER_PAGE = 3;

export enum CameraTypes {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная',
}

export const CameraTypesEng = {
  [CameraTypes.Collection]: 'collection',
  [CameraTypes.Snapshot]: 'snapshot',
  [CameraTypes.Film]: 'film',
  [CameraTypes.Digital]: 'digital',
} as const;

export enum CameraCategory {
  Photocamera = 'Видеокамера',
  Videocamera = 'Фотоаппарат'
}

export enum CameraLevel {
  Zero = 'Нулевой',
  'Non-professional' = 'Любительский',
  Professional = 'Профессиональный',
}

export const CameraLevelEng = {
  [CameraLevel.Zero]: 'zero',
  [CameraLevel['Non-professional']]: 'non-professional',
  [CameraLevel.Professional]: 'professional'
} as const;

export enum CouponType {
  'camera-333' = 'camera-333',
  'camera-444' = 'camera-444',
  'camera-555' = 'camera-555',
}

export const MAX_QUANTITY_ITEMS = 99;
export const MIN_QUANTITY_ITEMS = 1;

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

export enum ProductInfoURL {
  Description = 'description',
  Characteristics = 'characteristics',
}

export enum KeyCode {
  Enter = 'Enter',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Esc = 'Escape'
}

export const DEFAULT_DROPDOWNS_COUNT = 4;
export const DEFAULT_DROPDOWNS_INPUT_LENGTH = 3;

export enum SortType {
  Price = 'по цене',
  Popular = 'по популярности'
}

export enum SortOrder {
  Up = 'по возрастанию',
  Down = 'по убыванию'
}

export const sortOrderQueryValue = {
  [SortOrder.Up]: 'up',
  [SortOrder.Down]: 'down'
};
