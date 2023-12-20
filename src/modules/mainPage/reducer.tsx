import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type FilterParams = {
  width: string[];
  diametr: string[];
  height: string[];
  speed: string[];
  weight: string[];
  brands: string[];
  prices: number[];
};

type MainPageState = {
  filtersParams: FilterParams;
};

const initialState: MainPageState = {
  filtersParams: {
    width: [],
    diametr: [],
    height: [],
    speed: [],
    weight: [],
    brands: [],
    prices: [],
  },
};

export const mainPageSlice = createSlice({
  name: 'mainPageSliceData',
  initialState,
  reducers: {
    getFilterData(state) {},
    getFilterDataSuccess(state, { payload }: PayloadAction<FilterParams>) {
      state.filtersParams = { ...payload };
    },
    getFilterDataFailure(state, { payload }: PayloadAction<string>) {
      console.log(payload);
    },
  },
});

export const actions = {
  ...mainPageSlice.actions,
};

export type mainPageReducerState = typeof initialState;
