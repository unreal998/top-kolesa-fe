import { checkoutReducerState, checkoutSlice } from "./reducer";

export type CheckoutSliceStore = {
  [checkoutSlice.name]: checkoutReducerState;
};

export const selectCityListData = () => ({ checkoutSliceData }: CheckoutSliceStore) => {
    return checkoutSliceData.cityData;
};

export const selectWarehoutListData = () => ({ checkoutSliceData }: CheckoutSliceStore) => {
    return checkoutSliceData.warehouseData;
};

export const selectSelectedCityName = () => ({ checkoutSliceData }: CheckoutSliceStore) => {
  return checkoutSliceData.cityDataResponce.Addresses[0]?.MainDescription;
};
