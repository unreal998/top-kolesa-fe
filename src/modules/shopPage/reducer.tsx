import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type ShopItem = {
    id: number,
    name: string,
    imgName: string,
    rating: number,
    price: number
}

export type ShopItemAPI = {
    // THAT IS THE ID
    id: number,
    brand: string,
    country: string,
    diametr: string,
    height: number,
    width: string,
    season: string,
    speed: string,
    weight: string,
    name: string,
    rate: number,
    year: number,
    price_uah: number,
    image_file: string
}

export type FilterParams = {
    width: string[],
    diametr: string[],
    height: string[],
    speed: string[],
    weight: string[],
    brands: string[],
    prices: number[]
}

export type ShopData = {
    tiresList: ShopItemAPI[],
    tireSizes: FilterParams
}

export type SortParams = {
    showBy: number,
    sortBy: string
}

type ShopPageState = {
    currentPage: number,
    itemsList: ShopItemAPI[],
    selectedItemId: string,
    sortParams: SortParams,
    filtersParams: FilterParams
}

const initialState: ShopPageState = {
    currentPage: 1,
    itemsList: [],
    selectedItemId: '',
    sortParams: {
        showBy: 20,
        sortBy: 'default'
    },
    filtersParams: {
        width: [],
        diametr: [],
        height: [],
        speed: [],
        weight: [],
        brands: [],
        prices: []
    }
}

export const shopPageSlice = createSlice({
    name: 'shopPageSliceData',
    initialState,
    reducers: {
        getShopItems(state, {payload}: PayloadAction<number>) {
            state.currentPage = payload;
        },
        getShopItemsSuccess(state, {payload}: PayloadAction<ShopData>) {
            state.itemsList = payload.tiresList;
            state.filtersParams = payload.tireSizes;
        },
        getShopItemsFailure(state, {payload}: PayloadAction<string>) {
            console.log(payload)
        },
        setSelectedItemId(state, {payload}: PayloadAction<string>) {
            state.selectedItemId = payload;
        },
        setSortParams(state, {payload}: PayloadAction<SortParams>) {
            state.sortParams = payload;
        },
        setCurrentPage(state, {payload}: PayloadAction<number>) {
            state.currentPage = payload;
        }
    }
})

export const actions = {
    ...shopPageSlice.actions
}

export type shopPageReducerState = typeof initialState;