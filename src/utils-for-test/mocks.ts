
import { Action } from 'redux';
import { CameraCategory, CameraLevel, CameraTypes, Status } from '../const';
import { Camera } from '../types/camera';
import { faker } from '@faker-js/faker';
import { State } from '../types/state';
import { Promo } from '../types/promo';
import { Review, ReviewPost } from '../types/review';

export const makeFakeCameraItem = (): Camera => ({
  id: faker.helpers.rangeToNumber({min: 1, max: 50000000}),
  name: faker.vehicle.bicycle(),
  previewImg: faker.system.filePath(),
  previewImg2x: faker.system.filePath(),
  previewImgWebp: faker.system.filePath(),
  previewImgWebp2x: faker.system.filePath(),
  vendorCode: faker.vehicle.vrm(),
  type: faker.helpers.enumValue(CameraTypes),
  category: faker.helpers.enumValue(CameraCategory),
  description: faker.lorem.words({ min: 5, max: 15}),
  level: faker.helpers.enumValue(CameraLevel),
  price: faker.helpers.rangeToNumber({min: 1000, max: 100000}),
  rating: faker.helpers.rangeToNumber({min: 1, max: 5}),
  reviewCount: faker.helpers.rangeToNumber({min: 0, max: 15}),
});

export const makeFakeCameraList = (): Camera[] => Array.from({length: 20}, makeFakeCameraItem);

export const makeFakePromoList = (): Promo[] => (
  new Array(3).fill(null).map(() => ({
    id: faker.helpers.rangeToNumber({min: 1, max: 50000000}),
    name: faker.vehicle.bicycle(),
    previewImg: faker.system.filePath(),
    previewImg2x: faker.system.filePath(),
    previewImgWebp: faker.system.filePath(),
    previewImgWebp2x: faker.system.filePath(),
  }))
);

export const makeFakeReviewList = (): Review[] => (
  new Array(10).fill(null).map(() => ({
    cameraId:  faker.helpers.rangeToNumber({min: 1, max: 50000000}),
    userName: faker.person.firstName(),
    advantage: faker.lorem.words({ min: 3, max: 9}),
    disadvantage: faker.lorem.words({ min: 3, max: 9}),
    review: faker.lorem.words({ min: 3, max: 9}),
    rating: faker.helpers.rangeToNumber({min: 1, max: 5}),
    id: faker.string.uuid(),
    createAt: new Date().toISOString()
  }))
);

export const makeFakePostReview = (): ReviewPost => ({
  cameraId: faker.helpers.rangeToNumber({min: 1, max: 50000000}),
  userName: faker.person.firstName(),
  advantage: faker.lorem.words({ min: 3, max: 9}),
  disadvantage: faker.lorem.words({ min: 3, max: 9}),
  review: faker.lorem.words({ min: 3, max: 9}),
  rating: faker.helpers.rangeToNumber({min: 1, max: 5}),
});

export const makeFakeSimilarProducts = (): Camera[] => Array.from({length: 10}, makeFakeCameraItem);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  CAMERAS: {
    cameras: [],
    isCamerasDataLoading: false,
    cameraItem: null,
    isCameraItemDataLoading: false,
    hasError: false,
    activePage: 1,
    activeCameraModal: undefined,
    status: Status.Idle
  },
  PROMO: {
    promo: [],
    isPromoDataLoading: false,
    status: Status.Idle,
  },
  SIMILAR: {
    similar: [],
    isSimilarDataLoading: false,
  },
  REVIEWS: {
    reviews: [],
    isReviewsDataLoading: false,
    status: Status.Idle,
  },
  ...initialState ?? {},
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
