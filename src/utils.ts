import { CameraCategory, CameraLevel, CameraTypes, CouponType, SortOrder, SortType } from './const';
import { Camera } from './types/camera';
import { Basket } from './types/state';

// Сортировка каталога по цене/популярности

export const sortCameras = (cameras: Camera[], sortType: SortType | null, sortOrder: SortOrder | null): Camera[] => {
  let sortedCamerasByType: Camera[] = [];

  switch (sortType) {
    case SortType.Popular:
      sortedCamerasByType = [...cameras].sort((a, b) => b.rating - a.rating);
      break;
    case SortType.Price:
      sortedCamerasByType = [...cameras].sort((a, b) => b.price - a.price);
      break;
    default:
      sortedCamerasByType = [...cameras];
      break;
  }

  let sortedCamerasByOrder: Camera[] = [];

  switch (sortOrder) {
    case SortOrder.Up:
      sortedCamerasByOrder = sortedCamerasByType.reverse();
      break;
    case SortOrder.Down:
      sortedCamerasByOrder = sortedCamerasByType;
      break;
    default:
      sortedCamerasByOrder = [...cameras];
      break;
  }

  return sortedCamerasByOrder;
};


// Фильтрация каталога

export const filterCamerasByCategory = (cameras: Camera[], category: CameraCategory | null): Camera[] => {
  if (!category) {
    return cameras;
  }

  const filteredCameras = [...cameras].filter((camera) => camera.category === category);

  return filteredCameras;
};

export const filterCamerasByTypes = (cameras: Camera[], types: CameraTypes[]): Camera[] => {
  if (!types.length) {
    return cameras;
  }

  const filteredCameras = [...cameras].filter((camera) => types.includes(camera.type));

  return filteredCameras;
};

export const filterCamerasByLevels = (cameras: Camera[], levels: CameraLevel[]): Camera[] => {
  if (!levels.length) {
    return cameras;
  }

  const filteredCameras = [...cameras].filter((camera) => levels.includes(camera.level));

  return filteredCameras;
};

export const getPrice = (cameras: Camera[], type: 'max' | 'min'): string => {
  if (!cameras.length) {
    return '';
  }

  const sortedCameras = [...cameras].sort((a, b) => a.price - b.price);

  if (type === 'max' && sortedCameras.length) {
    return sortedCameras[sortedCameras.length - 1].price.toString();
  } else {
    return sortedCameras[0].price.toString();
  }
};

export const filterCamerasByPrice = (cameras: Camera[], minPrice: number, maxPrice: number): Camera[] => {
  if (!minPrice && !maxPrice) {
    return cameras;
  }

  if (!maxPrice) {
    maxPrice = Infinity;
  }

  const filteredCameras = cameras.filter((camera) => camera.price >= minPrice && camera.price <= maxPrice);

  return filteredCameras;
};


export const filterCameras = (
  cameras: Camera[],
  category: CameraCategory | null,
  types: CameraTypes[],
  levels: CameraLevel[],
  minPrice: number,
  maxPrice: number
): Camera[] => {
  const filteredCamerasByCategory = filterCamerasByCategory(cameras, category);
  const filteredCamerasByTypes = filterCamerasByTypes(filteredCamerasByCategory, types);
  const filteredCamerasByLevels = filterCamerasByLevels(filteredCamerasByTypes, levels);
  const filteredCamerasByPrice = filterCamerasByPrice(filteredCamerasByLevels, minPrice, maxPrice);

  return filteredCamerasByPrice;
};

// Получение списка корзины из local storage

export const getBasketListFromLS = () => {
  const data = localStorage.getItem('basket');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const items = data ? JSON.parse(data) : [];
  return {
    items: items as Basket[]
  };
};

export const getPromoCodeLS = () => {
  const data = localStorage.getItem('promo');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const promo = data ? JSON.parse(data) : null;
  return {
    promo: promo as CouponType
  };
};

export const getDiscountLS = () => {
  const data = localStorage.getItem('discount');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const promoDiscount = data ? JSON.parse(data) : 0;
  return {
    promoDiscount: promoDiscount as number
  };
};

export const calcTotalPrice = (items: Basket[]) => items.reduce((sum, obj) => obj.price * obj.count + sum, 0);


