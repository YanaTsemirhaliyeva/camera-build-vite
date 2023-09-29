import { CameraCategory, CameraLevel, CameraTypes } from '../const';
import { Promo } from './promo';

export type CameraInfo = {
  vendorCode: string;
  type: CameraTypes;
  level: CameraLevel;
  category: CameraCategory;
  description: string;
}

export type Camera = {
  price: number;
  rating: number;
  reviewCount: number;
} & Promo & CameraInfo;
