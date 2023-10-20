import { CouponType } from '../const';

export type Order = {
  camerasIds: number[];
  coupon: CouponType | null;
}
