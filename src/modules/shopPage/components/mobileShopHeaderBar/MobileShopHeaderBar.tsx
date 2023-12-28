import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import {
  BASE_COLORS,
  FILTER_COLORS,
  FONTS,
} from '../../../../shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectCardView, selectSortParams } from '../../selectors';
import { useCallback, useRef, useState } from 'react';
import { actions } from '../../reducer';
import styled from '@emotion/styled';
import { Apps, FormatAlignJustify } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import SortIcon from '@mui/icons-material/Sort';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Show } from './Show';
import { SortBy } from './SortBy';
import { Filter } from './Filter';

const ViewButton = styled(Box)({
  backgroundColor: BASE_COLORS.BACKGROUND_WHITE,
  padding: '10px',
  paddingBottom: '7px',
  borderRadius: '7px',
  '&.isSelected': {
    cursor: 'pointer',
    backgroundColor: BASE_COLORS.DEFAULT_BLUE,
    color: '#fff',
  },
});

export function MobileShopHeaderBar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cardView = useSelector(selectCardView);
  const sortParams = useSelector(selectSortParams());
  const [openFilter, setOpenFilter] = useState({
    left: false,
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      event.stopPropagation();
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpenFilter({ left: open });
    };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSortBy = useCallback(
    (value: string) => {
      dispatch(
        actions.setSortParams({
          ...sortParams,
          sortBy: value,
        }),
      );
      handleClose();
    },
    [dispatch, sortParams],
  );

  const handleCardViewChange = useCallback(() => {
    dispatch(actions.setCardView(false));
  }, []);

  const handleTableViewChange = useCallback(() => {
    dispatch(actions.setCardView(true));
  }, []);

  const menueItemData = [
    {
      value: 'rated',
      label: t('rated'),
    },
    {
      value: 'date',
      label: t('date'),
    },
    {
      value: 'priceHigh',
      label: t('priceHigh'),
    },
    {
      value: 'priceLow',
      label: t('priceLow'),
    },
  ];

  return (
    <Box
      width="100%"
      height={'4rem'}
      bgcolor={BASE_COLORS.DEFAULT_BLUE}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-around'}
      color={'white'}
      sx={{
        '@media (min-width: 919px)': {
          display: 'none',
        },
      }}>
      <Box>
        <Filter />
      </Box>
      <Box>
        <SortBy />
      </Box>
      <Box>
        <Show />
      </Box>
    </Box>
  );
}
