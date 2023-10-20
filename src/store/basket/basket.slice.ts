import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BasketData } from '../../types/state';
import { CouponType, NameSpace, Status } from '../../const';
import { getBasketListFromLS } from '../../utils';
import { Camera } from '../../types/camera';
import { postCouponAction, postOrderAction } from '../api-actions';
import { toast } from 'react-toastify';

const {items} = getBasketListFromLS();


const initialState: BasketData = {
  items: items,
  discount: 0,
  promoCode: null,
  hasError: false,
  isPromoCodeValid: false,
  status: Status.Idle
};

export const basket = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    setPromoCode: (state, action: PayloadAction<CouponType>) => {
      state.promoCode = action.payload;
    },
    addItem: (state, action: PayloadAction<Camera>) => {
      if (!state.items.some((item) => item.id === action.payload.id)) {
        state.items.push({ ...action.payload, count: 1 });
      } else {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, count: item.count + 1 } : item
        );
      }
      localStorage.setItem('basket', JSON.stringify(state.items));
    },
    plusCountItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload ? { ...item, count: item.count + 1 } : item
      );
      localStorage.setItem('basket', JSON.stringify(state.items));
    },
    minusCountItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload ? { ...item, count: item.count - 1 } : item
      );
      localStorage.setItem('basket', JSON.stringify(state.items));
    },
    deleteAllItems: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem('basket', JSON.stringify(state.items));
    },
    setCountItem: (state, action: PayloadAction<{ id: number; count: number }>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, count: action.payload.count } : item
      );
      localStorage.setItem('basket', JSON.stringify(state.items));
    },
    resetBasket: (state) => {
      state.items = [];
      localStorage.removeItem('basket');
      state.discount = 0;
      state.promoCode = null;
      state.hasError = false;
      state.isPromoCodeValid = false;
      state.status = Status.Idle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postCouponAction.pending, (state) => {
        state.hasError = false;
        state.isPromoCodeValid = false;
      })
      .addCase(postCouponAction.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.hasError = false;
        state.isPromoCodeValid = true;
      })
      .addCase(postCouponAction.rejected, (state) => {
        state.hasError = true;
        state.isPromoCodeValid = false;
        state.discount = 0;
      })
      .addCase(postOrderAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.status = Status.Success;
        toast.warn('Ваш заказ успешно отправлен!');
      })
      .addCase(postOrderAction.rejected, (state) => {
        state.status = Status.Error;
        toast.warn('Произошла ошибка отправки заказа. Попробуйте позже');
      });
  }
});

export const {addItem, setCountItem, plusCountItem, minusCountItem, deleteAllItems, resetBasket, setPromoCode} = basket.actions;
