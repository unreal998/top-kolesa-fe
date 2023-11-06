import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { ShopContainer } from "./components/ShopContainer";
import { FilterBar } from "./components/FilterBar";
import { actions } from "./reducer";
import { actions as mainActions } from "../mainPage/reducer";
import { useSearchParams } from "react-router-dom";

export function ShopPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.size > 0) {
      dispatch(
        actions.getShopItems({
          price: searchParams.get("price"),
          width: searchParams.get("width"),
          profile: searchParams.get("profile"),
          diametr: searchParams.get("diametr"),
          season: searchParams.get("season"),
          brand: searchParams.get("brand"),
        }),
      );
    } else {
      dispatch(actions.getShopItems(""));
    }
    dispatch(mainActions.getFilterData());
  }, [dispatch, searchParams]);

  return (
    <Box
      padding="0 30px"
      alignItems="flex-start"
      display="flex"
      flexDirection="row"
    >
      <FilterBar />
      <ShopContainer />
    </Box>
  );
}
