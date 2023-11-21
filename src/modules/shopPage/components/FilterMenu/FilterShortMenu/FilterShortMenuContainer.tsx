import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../reducer";
import {
  selectSelectedBrand,
  selectSelectedDiametr,
  selectSelectedPrice,
  selectSelectedProfile,
  selectSelectedSeason,
  selectSelectedWidth,
} from "../../../selectors";
import { selectFilterData } from "../../../../mainPage/selectors";

import FilterShortMenuRow from "./FilterShortMenuRow";
import FilterShortMenuColumnPrice from "./FilterShortMenuColumnPrice";
import FilterShortMenuColumn from "./FilterShortMenuColumn";
import FilterShortMenuReset from "./FilterShortMenuReset";

import { ButtonGroup } from "@mui/material";

import WidthIcon from "../../../../../shared/components/Icons/WidthIcon";
import ProfileIcon from "../../../../../shared/components/Icons/ProfileIcon";
import DiametrIcon from "../../../../../shared/components/Icons/DiametrIcon";
import PriceIcon from "../../../../../shared/components/Icons/PriceIcon";
import SeasonIcon from "../../../../../shared/components/Icons/SeasonIcon";
import BrandIcon from "../../../../../shared/components/Icons/BrandIcon";
import ResetIcon from "../../../../../shared/components/Icons/ResetIcon";

const FilterShortMenuContainer = () => {
  const dispatch = useDispatch();
  const selectWidth = useSelector(selectSelectedWidth);
  const selectProfile = useSelector(selectSelectedProfile);
  const selectDiametr = useSelector(selectSelectedDiametr);
  const selectedPrice = useSelector(selectSelectedPrice);
  const selectedSeason = useSelector(selectSelectedSeason);
  const selectedBrand = useSelector(selectSelectedBrand);
  const filtersParams = useSelector(selectFilterData());
  const minPrice = Math.min(...filtersParams.prices);
  const maxPrice = Math.max(...filtersParams.prices);

  const visableResetButton =
    selectedPrice[0] !== minPrice ||
    selectedPrice[1] !== maxPrice ||
    selectWidth.length > 0 ||
    selectProfile.length > 0 ||
    selectDiametr.length > 0 ||
    selectedSeason.length > 0 ||
    selectedBrand.length > 0;

  function handleClearSelectedWidth(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();
    dispatch(actions.setClearSelectedWidth());
  }

  function handleClearSelectedProfile(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();
    dispatch(actions.setClearSelectedProfile());
  }

  function handleClearSelectedDiametr(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();
    dispatch(actions.setClearSelectedDiametr());
  }

  function handleClearPrice(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();
    dispatch(actions.initializePriceRange([minPrice, maxPrice]));
  }

  function handleRemoveSeason(seasonToRemove: string) {
    const updatedSeasons = selectedSeason.filter((s) => s !== seasonToRemove);
    dispatch(actions.setSeasonChange(updatedSeasons));
  }

  function handleRemoveBrand(brandToRemove: string) {
    const updatedBrands = selectedBrand.filter((s) => s !== brandToRemove);
    dispatch(actions.setBrandChange(updatedBrands));
  }

  function handleCleareAllFilters() {
    dispatch(actions.setClearSelectedWidth());
    dispatch(actions.setClearSelectedProfile());
    dispatch(actions.setClearSelectedDiametr());
    dispatch(actions.initializePriceRange([minPrice, maxPrice]));
    dispatch(actions.setResetSeason());
    dispatch(actions.setResetBrand());
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
        onClick={handleClearSelectedWidth}
      ></FilterShortMenuRow>
      <FilterShortMenuRow
        icon={<ProfileIcon />}
        filterName="Profile"
        params={selectProfile}
        onClick={handleClearSelectedProfile}
      ></FilterShortMenuRow>
      <FilterShortMenuRow
        icon={<DiametrIcon />}
        filterName="Diametr"
        params={selectDiametr}
        onClick={handleClearSelectedDiametr}
      ></FilterShortMenuRow>
      <FilterShortMenuColumnPrice
        icon={<PriceIcon />}
        filterName="Price"
        params={selectedPrice}
        onClick={handleClearPrice}
      ></FilterShortMenuColumnPrice>
      <FilterShortMenuColumn
        icon={<SeasonIcon />}
        filterName="Season"
        params={selectedSeason}
        onClick={handleRemoveSeason}
      ></FilterShortMenuColumn>
      <FilterShortMenuColumn
        icon={<BrandIcon />}
        filterName="Brand"
        params={selectedBrand}
        onClick={handleRemoveBrand}
      ></FilterShortMenuColumn>
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
