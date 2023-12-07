import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../reducer";
import {
  selectSelectedBrand,
  selectSelectedDiametr,
  selectSelectedPrice,
  selectSelectedProfile,
  selectSelectedSeason,
  selectSelectedStudded,
  selectSelectedWidth,
} from "../../../selectors";
import { selectFilterData } from "../../../../mainPage/selectors";

import FilterShortMenuRow from "./FilterShortMenuRow";
import FilterShortMenuColumnPrice from "./FilterShortMenuColumnPrice";
import FilterShortMenuColumn from "./FilterShortMenuColumn";
import FilterShortMenuReset from "./FilterShortMenuReset";

import { Button, ButtonGroup, Stack } from "@mui/material";

import WidthIcon from "../../../../../shared/components/Icons/WidthIcon";
import ProfileIcon from "../../../../../shared/components/Icons/ProfileIcon";
import DiametrIcon from "../../../../../shared/components/Icons/DiametrIcon";
import PriceIcon from "../../../../../shared/components/Icons/PriceIcon";
import SeasonIcon from "../../../../../shared/components/Icons/SeasonIcon";
import BrandIcon from "../../../../../shared/components/Icons/BrandIcon";
import ResetIcon from "../../../../../shared/components/Icons/ResetIcon";
import StuddedTireIcon from "../../../../../shared/components/Icons/StuddedTireIcon";
import { PayloadAction } from "typesafe-actions";
import { PayloadAction as PayloadActionRedux } from "@reduxjs/toolkit";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";

const FilterShortMenuContainer = () => {
  const dispatch = useDispatch();
  const selectWidth = useSelector(selectSelectedWidth);
  const selectProfile = useSelector(selectSelectedProfile);
  const selectDiametr = useSelector(selectSelectedDiametr);
  const selectedPrice = useSelector(selectSelectedPrice);
  const selectedSeason = useSelector(selectSelectedSeason);
  const selectedBrand = useSelector(selectSelectedBrand);
  const selectedStudded = useSelector(selectSelectedStudded);
  const filtersParams = useSelector(selectFilterData());
  const minPrice = Math.min(...filtersParams.prices);
  const maxPrice = Math.max(...filtersParams.prices);
  const history = useNavigate();

  useEffect(() => {
    const isFilterBackToInitial =
      selectWidth.length === 0 &&
      selectProfile.length === 0 &&
      selectDiametr.length === 0 &&
      selectedSeason.length === 0 &&
      selectedBrand.length === 0 &&
      selectedStudded.length === 0 &&
      selectedPrice[0] === minPrice &&
      selectedPrice[1] === maxPrice;

    if (isFilterBackToInitial) {
      history("/shop", { replace: true });
    } else {
      history(
        `?price=${JSON.stringify([
          selectedPrice[0],
          selectedPrice[1],
        ])}&width=${JSON.stringify(selectWidth)}&profile=${JSON.stringify(
          selectProfile
        )}&diametr=${JSON.stringify(selectDiametr)}&season=${JSON.stringify(
          selectedSeason
        )}&brand=${JSON.stringify(selectedBrand)}&studded=${JSON.stringify(
          selectedStudded
        )}`,
        { replace: true }
      );
    }
  }, [
    history,
    selectDiametr,
    selectProfile,
    selectWidth,
    selectedBrand,
    selectedPrice,
    selectedSeason,
    selectedStudded,
    minPrice,
    maxPrice,
  ]);

  const visableResetButton =
    selectedPrice[0] !== minPrice ||
    selectedPrice[1] !== maxPrice ||
    selectWidth.length > 0 ||
    selectProfile.length > 0 ||
    selectDiametr.length > 0 ||
    selectedSeason.length > 0 ||
    selectedBrand.length > 0 ||
    selectedStudded.length > 0;

  function handleClearRowsFilters() {
    return (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      filterAction: () => PayloadAction<string, void>
    ) => {
      e.stopPropagation();
      dispatch(filterAction());
    };
  }

  function handleClearPrice(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    dispatch(actions.initializePriceRange([minPrice, maxPrice]));
  }

  function handleClearColumnFilters<T>(
    filterItems: T[],
    itemToRemove: T,
    updateAction: (updatedItems: T[]) => PayloadActionRedux<T[]>
  ) {
    return () => {
      const updatedItems = filterItems.filter((item) => item !== itemToRemove);
      dispatch(updateAction(updatedItems));
    };
  }

  function handleCleareAllFilters() {
    dispatch(actions.setClearSelectedWidth());
    dispatch(actions.setClearSelectedProfile());
    dispatch(actions.setClearSelectedDiametr());
    dispatch(actions.initializePriceRange([minPrice, maxPrice]));
    dispatch(actions.setResetSeason());
    dispatch(actions.setResetBrand());
    dispatch(actions.setResetStudded());
  }

  return (
    <ButtonGroup
      orientation="vertical"
      fullWidth
      variant="outlined"
      aria-label="vertical contained button group"
    >
      <FilterShortMenuRow
        icon={<WidthIcon />}
        filterName="Width"
        params={selectWidth}
        onClick={(e) =>
          handleClearRowsFilters()(e, actions.setClearSelectedWidth)
        }
      />
      <FilterShortMenuRow
        icon={<ProfileIcon />}
        filterName="Profile"
        params={selectProfile}
        onClick={(e) =>
          handleClearRowsFilters()(e, actions.setClearSelectedProfile)
        }
      />
      <FilterShortMenuRow
        icon={<DiametrIcon />}
        filterName="Diametr"
        params={selectDiametr}
        onClick={(e) =>
          handleClearRowsFilters()(e, actions.setClearSelectedDiametr)
        }
      />
      <FilterShortMenuColumnPrice
        icon={<PriceIcon />}
        filterName="Price"
        params={selectedPrice}
        onClick={handleClearPrice}
      />
      <FilterShortMenuColumn
        icon={<SeasonIcon />}
        filterName="Season"
        params={selectedSeason}
        onClick={(param) =>
          handleClearColumnFilters(
            selectedSeason,
            param,
            actions.setSeasonChange
          )()
        }
      />
      <FilterShortMenuColumn
        icon={<BrandIcon />}
        filterName="Brand"
        params={selectedBrand}
        onClick={(param) =>
          handleClearColumnFilters(
            selectedBrand,
            param,
            actions.setBrandChange
          )()
        }
      />
      <FilterShortMenuColumn
        icon={<StuddedTireIcon />}
        filterName="Studded"
        params={selectedStudded}
        onClick={(param) =>
          handleClearColumnFilters(
            selectedStudded,
            param,
            actions.setStuddedChange
          )()
        }
      />
      {visableResetButton && (
        <FilterShortMenuReset
          icon={<ResetIcon />}
          onClick={handleCleareAllFilters}
        />
      )}
    </ButtonGroup>
  );
};

export default FilterShortMenuContainer;
