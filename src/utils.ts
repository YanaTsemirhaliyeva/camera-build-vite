import { CameraCategory, CameraLevel, CameraTypes, SortOrder, SortType } from './const';
import { Camera } from './types/camera';

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

