import { CameraCategory, CameraLevel, CameraTypes } from '../const';
import { Promo } from './promo';

export type Camera = {
  vendorCode: string;
  type: CameraTypes;
  category: CameraCategory;
  description: string;
  level: CameraLevel;
  price: number;
  rating: number;
  reviewCount: number;
} & Promo;
