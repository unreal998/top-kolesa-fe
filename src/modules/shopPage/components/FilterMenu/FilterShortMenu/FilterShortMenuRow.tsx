import { useDispatch } from 'react-redux';
import { actions } from '../../../reducer';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, styled, Box, Typography } from '@mui/material';

import {
  FILTER_COLORS,
  FONTS,
  BASE_COLORS,
} from '../../../../../shared/constants';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

const StyledButton = styled(Button)({
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
  position: 'relative',
  borderTop: 'none',
  borderBottom: 'none',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    borderTop: `1px solid ${FILTER_COLORS.BORDER}`,
    transition: 'transform 0.2s ease',
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
    borderTop: 'none',
    borderBottom: 'none',
  },
});

type FilterShortMenuRowProps = {
  filterName: 'Width' | 'Profile' | 'Diametr' | 'Vechile Type';
  icon: React.ReactNode;
  params: string;
  onClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void | undefined | string;
};

function FilterShortMenuRow({
  icon,
  filterName,
  params,
  onClick,
}: FilterShortMenuRowProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleMenuToggle = () => {
    let tabIndex;
    switch (filterName) {
      case 'Width':
        tabIndex = 2;
        break;
      case 'Profile':
        tabIndex = 3;
        break;
      case 'Diametr':
        tabIndex = 4;
        break;
    }
    dispatch(actions.toggleFullMenu(tabIndex));
  };

  const setFilterName = useCallback(
    (filterName: string) => {
      switch (filterName) {
        case 'Width':
          return t('width');
        case 'Profile':
          return t('profile');
        case 'Diametr':
          return t('diametr');
        case 'Vechile Type':
          return t('vechileType');
        default:
          throw new Error('Unknown filter param');
      }
    },
    [filterName],
  );

  return (
    <StyledButton onClick={handleMenuToggle}>
      <Box
        display="flex"
        alignItems="center"
        sx={{ flexGrow: 1 }}
        color={
          params && params.length > 0
            ? BASE_COLORS.DEFAULT_BLUE
            : FILTER_COLORS.TEXT_SHORT_MENU
        }>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            transition: 'color 0.2s ease',
          }}>
          {icon}
        </Box>
        <Typography
          variant="body1"
          fontFamily={FONTS.BOLD_TEXT_FAMILY}
          fontWeight={600}
          style={{
            marginLeft: `${
              filterName === 'Width'
                ? '10px'
                : filterName === 'Profile'
                ? '11px'
                : '13px'
            }`,
          }}>
          {setFilterName(filterName)}
        </Typography>
      </Box>
      {params.length > 0 && (
        <Box display={'flex'}>
          <Typography
            fontFamily={FONTS.MAIN_TEXT_FAMILY}
            pt={'2px'}
            fontWeight={'400'}
            fontSize={'1rem'}
            color={'#000'}>
            {params}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            color={FILTER_COLORS.BUTTON_RESET_FILTER}
            p={0.1}
            borderRadius={'50%'}
            sx={{
              transition: 'all 0.5s',
              '&:hover': {
                backgroundColor: FILTER_COLORS.BACKGROUND_GREY,
                transition: 'all 0.3s',
              },
            }}
            onClick={onClick}>
            <ClearIcon sx={{ padding: '1px' }} />
          </Box>
        </Box>
      )}
      <ArrowForwardIosIcon sx={{ height: '20px' }} />
    </StyledButton>
  );
}

export default FilterShortMenuRow;
