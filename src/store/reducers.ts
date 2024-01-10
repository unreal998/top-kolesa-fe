import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { shopPageSlice } from '../modules/shopPage/reducer';
import { mainPageSlice } from '../modules/mainPage/reducer';
import { checkoutSlice } from '../modules/checkoutPage/reducer';
import { orderSlice } from '../modules/orderPage/reducer';

const slices = [shopPageSlice, mainPageSlice, checkoutSlice, orderSlice];

const toolkitReducers = Object.fromEntries(
  slices.map(({ name, reducer }) => [name, reducer]),
);

export const rootReducer = combineReducers({
  ...toolkitReducers,
});

export type AppSate = StateType<typeof rootReducer>;
