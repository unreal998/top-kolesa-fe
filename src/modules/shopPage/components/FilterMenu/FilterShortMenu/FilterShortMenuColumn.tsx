import { useDispatch } from 'react-redux';
import { actions } from '../../../reducer';

import ClearIcon from '@mui/icons-material/Clear';
import { Button, styled, Box, ButtonGroup, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import {
  FILTER_COLORS,
  FONTS,
  BASE_COLORS,
} from '../../../../../shared/constants';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

const StyledButtonMain = styled(Button)({
  display: 'flex',
  padding: '0 0 0 12px',
  boxSizing: 'border-box',
  alignItems: 'center',
  fontWeight: '600',
  height: '3.7rem',
  width: '16rem',
  borderRadius: 0,
  borderColor: FILTER_COLORS.BORDER,
  color: FILTER_COLORS.TEXT_SHORT_MENU,
  fontFamily: FONTS.BOLD_TEXT_FAMILY,
  borderTop: 'none',
  '& span': {
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
    fontWeight: '400',
    fontSize: '10px',
    transition: 'color 0.2s ease',
  },
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: FILTER_COLORS.BORDER,
    borderTop: 'none',
  },
  '&:active': {
    backgroundColor: 'transparent',
    borderColor: FILTER_COLORS.BORDER,
    borderTop: 'none',
  },
});

const StyledButtonSecondary = styled(Button)({
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'flex-start',
  padding: 0,
  borderRadius: 0,
  borderColor: FILTER_COLORS.BORDER,
  color: FILTER_COLORS.TEXT_SHORT_MENU,
  fontFamily: FONTS.BOLD_TEXT_FAMILY,
  cursor: 'default',
  borderTop: 'none',
  borderBottom: 'none',

  '& p': {
    color: FILTER_COLORS.TEXT_MAIN,
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
    textTransform: 'none',
  },
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: FILTER_COLORS.BORDER,
    borderTop: 'none',
    borderBottom: 'none',
  },
  '&:active': {
    backgroundColor: 'transparent',
    borderColor: FILTER_COLORS.BORDER,
    boxShadow: 'none',
    borderTop: 'none',
    borderBottom: 'none',
  },
});

type FilterShortMenuColumnProps = {
  filterName: string;
  icon: React.ReactNode;
  params: string[] | string;
  onClick: (param: string) => void;
};

function FilterShortMenuColumn({
  icon,
  filterName,
  params,
  onClick,
}: FilterShortMenuColumnProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const visableParams =
    params.length > 0 && (params.length > 1 || params[0] !== '');
  const checkArr = Array.isArray(params) ? params : [params];

  const handleMenuToggle = () => {
    let tabIndex;
    switch (filterName) {
      case 'Season':
        tabIndex = 1;
        break;
      case 'Brand':
        tabIndex = 5;
        break;
      case 'Vechile Type':
        tabIndex = 6;
        break;
      default:
        tabIndex = 7;
    }
    dispatch(actions.toggleFullMenu(tabIndex));
  };

  const getFilterName = useCallback((filterName: string) => {
    switch (filterName) {
      case 'Season':
        return t('season');
      case 'Brand':
        return t('brand');
      case 'Studded':
        return t('studdedFilterName');
      case 'Vechile Type':
        return t('vechileType');
      default:
        console.error('Unknown filter name');
    }
  }, []);

  function getTextParam(param: string) {
    switch (param) {
      case 'winter':
        return t('winter');
      case 'summer':
        return t('summer');
      case 'all-season':
        return t('all-season');
      case 'light':
        return t('light');
      case 'lightTruck':
        return t('lightTruck');
      case 'cargo':
        return t('cargo');
      default:
        return param;
    }
  }

  return (
    <ButtonGroup
      orientation="vertical"
      fullWidth
      variant="outlined"
      aria-label="vertical contained button group"
      sx={{
        borderTop: 'none',
        borderBottom: visableParams
          ? `1px solid ${FILTER_COLORS.BORDER}`
          : 'none',
        borderRadius: 0,
        '&:hover': {
          borderTop: 'none',
        },
      }}>
      <StyledButtonMain
        onClick={handleMenuToggle}
        sx={{
          borderBottom: visableParams
            ? 'none'
            : `1px solid ${FILTER_COLORS.BORDER}`,
          '&:hover': {
            borderBottom: visableParams
              ? 'none'
              : `1px solid ${FILTER_COLORS.BORDER}`,
          },
          '&:active': {
            borderBottom: visableParams
              ? 'none'
              : `1px solid ${FILTER_COLORS.BORDER}`,
          },
        }}>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              color: visableParams
                ? BASE_COLORS.DEFAULT_BLUE
                : FILTER_COLORS.TEXT_SHORT_MENU,
              transition: 'color 0.2s ease',
            }}>
            {icon}
          </Box>
          <Typography
            variant="body1"
            fontFamily={FONTS.BOLD_TEXT_FAMILY}
            fontWeight={600}
            style={{
              marginLeft: `${filterName === 'Brand' ? '12px' : '16px'}`,
              color: visableParams
                ? BASE_COLORS.DEFAULT_BLUE
                : FILTER_COLORS.TEXT_SHORT_MENU,
              transition: 'color 0.2s ease',
            }}>
            {getFilterName(filterName)}
          </Typography>
        </Box>
        <ArrowForwardIosIcon sx={{ height: '20px' }} />
      </StyledButtonMain>
      {visableParams &&
        checkArr
          .filter((param) => param !== '')
          .map((param) => (
            <StyledButtonSecondary
              key={param}
              disableRipple={true}
              sx={{
                borderTop: visableParams
                  ? 'none'
                  : `1px solid ${FILTER_COLORS.BORDER}`,
                '&:hover': {
                  borderTop: visableParams
                    ? 'none'
                    : `1px solid ${FILTER_COLORS.BORDER}`,
                },
                '&:active': {
                  borderTop: visableParams
                    ? 'none'
                    : `1px solid ${FILTER_COLORS.BORDER}`,
                },
              }}>
              {
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ padding: '0 12px' }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      padding: '1px',
                      color: 'red',
                      cursor: 'pointer',
                      borderRadius: '50%',
                      transition: 'all 0.5s',
                      '&:hover': {
                        backgroundColor: FILTER_COLORS.BACKGROUND_GREY,
                        transition: 'all 0.3s',
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onClick(param);
                    }}>
                    <ClearIcon fontSize="inherit" />
                  </Box>
                  {filterName === 'Season' && (
                    <Typography variant="body2">
                      {getTextParam(param)}
                    </Typography>
                  )}
                  {filterName === 'Studded' && (
                    <Typography variant="body2">
                      {param === 'studded' ? t('studded') : t('studless')}
                    </Typography>
                  )}
                  {filterName === 'Vechile Type' && (
                    <Typography variant="body2">
                      {getTextParam(param)}
                    </Typography>
                  )}
                  {filterName !== 'Studded' &&
                    filterName !== 'Season' &&
                    filterName !== 'Vechile Type' && (
                      <Typography variant="body2">{param}</Typography>
                    )}
                </Box>
              }
            </StyledButtonSecondary>
          ))}
    </ButtonGroup>
  );
}

export default FilterShortMenuColumn;
