import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  Typography,
  styled,
} from '@mui/material';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { CartItem } from './CartItem';
import { CartItemData, CartStorageData } from '../../types';
import { actions } from '../../../modules/shopPage/reducer';
import { ShopItemAPI } from '../../../shared/types';
import { SHOP_ITEM_TIRES_IMG_PREFIX } from '../../../constants';
import { BASE_COLORS, FILTER_COLORS, FONTS } from '../../constants';
import EmptyCart from './EmptyCart';

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
  const history = useNavigate();
  const cartModalWindowOpen = useSelector(selectCartModalWindowOpen);
  const shopItemsList = useSelector(selectShopItemsList());
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cartItems, updateCartItems] = useState<CartStorageData[]>([]);
  const [cartItemDetails, updateCartItemDetails] = useState<CartItemData[]>([]);
  const [totalAmount, updateTotalAmount] = useState<number>(0);
  const [localStorageCartItems, setLocalStorageCartItems] = useState<
    CartStorageData[]
  >([]);

  useEffect(() => {
    setOpenDrawer(cartModalWindowOpen);
    const localStorageCartItems: CartStorageData[] = JSON.parse(
      localStorage.getItem('cartItem') || '[]',
    );
    const cartItemDetails: CartItemData[] = localStorageCartItems.map(
      (cartItem: CartStorageData) => {
        const item = shopItemsList.find(
          (item: ShopItemAPI) => item.id === cartItem.tireId,
        );
        if (item) {
          return {
            ...cartItem,
            fullName: `${item.brand} ${item.name} ${item.width}/${item.height} R${item.diametr}`,
            name: item.name,
            price: item.price_uah,
            article: item.id,
            image: item
              ? `${SHOP_ITEM_TIRES_IMG_PREFIX}${item.image_file}`
              : './imgs/noPhotoImg.jpg',
          };
        } else {
          return {
            ...cartItem,
            fullName: `unknown/unknown Runknown`,
            name: '',
            price: NaN,
            article: NaN,
            image: './imgs/noPhotoImg.jpg',
          };
        }
      },
    );
    const totalAmount = localStorageCartItems.reduce(
      (total: number, cartItem: CartStorageData) => {
        const item = shopItemsList.find((item) => item.id === cartItem.tireId);
        return total + (item ? item.price_uah * cartItem.numberOfTires : 0);
      },
      0,
    );
    setLocalStorageCartItems(localStorageCartItems);
    updateTotalAmount(totalAmount);
    updateCartItemDetails(cartItemDetails);
  }, [cartModalWindowOpen, cartItems]);

  const handleCloseCartModalWindow = () => {
    dispatch(actions.setCartModalWindowOpen(!cartModalWindowOpen));
  };

  const handletoCheckOutPage = useCallback(() => {
    history(`/checkout`, { replace: true });
    setOpenDrawer(false);
    dispatch(actions.setCartModalWindowOpen(false));
  }, [history, dispatch]);

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
          {localStorageCartItems?.length > 0 ? (
            <>
              <List
                sx={{
                  padding: 0,
                  overflowY: 'auto',
                  flex: 1,
                }}>
                {cartItemDetails.map(
                  (cartItem: CartItemData, index: number) => (
                    <CartItem
                      key={index}
                      index={index}
                      cartItemData={cartItem}
                      updateCartItems={updateCartItems}
                      cartItems={cartItemDetails}
                    />
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
                <StyledButton
                  variant="contained"
                  onClick={handletoCheckOutPage}>
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
