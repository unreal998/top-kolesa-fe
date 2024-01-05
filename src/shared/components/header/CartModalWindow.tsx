import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartModalWindowOpen,
  selectShopItemsList,
} from '../../../modules/shopPage/selectors';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
  styled,
} from '@mui/material';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { CartItem } from './CartItem';
import { CartItemData } from '../../types';
import { actions } from '../../../modules/shopPage/reducer';
import { ShopItemAPI } from '../../../shared/types';
import { SHOP_ITEM_TIRES_IMG_PREFIX } from '../../../constants';
import { BASE_COLORS, FILTER_COLORS, FONTS } from '../../constants';
import EmptyCart from './EmptyCart';
import { useNavigate } from 'react-router-dom';
import useLocalStorageItem from '../../../hooks/useLocalStorageWatcher';

const StyledCartModalWindow = styled(Box)({
  width: '25vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: '100%',
  '@media (max-width: 1600px)': { width: '33vw' },
  '@media (max-width: 1100px)': { width: '40vw' },
  '@media (max-width: 950px)': { width: '50vw' },
  '@media (max-width: 600px)': { width: '100vw' },
});

const StyledButton = styled(Button)({
  width: '100%',
  fontFamily: FONTS.BOLD_TEXT_FAMILY,
  fontWeight: 'bold',
  background: BASE_COLORS.DEFAULT_BLUE,
  '&:hover': {
    background: BASE_COLORS.DEFAULT_BLUE,
  },
  '@media (max-width: 600px)': {
    fontSize: '14px',
  },
});

export default function CartModalWindow() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartModalWindowOpen = useSelector(selectCartModalWindowOpen);
  const shopItemsList = useSelector(selectShopItemsList());
  const history = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const cartItems = useLocalStorageItem('cartItem');

  useEffect(() => {
    setOpenDrawer(cartModalWindowOpen);
  }, [cartModalWindowOpen]);

  const cartItemDetails = cartItems.map((cartItem: CartItemData) => {
    const item = shopItemsList.find(
      (item: ShopItemAPI) => item.id === cartItem.tireId,
    );
    return {
      ...cartItem,
      fullName: `${item?.brand} ${item?.name} ${item?.width}/${item?.height} R${item?.diametr}`,
      price: item?.price_uah,
      article: item?.id,
      image: item
        ? `${SHOP_ITEM_TIRES_IMG_PREFIX}${item.image_file}`
        : './imgs/noPhotoImg.jpg',
    };
  });

  const totalAmount = cartItems.reduce(
    (total: number, cartItem: CartItemData) => {
      const item = shopItemsList.find((item) => item.id === cartItem.tireId);
      return total + (item ? item.price_uah * cartItem.numberOfTires : 0);
    },
    0,
  );

  const handleGoToCheckout = useCallback(() => {
    history(`/checkout`, { replace: true });
    dispatch(actions.setCartModalWindowOpen(!cartModalWindowOpen));
  }, [history]);

  const handleCloseCartModalWindow = () => {
    dispatch(actions.setCartModalWindowOpen(!cartModalWindowOpen));
  };

  return (
    <Box>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleCloseCartModalWindow}>
        <StyledCartModalWindow>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            height={'1.6rem'}
            padding="1.1rem 4%"
            gap={1}
            color={'#fff'}
            bgcolor={BASE_COLORS.DEFAULT_BLUE}>
            <ShoppingCartOutlinedIcon fontSize="large" />
            <Typography
              variant="h5"
              fontFamily={FONTS.BOLD_TEXT_FAMILY}
              fontWeight={600}>
              {t('cart')}
            </Typography>
            <IconButton
              onClick={handleCloseCartModalWindow}
              sx={{
                color: FILTER_COLORS.BUTTON_RESET_FILTER,
                padding: 0,
                position: 'absolute',
                right: '10px',
              }}>
              <CloseIcon
                sx={{
                  height: '2rem',
                  width: '2rem',
                  padding: 0,
                  color: '#fff',
                }}
              />
            </IconButton>
          </Box>
          {cartItems?.length > 0 ? (
            <>
              <List
                sx={{
                  padding: 0,
                  overflowY: 'auto',
                  flex: 1,
                }}>
                {cartItemDetails.map(
                  (cartItem: CartItemData, index: number) => (
                    <ListItem key={index} disablePadding>
                      <CartItem cartItemData={cartItem} />
                    </ListItem>
                  ),
                )}
              </List>
              <Box
                sx={{
                  padding: '20px 10px',
                }}>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    fontFamily={FONTS.BOLD_TEXT_FAMILY}>
                    {t('totalCoast')}:
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    fontFamily={FONTS.BOLD_TEXT_FAMILY}
                    color={BASE_COLORS.DEFAULT_BLUE}>
                    {`${totalAmount} ${t('uah')}`}
                  </Typography>
                </Box>
                <StyledButton variant="contained" onClick={handleGoToCheckout}>
                  {t('makeAnOrder')}
                </StyledButton>
              </Box>
            </>
          ) : (
            <EmptyCart />
          )}
        </StyledCartModalWindow>
      </Drawer>
    </Box>
  );
}
