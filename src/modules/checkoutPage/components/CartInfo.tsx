import {
  Box,
  Button,
  ListItem,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { CartItem } from '../../../shared/components/header/CartItem';
import { CartItemData, ShopItemAPI } from '../../../shared/types';
import { BASE_COLORS, FONTS } from '../../../shared/constants';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectShopItemsList } from '../../shopPage/selectors';
import { SHOP_ITEM_TIRES_IMG_PREFIX } from '../../../constants';
import useLocalStorageItem from '../../../hooks/useLocalStorageWatcher';

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

type CartInfoProps = {

  handleOrder: () => void;
};

export function CartInfo({ handleOrder }: CartInfoProps) {
  const { t } = useTranslation();
  const shopItemsList = useSelector(selectShopItemsList());
  const cartItems = useLocalStorageItem('cartItem');

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

  return (
    <Stack
      maxHeight={'100%'}
      bgcolor={BASE_COLORS.BACKGROUND_WHITE}
      borderRadius={'0.5rem'}
      sx={{
        '@media (max-width: 918px)': {
          maxHeight: '100%',
        },
      }}>
      <Typography
        variant="h6"
        fontWeight={600}
        m={'2rem 2rem 1rem 2rem'}
        fontFamily={FONTS.BOLD_TEXT_FAMILY}>
        {t('yourOder')}
      </Typography>
      <Box mx={'1.3rem'} sx={{ overflowY: 'auto' }}>
        {cartItemDetails?.map((cartItem: CartItemData, index: number) => (
          <ListItem key={index} disablePadding>
            <CartItem cartItemData={cartItem} />
          </ListItem>
        ))}
      </Box>
      <Box m={'1.3rem'}>
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
        <StyledButton variant="contained" onClick={handleOrder}>
          {t('buy')}
        </StyledButton>
      </Box>
    </Stack>
  );
}
