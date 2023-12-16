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
  param: string; // studded
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
  cardView: boolean;
  sortParams: SortParams;
  isFullMenuOpen: boolean;
  activeTabIndex: number;
  searchInput: string;
  selectedWidth: string;
  selectedProfile: string;
  selectedDiametr: string;
  selectedPrice: number[];
  selectedSeason: string[];
  selectedBrand: string[];
  cartItemCount: number;
  selectedStudded: string[];
};

const initialState: ShopPageState = {
  currentPage: 1,
  itemsList: [],
  selectedItemId: "",
  cardView: true,
  sortParams: {
    showBy: 20,
    sortBy: "rated",
  },
  isFullMenuOpen: false,
  activeTabIndex: 0,
  searchInput: "",
  selectedWidth: "",
  selectedProfile: "",
  selectedDiametr: "",
  selectedPrice: [0, 0],
  selectedSeason: [],
  selectedBrand: [],
  cartItemCount: 0,
  selectedStudded: [],
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
    setCardView(state, { payload }: PayloadAction<boolean>) {
      state.cardView = payload;
    },
    setSortParams(state, { payload }: PayloadAction<SortParams>) {
      state.sortParams = payload;
    },
    setCurrentPage(state, { payload }: PayloadAction<number>) {
      state.currentPage = payload;
    },
    //FILTERS
    toggleFullMenu: (state, action: PayloadAction<number | undefined>) => {
      state.isFullMenuOpen = !state.isFullMenuOpen;
      if (action.payload !== undefined) {
        state.activeTabIndex = action.payload;
      }
    },
    setSearchInput: (
      state,
      action: PayloadAction<React.ChangeEvent<HTMLInputElement>>
    ) => {
      const inputValue = action.payload.target.value;
      state.searchInput = inputValue;
    },
    setClearSearchInput(state) {
      state.searchInput = "";
    },
    setSelectedWidth(state, action: PayloadAction<string>) {
      state.selectedWidth = action.payload;
    },
    setClearSelectedWidth(state) {
      state.selectedWidth = "";
    },
    setSelectedProfile(state, action: PayloadAction<string>) {
      state.selectedProfile = action.payload;
    },
    setClearSelectedProfile(state) {
      state.selectedProfile = "";
    },
    setSelectedDiametr(state, action: PayloadAction<string>) {
      state.selectedDiametr = action.payload;
    },
    setClearSelectedDiametr(state) {
      state.selectedDiametr = "";
    },
    initializePriceRange: (state, action: PayloadAction<number[]>) => {
      state.selectedPrice = action.payload;
    },
    setPriceChange: (state, action: PayloadAction<number[]>) => {
      state.selectedPrice = action.payload;
    },
    setResetPriceRange: (state) => {
      state.selectedPrice = [0, 0];
    },
    setSeasonChange: (state, action: PayloadAction<string[]>) => {
      state.selectedSeason = action.payload;
    },
    setResetSeason: (state) => {
      state.selectedSeason = [];
    },
    setBrandChange: (state, action: PayloadAction<string[]>) => {
      state.selectedBrand = action.payload;
    },
    setResetBrand: (state) => {
      state.selectedBrand = [];
    },
    setCartItemCount: (state, action: PayloadAction<number>) => {
      state.cartItemCount = action.payload;
    },
    setResetCartItemCount: (state) => {
      state.cartItemCount = 0;
    },
    setStuddedChange: (state, action: PayloadAction<string[]>) => {
      state.selectedStudded = action.payload;
    },
    setResetStudded: (state) => {
      state.selectedStudded = [];
    },
  },
});

export const actions = {
  ...shopPageSlice.actions,
};

export type shopPageReducerState = typeof initialState;
