import { useDispatch, useSelector } from 'react-redux';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { actions } from '../../../reducer';
import {
  selectSelectedBrand,
  selectSelectedDiametr,
  selectSelectedPrice,
  selectSelectedProfile,
  selectSelectedSeason,
  selectSelectedStudded,
  selectSelectedVechileType,
  selectSelectedWidth,
} from '../../../selectors';
import { selectFilterData } from '../../../../mainPage/selectors';

import FilterShortMenuRow from './FilterShortMenuRow';
import FilterShortMenuColumnPrice from './FilterShortMenuColumnPrice';
import FilterShortMenuColumn from './FilterShortMenuColumn';
import FilterShortMenuReset from './FilterShortMenuReset';

import { ButtonGroup } from '@mui/material';

import WidthIcon from '../../../../../shared/components/Icons/WidthIcon';
import ProfileIcon from '../../../../../shared/components/Icons/ProfileIcon';
import DiametrIcon from '../../../../../shared/components/Icons/DiametrIcon';
import PriceIcon from '../../../../../shared/components/Icons/PriceIcon';
import SeasonIcon from '../../../../../shared/components/Icons/SeasonIcon';
import BrandIcon from '../../../../../shared/components/Icons/BrandIcon';
import ResetIcon from '../../../../../shared/components/Icons/ResetIcon';
import StuddedTireIcon from '../../../../../shared/components/Icons/StuddedTireIcon';
import { PayloadAction } from 'typesafe-actions';
import { PayloadAction as PayloadActionRedux } from '@reduxjs/toolkit';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';

const FilterShortMenuContainer = () => {
  const dispatch = useDispatch();
  const selectWidth = useSelector(selectSelectedWidth);
  const selectProfile = useSelector(selectSelectedProfile);
  const selectDiametr = useSelector(selectSelectedDiametr);
  const selectedPrice = useSelector(selectSelectedPrice);
  const selectedSeason = useSelector(selectSelectedSeason);
  const selectedBrand = useSelector(selectSelectedBrand);
  const selectedStudded = useSelector(selectSelectedStudded);
  const selectedVechileType = useSelector(selectSelectedVechileType);
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
      selectedPrice[1] === maxPrice &&
      selectedVechileType === '';

    if (isFilterBackToInitial) {
      history('/shop', { replace: true });
    } else {
      history(
        `?price=${JSON.stringify([
          selectedPrice[0],
          selectedPrice[1],
        ])}&width=${JSON.stringify(selectWidth)}&profile=${JSON.stringify(
          selectProfile,
        )}&diametr=${JSON.stringify(selectDiametr)}&season=${JSON.stringify(
          selectedSeason,
        )}&brand=${JSON.stringify(
          selectedBrand,
        )}&studded=${selectedStudded}&vechileType=${selectedVechileType}`,
        { replace: true },
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
    selectedVechileType,
    minPrice,
    maxPrice,
  ]);

  const visableResetButton =
    selectedPrice[0] !== minPrice ||
    selectedPrice[1] !== maxPrice ||
    selectWidth.length > 0 ||
    selectProfile.length > 0 ||
    selectDiametr.length > 0 ||
    (selectedSeason.length > 0 &&
      (selectedSeason.length > 1 || selectedSeason[0] !== '')) ||
    (selectedBrand.length > 0 &&
      (selectedBrand.length > 1 || selectedBrand[0] !== '')) ||
    selectedStudded.length > 0 ||
    selectedVechileType !== '';

  const handleClearRowsFilters = () => {
    return (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      filterAction: () => PayloadAction<string, void | string>,
    ) => {
      e.stopPropagation();
      dispatch(filterAction());
    };
  };

  const handleClearPrice = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      dispatch(actions.initializePriceRange([minPrice, maxPrice]));
    },
    [dispatch, minPrice, maxPrice],
  );

  const handleClearColumnFilters = useCallback(
    (
      filterItems: string[] | string,
      itemToRemove: string,
      updateAction: any,
    ) => {
      return () => {
        if (Array.isArray(filterItems)) {
          const updatedItems = filterItems.filter(
            (item) => item !== itemToRemove,
          );
          dispatch(updateAction(updatedItems));
        } else {
          dispatch(updateAction(''));
        }
      };
    },
    [dispatch],
  );

  function handleCleareAllFilters() {
    dispatch(actions.setClearSelectedWidth());
    dispatch(actions.setClearSelectedProfile());
    dispatch(actions.setClearSelectedDiametr());
    dispatch(actions.initializePriceRange([minPrice, maxPrice]));
    dispatch(actions.setResetSeason());
    dispatch(actions.setResetBrand());
    dispatch(actions.setResetStudded());
    dispatch(actions.setVechileTypeChange(''));
  }

  return (
    <ButtonGroup
      orientation="vertical"
      fullWidth
      variant="outlined"
      sx={{
        '@media (max-width: 918px)': {
          display: 'none',
        },
      }}>
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
            actions.setSeasonChange,
          )()
        }
      />
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
      <FilterShortMenuColumn
        icon={<BrandIcon />}
        filterName="Brand"
        params={selectedBrand}
        onClick={(param) =>
          handleClearColumnFilters(
            selectedBrand,
            param,
            actions.setBrandChange,
          )()
        }
      />
      <FilterShortMenuColumn
        icon={<DriveEtaIcon />}
        filterName="Vechile Type"
        params={selectedVechileType}
        onClick={() => dispatch(actions.setVechileTypeChange(''))}
      />
      <FilterShortMenuColumn
        icon={<StuddedTireIcon />}
        filterName="Studded"
        params={selectedStudded}
        onClick={(param) =>
          handleClearColumnFilters(
            selectedStudded,
            param,
            actions.setStuddedChange,
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
