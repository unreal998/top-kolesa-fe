import { shopPageReducerState, shopPageSlice } from "./reducer";

export type ShopSliceStore = {
  [shopPageSlice.name]: shopPageReducerState;
};

export const selectShopItemsList =
  () =>
  ({ shopPageSliceData }: ShopSliceStore) =>
    shopPageSliceData.itemsList;
export const selectCurrentPage =
  () =>
  ({ shopPageSliceData }: ShopSliceStore) =>
    shopPageSliceData.currentPage;
export const selectCurrentPageItemList =
  () =>
  ({ shopPageSliceData }: ShopSliceStore) => {
    const prevPageValues =
      shopPageSliceData.currentPage > 0
        ? (shopPageSliceData.currentPage - 1) *
          shopPageSliceData.sortParams.showBy
        : 0;
    const newArray = shopPageSliceData.itemsList.slice(
      prevPageValues,
      shopPageSliceData.currentPage * shopPageSliceData.sortParams.showBy
    );
    return newArray;
  };
export const selectSelectedItemData =
  () =>
  ({ shopPageSliceData }: ShopSliceStore) => {
    return shopPageSliceData.itemsList.find((value) => {
      return value.id.toString() === shopPageSliceData.selectedItemId;
    });
  };

export const selectSortParams =
  () =>
  ({ shopPageSliceData }: ShopSliceStore) => {
    return shopPageSliceData.sortParams;
  };

export const selectPagesCount =
  () =>
  ({ shopPageSliceData }: ShopSliceStore) => {
    return Math.ceil(
      shopPageSliceData.itemsList.length / shopPageSliceData.sortParams.showBy
    );
  };

export const selectCardView = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData.cardView;

//FILTERS
export const selectSelectedWidth = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData.selectedWidth;

export const selectIsFullMenuOpen = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData.isFullMenuOpen;

export const selectActiveTabIndex = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData.activeTabIndex;

export const selectSearchInput = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData.searchInput;

export const selectSelectedProfile = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData.selectedProfile;

export const selectSelectedDiametr = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData.selectedDiametr;

export const selectSelectedPrice = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData.selectedPrice;

export const selectSelectedSeason = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData.selectedSeason;

export const selectSelectedBrand = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData.selectedBrand;

export const selectcartItemCount = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData.cartItemCount;
