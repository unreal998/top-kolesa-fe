import React, { ChangeEvent, useCallback } from "react";
import { ShopHeaderBar } from "./shopHeaderBar";
import { Grid, Pagination, Stack } from "@mui/material";
import { ShopItemCard } from "./ShopItemCard";
import { ShopItemTable } from "./ShopItemTable";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCardView,
  selectCurrentPageItemList,
  selectPagesCount,
  selectSortParams,
} from "../selectors";
import { actions } from "../reducer";

export function ShopContainer() {
  const dispatch = useDispatch();
  const pagesCount = useSelector(selectPagesCount());
  const shopItems = useSelector(selectCurrentPageItemList());
  const cardView = useSelector(selectCardView);
  const sortParams = useSelector(selectSortParams());

  const handlePageChange = useCallback(
    (event: ChangeEvent<unknown>, page: number) => {
      dispatch(actions.setCurrentPage(page));
    },
    [dispatch]
  );

  const sorterShopItems = [...shopItems];
  switch (sortParams.sortBy) {
    case "priceHigh":
      sorterShopItems.sort((a, b) => b.price_uah - a.price_uah);
      break;
    case "priceLow":
      sorterShopItems.sort((a, b) => a.price_uah - b.price_uah);
      break;
    case "rated":
      sorterShopItems.sort((a, b) => b.rate - a.rate);
      break;
    case "date":
      sorterShopItems.sort((a, b) => b.year - a.year);
      break;
    default:
      break;
  }

  return (
    <Stack padding="20px 2%" width="100%" gap="20px" alignItems="center">
      <ShopHeaderBar />
      <Grid container spacing={2}>
        {shopItems &&
          sorterShopItems.map((item) => (
            <Grid key={item.id} item={true} xs={cardView ? 3 : 4}>
              {cardView ? (
                <ShopItemCard
                  id={item.id}
                  name={item.name}
                  rating={item.rate}
                  price={item.price_uah}
                  imgName={item.image_file}
                />
              ) : (
                <ShopItemTable
                  id={item.id}
                  name={item.name}
                  rating={item.rate}
                  price={item.price_uah}
                  imgName={item.image_file}
                />
              )}
            </Grid>
          ))}
      </Grid>
      <Pagination
        onChange={handlePageChange}
        count={pagesCount}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}
