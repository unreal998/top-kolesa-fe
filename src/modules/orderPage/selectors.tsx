import { orderReducerState, orderSlice } from './reducer';

export type OrderSliceStore = {
  [orderSlice.name]: orderReducerState;
};

export const selectOrderData =
  () =>
  ({ orderSliceData }: OrderSliceStore) => {
    return orderSliceData.orderData;
  };
