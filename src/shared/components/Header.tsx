import {
  EmailOutlined,
  Language,
  MapsHomeWorkOutlined,
  TimerOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { TypographyWithIcon } from '../../modules/mainPage/components/TypographyWithIcon';
import { BASE_COLORS } from '../constants';
import { useTranslation } from 'react-i18next';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import i18next, { use } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartModalWindowOpen,
  selectCartItemCount,
  selectShopItemsList,
} from '../../modules/shopPage/selectors';
import { actions } from '../../modules/shopPage/reducer';
import CartModalWindow from './CartModalWindow';

export function Header() {
  const dispatch = useDispatch();
  const cartItemCount = useSelector(selectCartItemCount);
  const cartModalWindowOpen = useSelector(selectCartModalWindowOpen);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const currentLanguageCode = localStorage.getItem('i18nextLng') || 'en';
  const languages = [
    {
      code: 'en',
      name: 'English',
    },
    {
      code: 'ru',
      name: 'Русский',
    },
    {
      code: 'ua',
      name: 'Українська',
    },
  ];

  useEffect(() => {
    const cartItemsCountFromStorage = JSON.parse(
      localStorage.getItem('cartItem') || '[]',
    ).length;

    dispatch(actions.setCartItemCount(cartItemsCountFromStorage));
  }, [dispatch, cartItemCount, cartModalWindowOpen]);

  useEffect(() => {
    dispatch(actions.getShopItems(''));
  }, [dispatch]);

  const handleLanguageClick = useCallback((event: SyntheticEvent) => {
    setAnchorEl(event.target as HTMLElement);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box width="100%" display="flex" flexDirection="column" overflow="hidden">
      <Box
        bgcolor={BASE_COLORS.DEFAULT_BLUE}
        display="flex"
        flexDirection="row"
        gap="40px"
        width="100%"
        padding="11px 11px 11px 80px">
        <TypographyWithIcon
          icon={<EmailOutlined sx={{ fill: '#FFF', width: '20px' }} />}
          typography={
            <Typography
              fontFamily="PT Sans,  sans-serif"
              color="#FFFFFF"
              variant="body2">
              {' '}
              topkolesa@gmail.com{' '}
            </Typography>
          }
        />
        <TypographyWithIcon
          icon={<MapsHomeWorkOutlined sx={{ fill: '#FFF', width: '20px' }} />}
          typography={
            <Typography
              fontFamily="PT Sans,  sans-serif"
              color="#FFFFFF"
              variant="body2">
              {`${t('headerCity')}, ${t('headerAddress')} / ${t(
                'headerAddress2',
              )}`}
            </Typography>
          }
        />
        <TypographyWithIcon
          icon={<TimerOutlined sx={{ fill: '#FFF', width: '20px' }} />}
          typography={
            <Typography
              fontFamily="PT Sans,  sans-serif"
              color="#FFFFFF"
              variant="body2">
              {t('workHours')}
            </Typography>
          }
        />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        gap="20px"
        width="92%"
        padding="30px 4%"
        alignItems="center"
        justifyContent="space-between">
        <Link href="/">
          <img src="./logo.png" alt="logo"></img>
        </Link>
        <Stack display="flex" flexDirection="row" gap="15px">
          <Link underline="none" href="/" sx={{ color: '#000' }}>
            {t('homeLabel')}
          </Link>
          <Link underline="none" href="/shop" sx={{ color: '#000' }}>
            {t('shopLabel')}
          </Link>
          <Link underline="none" href="/about" sx={{ color: '#000' }}>
            {t('aboutLabel')}
          </Link>
          <Link underline="none" href="/contact" sx={{ color: '#000' }}>
            {t('contactLabel')}
          </Link>
        </Stack>
        <Stack alignItems="center" direction="row" gap={'1rem'}>
          <Box display="flex" flexDirection="row">
            <IconButton
              onClick={() =>
                dispatch(actions.setCartModalWindowOpen(!cartModalWindowOpen))
              }
              aria-label="cart"
              sx={{
                marginRight: cartModalWindowOpen ? '0px' : '1rem',
              }}>
              <Badge
                badgeContent={cartItemCount}
                sx={{
                  color: '#FFF',
                  '& .MuiBadge-badge': {
                    backgroundColor: BASE_COLORS.DEFAULT_BLUE,
                  },
                }}>
                <ShoppingCartOutlinedIcon sx={{ color: '#000' }} />
              </Badge>
            </IconButton>
          </Box>
          {cartModalWindowOpen && <CartModalWindow />}
          <Button
            onClick={(event) => handleLanguageClick(event)}
            sx={{ color: '#000' }}>
            {' '}
            <Language sx={{ marginRight: '10px' }} />
            {currentLanguageCode}
          </Button>
          <Menu
            open={!!anchorEl}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}>
            {languages.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  handleClose();
                  i18next.changeLanguage(item.code);
                }}
                sx={{ color: '#000' }}>
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Box>
    </Box>
  );
}
