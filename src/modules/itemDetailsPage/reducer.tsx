import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OrderItemProps } from './types';

type ItemDetailsPage = {};

const initialState: ItemDetailsPage = {};

export const itemDetailsSlice = createSlice({
  name: 'itemDetailsSliceData',
  initialState,
  reducers: {
    fetchBuyItemAction(state, { payload }: PayloadAction<OrderItemProps[]>) {},
    fetchBuyItemActionSuccess(state, { payload }: PayloadAction<string>) {},
    fetchBuyItemActionFailed(state, { payload }: PayloadAction<string>) {},
  },
});

export const actions = {
  ...itemDetailsSlice.actions,
};

export type itemDetailsReducerState = typeof initialState;
