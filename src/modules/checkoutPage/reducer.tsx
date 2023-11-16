import { createSlice } from "@reduxjs/toolkit";

type CheckoutPage = {

}

const initialState: CheckoutPage = {

};

export const checkoutSlice = createSlice({
  name: "checkoutSliceData",
  initialState,
  reducers: {

  },
});

export const actions = {
  ...checkoutSlice.actions,
};

export type checkoutReducerState = typeof initialState;
