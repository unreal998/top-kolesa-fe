import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OrderData } from './types';

type OrderPage = {
  orderId: string;
  orderData: OrderData;
  error: string;
};

const initialState: OrderPage = {
  orderId: '',
  orderData: {
    orderId: 0,
    userName: '',
    totalAmount: 0,
    userEmail: '',
    orderTime: '',
    orderComment: '',
    deliveryAddress: '',
    phoneNumber: '',
    itemsList: [],
  },
  error: '',
};

export const orderSlice = createSlice({
  name: 'orderSliceData',
  initialState,
  reducers: {
    fetchOrderData(state, { payload }: PayloadAction<string>) {
      state.orderId = payload;
    },
    fetchOrderDataSuccess(state, { payload }: PayloadAction<OrderData>) {
      state.orderData = payload;
    },
    fetchOrderDataFailed(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
  },
});

export const actions = {
  ...orderSlice.actions,
};

export type orderReducerState = typeof initialState;
