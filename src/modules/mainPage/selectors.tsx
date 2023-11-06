import { mainPageReducerState, mainPageSlice } from "./reducer";

export type ManPageSliceStore = {
  [mainPageSlice.name]: mainPageReducerState;
};

export const selectFilterData =
  () =>
  ({ mainPageSliceData }: ManPageSliceStore) => {
    return mainPageSliceData.filtersParams;
  };
