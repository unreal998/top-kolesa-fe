import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartModalWindowOpen,
  selectShopItemsList,
} from '../../modules/shopPage/selectors';
import { actions } from '../../modules/shopPage/reducer';
import { SHOP_ITEM_TIRES_IMG_PREFIX } from '../../constants';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { BASE_COLORS, FILTER_COLORS, FONTS } from '../../shared/constants';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CartItem } from './CartItem';
import { CartItemData, ShopItemAPI } from '../types';

export default function CartModalWindow() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartModalWindowOpen = useSelector(selectCartModalWindowOpen);
  const shopItemsList = useSelector(selectShopItemsList());
  const [numberOfTires, setNumberOfTires] = useState<number>(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    setOpenDrawer(cartModalWindowOpen);
  }, [cartModalWindowOpen]);

  const cartItems = JSON.parse(localStorage.getItem('cartItem') || '[]');

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
      return total + (item ? (item.price_uah * cartItem.numberOfTires) / 4 : 0);
    },
    0,
  );

  const handleCloseCartModalWindow = () => {
    dispatch(actions.setCartModalWindowOpen(!cartModalWindowOpen));
  };

  return (
    <Box>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleCloseCartModalWindow}>
        <Box
          sx={{
            width: 400,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '100%',
          }}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={1}
            borderBottom={`1px solid ${BASE_COLORS.DEFAULT_BLUE}`}
            p={1}>
            <ShoppingCartOutlinedIcon />
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
                top: 10,
                right: 10,
              }}>
              <CloseIcon
                sx={{
                  height: '20px',
                  width: '20px',
                  padding: 0,
                }}
              />
            </IconButton>
          </Box>
          <List
            sx={{
              padding: 0,
              overflowY: 'auto',
              flex: 1,
            }}>
            {cartItemDetails.map((cartItem: CartItemData, index: number) => (
              <CartItem
                index={index}
                cartItemData={cartItem}
                setNumberOfTires={setNumberOfTires}
                cartItems={cartItems}
              />
            ))}
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
            <Button
              variant="contained"
              fullWidth
              sx={{
                fontFamily: FONTS.BOLD_TEXT_FAMILY,
                fontWeight: 'bold',
                background: BASE_COLORS.DEFAULT_BLUE,
                '&:hover': {
                  background: BASE_COLORS.DEFAULT_BLUE,
                },
              }}>
              {t('makeAnOrder')}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
