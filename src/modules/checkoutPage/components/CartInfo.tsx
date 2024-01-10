import { Box, Button, Stack, Typography, styled } from '@mui/material';
import { CartItem } from '../../../shared/components/header/CartItem';
import { CartItemData, CartStorageData } from '../../../shared/types';
import { BASE_COLORS, FONTS } from '../../../shared/constants';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../../shopPage/selectors';

type CartInfoProps = {
  cartItems: CartItemData[];
  updateCartItems: (data: CartItemData[]) => void;
  totalAmount: number;
  handleOrder: () => void;
};

export function CartInfo({
  cartItems,
  updateCartItems,
  totalAmount,
  handleOrder,
}: CartInfoProps) {
  const { t } = useTranslation();

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

  return (
    <Stack
      maxHeight={'70.7rem'}
      bgcolor={BASE_COLORS.BACKGROUND_WHITE}
      borderRadius={'0.5rem'}
      sx={{
        '@media (max-width: 918px)': {
          maxHeight: '100%',
        },
      }}>
      <Typography
        variant="h6"
        p={'2rem 2rem 1rem 2rem'}
        fontWeight={600}
        fontFamily={FONTS.BOLD_TEXT_FAMILY}>
        {t('yourOder')}
      </Typography>
      <Box m={'0 1.3rem '} sx={{ overflowY: 'auto' }} height={'90%'}>
        {cartItems.map((cartItem: CartItemData, index: number) => (
          <Box
            key={index}
            sx={{ borderBottom: `1px solid ${BASE_COLORS.DEFAULT_BLUE}` }}>
            <CartItem
              index={index}
              cartItemData={cartItem}
              updateCartItems={updateCartItems}
              cartItems={cartItems}
              containerStyles={{
                border: 'none',
                margin: 0,
              }}
            />
          </Box>
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
          {' '}
          {t('buy')}
        </StyledButton>
      </Box>
    </Stack>
  );
}
