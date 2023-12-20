import React, { useCallback } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
} from '@mui/material';
import { BASE_COLORS, FILTER_COLORS, FONTS } from '../../../shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectSortParams } from '../selectors';
import { actions } from '../reducer';
import { useTranslation } from 'react-i18next';

const StyledFormControl = styled(FormControl)({
  marginTop: '-44px',
  '& .MuiInput-underline:after': {
    borderBottomColor: BASE_COLORS.DEFAULT_BLUE,
  },
  '& .MuiInputBase-input': {
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
    backgroundColor: 'transparent !important',
  },
});

const StyledInputLabel = styled(InputLabel)({
  color: BASE_COLORS.DEFAULT_GREY,
  fontFamily: FONTS.MAIN_TEXT_FAMILY,
  '&.Mui-focused': {
    color: BASE_COLORS.DEFAULT_BLUE,
  },
});

export function ShopHeaderSort() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sortParams = useSelector(selectSortParams());

  const handleChangeSetBy = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(
        actions.setSortParams({
          ...sortParams,
          showBy: +event.target.value,
        }),
      );
    },
    [dispatch, sortParams],
  );
  const handleChangeSortBy = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(
        actions.setSortParams({
          ...sortParams,
          sortBy: event.target.value,
        }),
      );
    },
    [dispatch, sortParams],
  );

  return (
    <Stack justifyContent="space-between" direction="row" width="25%">
      <Stack alignItems="center" width="40%" gap="10px" direction="row">
        <StyledFormControl
          size="small"
          variant="standard"
          sx={{
            minWidth: 180,
          }}>
          <StyledInputLabel>{t('sortBy')}</StyledInputLabel>
          <Select
            defaultValue={'rated'}
            onChange={handleChangeSortBy}
            MenuProps={{
              sx: {
                '.MuiMenuItem-root': {
                  fontFamily: FONTS.MAIN_TEXT_FAMILY,
                },
                '.MuiMenuItem-root:hover': {
                  backgroundColor: FILTER_COLORS.DEFAULT_BLUE_INACTIVE,
                },
                '.MuiMenuItem-root.Mui-selected': {
                  backgroundColor: `${BASE_COLORS.DEFAULT_BLUE} !important`,
                  color: `${BASE_COLORS.BACKGROUND_WHITE} !important`,
                },
                '.MuiMenuItem-root.Mui-selected:hover': {
                  backgroundColor: `${FILTER_COLORS.DEFAULT_BLUE_INACTIVE} `,
                  color: `${FILTER_COLORS.TEXT_MAIN} `,
                },
              },
            }}>
            <MenuItem value={'rated'}>{t('rated')}</MenuItem>
            <MenuItem value={'date'}>{t('date')}</MenuItem>
            <MenuItem value={'priceHigh'}>{t('priceHigh')}</MenuItem>
            <MenuItem value={'priceLow'}>{t('priceLow')}</MenuItem>
          </Select>
        </StyledFormControl>
      </Stack>
      <Stack alignItems="center" width="40%" gap="10px" direction="row">
        <StyledFormControl
          size="small"
          variant="standard"
          sx={{ minWidth: 120 }}>
          <StyledInputLabel
            sx={{
              color: BASE_COLORS.DEFAULT_GREY,
            }}>
            Set
          </StyledInputLabel>
          <Select
            value={sortParams.showBy.toString()}
            onChange={handleChangeSetBy}
            label="ShowBy"
            MenuProps={{
              sx: {
                '.MuiMenuItem-root': {
                  fontFamily: FONTS.MAIN_TEXT_FAMILY,
                },
                '.MuiMenuItem-root:hover': {
                  backgroundColor: FILTER_COLORS.DEFAULT_BLUE_INACTIVE,
                },
                '.MuiMenuItem-root.Mui-selected': {
                  backgroundColor: `${BASE_COLORS.DEFAULT_BLUE} !important`,
                  color: `${BASE_COLORS.BACKGROUND_WHITE} !important`,
                },
                '.MuiMenuItem-root.Mui-selected:hover': {
                  backgroundColor: `${FILTER_COLORS.DEFAULT_BLUE_INACTIVE} `,
                  color: `${FILTER_COLORS.TEXT_MAIN} `,
                },
              },
            }}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </StyledFormControl>
      </Stack>
    </Stack>
  );
}
