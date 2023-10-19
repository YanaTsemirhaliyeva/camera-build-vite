import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BasketData } from '../../types/state';
import { NameSpace } from '../../const';
import { getBasketListFromLS } from '../../utils';
import { Camera } from '../../types/camera';
import { postCouponAction } from '../api-actions';

const {items} = getBasketListFromLS();


const initialState: BasketData = {
  items: items,
  discount: 0,
};

export const basket = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
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
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postCouponAction.fulfilled, (state, action) => {
        state.discount = action.payload;
      });
  }
});

export const {addItem, setCountItem, plusCountItem, minusCountItem, deleteAllItems, resetBasket} = basket.actions;
