import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { shopPageSlice } from '../modules/shopPage/reducer';
import { mainPageSlice } from '../modules/mainPage/reducer';
import { checkoutSlice } from '../modules/checkoutPage/reducer';

const slices = [shopPageSlice, mainPageSlice, checkoutSlice];

const toolkitReducers = Object.fromEntries(
  slices.map(({ name, reducer }) => [name, reducer]),
);

export const rootReducer = combineReducers({
  ...toolkitReducers,
});

export type AppSate = StateType<typeof rootReducer>;
