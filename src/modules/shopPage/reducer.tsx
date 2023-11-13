import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ShopItem = {
  id: number;
  name: string;
  imgName: string;
  rating: number;
  price: number;
};

export type ShopItemAPI = {
  // THAT IS THE ID
  id: number;
  brand: string;
  country: string;
  diametr: string;
  height: number;
  width: string;
  season: string;
  speed: string;
  weight: string;
  name: string;
  rate: number;
  year: number;
  price_uah: number;
  image_file: string;
  brand_id: number;
  size_id: number;
  supplier_id: number;
};

export type ShopData = {
  tiresList: ShopItemAPI[];
};

export type SortParams = {
  showBy: number;
  sortBy: string;
};

type ShopPageState = {
  currentPage: number;
  itemsList: ShopItemAPI[];
  selectedItemId: string;
  sortParams: SortParams;
};

const initialState: ShopPageState = {
  currentPage: 1,
  itemsList: [],
  selectedItemId: "",
  sortParams: {
    showBy: 20,
    sortBy: "default",
  },
};

export const shopPageSlice = createSlice({
  name: "shopPageSliceData",
  initialState,
  reducers: {
    getShopItems(state, { payload }: PayloadAction<any>) {},
    getShopItemsSuccess(state, { payload }: PayloadAction<ShopData>) {
      state.itemsList = payload.tiresList;
    },
    getShopItemsFailure(state, { payload }: PayloadAction<string>) {
      console.log(payload);
    },
    setSelectedItemId(state, { payload }: PayloadAction<string>) {
      state.selectedItemId = payload;
    },
    setSortParams(state, { payload }: PayloadAction<SortParams>) {
      state.sortParams = payload;
    },
    setCurrentPage(state, { payload }: PayloadAction<number>) {
      state.currentPage = payload;
    },
  },
});

export const actions = {
  ...shopPageSlice.actions,
};

export type shopPageReducerState = typeof initialState;
