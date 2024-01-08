import { useCallback, useEffect, useState } from 'react';
import { t } from 'i18next';

import { Box, IconButton, Link, Typography, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { BASE_COLORS, FILTER_COLORS, FONTS } from '../../constants';
import { CartItemData } from '../../types';

const StyledCartItem = styled(Box)({
  borderBottom: `1px solid ${BASE_COLORS.DEFAULT_BLUE}`,
  cursor: 'default',
  margin: '0 10px',
  paddingTop: '10px',
  position: 'relative',
  width: '100%',
});

const StyledIconButton = styled(IconButton)({
  padding: 0,
  position: 'absolute',
  top: 10,
  right: 10,
  '&:hover': {
    '& .MuiSvgIcon-root': {
      color: FILTER_COLORS.BUTTON_RESET_FILTER,
    },
  },
});

type CartItemProps = {
  cartItemData: CartItemData;
};

export function CartItem({ cartItemData }: CartItemProps) {
  const [itemCount, setItemCount] = useState<number>(
    cartItemData.numberOfTires,
  );

  useEffect(() => {
    const currentCart = JSON.parse(localStorage.getItem('cartItem') || '[]');
    const updatedCart = currentCart.map((item: CartItemData) =>
      item.tireId === cartItemData.tireId
        ? { ...item, numberOfTires: itemCount }
        : item,
    );
    localStorage.setItem('cartItem', JSON.stringify(updatedCart));
  }, [itemCount, cartItemData.tireId]);

  const updateCartInLocalStorage = useCallback(
    (tireId: number, newCount: number) => {
      const currentCart = JSON.parse(localStorage.getItem('cartItem') || '[]');
      const updatedCart = currentCart.map((item: CartItemData) =>
        item.tireId === tireId ? { ...item, numberOfTires: newCount } : item,
      );
      localStorage.setItem('cartItem', JSON.stringify(updatedCart));
    },
    [],
  );

  const handleIncreaseQuantity = () => {
    const newCount = itemCount + 1;
    setItemCount(newCount);
    updateCartInLocalStorage(cartItemData.tireId, newCount);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleDecreaseQuantity = () => {
    const newCount = Math.max(1, itemCount - 1);
    setItemCount(newCount);
    updateCartInLocalStorage(cartItemData.tireId, newCount);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleDeleteItem = () => {
    const currentCart = JSON.parse(localStorage.getItem('cartItem') || '[]');
    const updatedCart = currentCart.filter(
      (item: CartItemData) => item.tireId !== cartItemData.tireId,
    );
    localStorage.setItem('cartItem', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };


  return (
    <StyledCartItem>
      <StyledIconButton onClick={handleDeleteItem}>
        <DeleteIcon
          sx={{
            height: '20px',
            width: '20px',
            padding: 0,
            transition: 'all 0.1s ',
          }}
        />
      </StyledIconButton>
      <Box display={'flex'} flexDirection={'column'} mb={1}>
        <Link
          href={`/item?id=${cartItemData.article?.toString()}`}
          color={'inherit'}
          sx={{ textDecoration: 'none', display: 'inline' }}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            fontFamily={FONTS.BOLD_TEXT_FAMILY}
            fontSize={'1.2rem'}
            mb={1}
            p={'0 10% 0 2.5%'}>
            {cartItemData.fullName}
          </Typography>
        </Link>
        <Box display={'flex'} gap={'4%'}>
          <Box
            component="img"
            sx={{
              width: '100px',
              height: '100px',
            }}
            alt={cartItemData.name}
            src={cartItemData.image}
          />
          <Box
            display={'flex'}
            justifyContent={'space-around'}
            flexDirection={'column'}
            width={'100%'}>
            <Typography
              variant="h6"
              fontWeight={600}
              fontFamily={FONTS.BOLD_TEXT_FAMILY}
              color={BASE_COLORS.DEFAULT_BLUE}>
              {`${cartItemData.price * cartItemData.numberOfTires} ${t('uah')}`}
            </Typography>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              width={'7rem'}>
              <IconButton onClick={handleIncreaseQuantity}>
                <AddCircleOutlineIcon
                  sx={{
                    color: BASE_COLORS.DEFAULT_BLUE,
                  }}
                />
              </IconButton>
              <Typography
                variant="h6"
                fontWeight={600}
                fontFamily={FONTS.BOLD_TEXT_FAMILY}>
                {cartItemData.numberOfTires}
              </Typography>
              <IconButton onClick={handleDecreaseQuantity}>
                <RemoveCircleOutlineIcon
                  sx={{
                    color: BASE_COLORS.DEFAULT_BLUE,
                  }}
                />
              </IconButton>
            </Box>
            <Typography
              variant="subtitle2"
              fontWeight={500}
              fontFamily={FONTS.MAIN_TEXT_FAMILY}
              color={FILTER_COLORS.TEXT_MAIN}>
              {t('article')}: {cartItemData.article}
            </Typography>
          </Box>
        </Box>
      </Box>
    </StyledCartItem>
  );
};
