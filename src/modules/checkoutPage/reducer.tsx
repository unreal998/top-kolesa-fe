import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  AutocompleateData,
  CityListResponce,
  CityListResponceData,
  WarehouseListResponce,
} from './types';
import { OrderItemProps } from '../itemDetailsPage/types';

type CheckoutPage = {
  cityInputData: string;
  warehouseInputData: string;
  cityData: AutocompleateData[];
  warehouseData: AutocompleateData[];
  error: string;
  cityDataResponce: CityListResponceData;
};

export type BuyItemResponce = {
  orderId: string;
};

const initialState: CheckoutPage = {
  cityInputData: '',
  warehouseInputData: '',
  cityData: [],
  warehouseData: [],
  error: '',
  cityDataResponce: {
    TotalCount: 0,
    Addresses: [],
  },
};

export const checkoutSlice = createSlice({
  name: 'checkoutSliceData',
  initialState,
  reducers: {
    fetchCityListByInput(state, { payload }: PayloadAction<string>) {
      state.cityInputData = payload;
    },
    fetchCityListByInputSuccess(
      state,
      { payload }: PayloadAction<CityListResponce>,
    ) {
      state.cityDataResponce = payload.data[0];
      state.cityData = payload.data[0].Addresses.map((item) => {
        return { title: item.Present };
      });
    },
    fetchCityListByInputFailed(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
    fetchWarehouseListByInput(state, { payload }: PayloadAction<string>) {
      state.warehouseInputData = payload;
    },
    fetchWarehouseListByInputSuccess(
      state,
      { payload }: PayloadAction<WarehouseListResponce>,
    ) {
      state.warehouseData = payload.data.map((item) => {
        return { title: item.Description };
      });
    },
    fetchWarehouseListByInputFailed(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
    fetchBuyItemAction(state, { payload }: PayloadAction<OrderItemProps[]>) {},
    fetchBuyItemActionSuccess(
      state,
      { payload }: PayloadAction<BuyItemResponce>,
    ) {},
    fetchBuyItemActionFailed(state, { payload }: PayloadAction<string>) {},
  },
});

export const actions = {
  ...checkoutSlice.actions,
};

export type checkoutReducerState = typeof initialState;
