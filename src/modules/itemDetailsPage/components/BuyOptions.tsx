import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { actions } from '../../shopPage/reducer';
import { selectSelectedItemData } from '../../shopPage/selectors';

import { Box, Button, TextField, Typography, styled } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import { ButtonWithIcon } from '../../../shared/components/ButtonWithIcon';
import { BASE_COLORS, FONTS } from '../../../shared/constants';
import { CartItemData } from '../../../shared/types';

const StyledTextField = styled(TextField)({
  width: '80px',
  height: '40px',
  '& input': {
    marginLeft: '10px',
    fontFamily: FONTS.BOLD_TEXT_FAMILY,
    fontWeight: 600,
    fontSize: '16px',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: BASE_COLORS.DEFAULT_BLUE,
    },
    '&.Mui-focused fieldset': {
      borderColor: BASE_COLORS.DEFAULT_BLUE,
    },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: BASE_COLORS.DEFAULT_BLUE,
  fontWeight: 600,
  fontFamily: 'PT Sans, sans-serif',
  borderRadius: '999px',
  padding: '16px 40px',
  '@media (max-width: 630px)': {
    width: '100%',
  },
});

export default function BuyOptions({ tireId }: { tireId: number | undefined }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedItemData = useSelector(selectSelectedItemData());
  const history = useNavigate();
  const [numberOfTires, setNumberOfTires] = useState<number>(4);

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const selectedItemId = searchParams.get('id');
    dispatch(actions.getShopItems(''));
    dispatch(actions.setSelectedItemId(selectedItemId || ''));
  }, [dispatch]);

  const handleFastBuy = useCallback(() => {
    const existingCartItemsString = localStorage.getItem('cartItem');
    const existingCartItems = existingCartItemsString
      ? JSON.parse(existingCartItemsString)
      : [];

    const itemIndex = existingCartItems.findIndex(
      (item: CartItemData) => item.tireId === tireId,
    );

    if (itemIndex > -1) {
      existingCartItems[itemIndex].numberOfTires += numberOfTires;
    } else {
      existingCartItems.push({ tireId, numberOfTires });
    }

    localStorage.setItem('cartItem', JSON.stringify(existingCartItems));

    const cartItems = JSON.parse(localStorage.getItem('cartItem') || '').length;
    dispatch(actions.setCartItemCount(cartItems));
    history(`/checkout`, { replace: true });
  }, [dispatch, history]);

  const handleNumberOfTires = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numValue = Number(value);
    if (numValue >= 1) {
      setNumberOfTires(numValue);
    } else {
      setNumberOfTires(1);
    }
  };

  const handleAddToCart = () => {
    const existingCartItemsString = localStorage.getItem('cartItem');
    const existingCartItems = existingCartItemsString
      ? JSON.parse(existingCartItemsString)
      : [];

    const itemIndex = existingCartItems.findIndex(
      (item: CartItemData) => item.tireId === tireId,
    );

    if (itemIndex > -1) {
      existingCartItems[itemIndex].numberOfTires += numberOfTires;
    } else {
      existingCartItems.push({ tireId, numberOfTires });
    }

    localStorage.setItem('cartItem', JSON.stringify(existingCartItems));

    const cartItems = JSON.parse(localStorage.getItem('cartItem') || '').length;
    dispatch(actions.setCartItemCount(cartItems));
  };

  const buttonInfo = [
    {
      text: t('addToCart'),
      function: handleAddToCart,
      icon: <ShoppingCartOutlinedIcon sx={{ height: '14px', width: '14px' }} />,
    },
    {
      text: t('fastBuy'),
      function: handleFastBuy,
      icon: <ShoppingBagOutlinedIcon sx={{ height: '14px', width: '14px' }} />,
    },
  ];

  return (
    <>
      <Typography
        variant="h3"
        fontWeight="600"
        fontSize="1.9rem"
        color={BASE_COLORS.DEFAULT_BLUE}
        fontFamily={FONTS.BOLD_TEXT_FAMILY}
        mt={'2rem'}
        sx={{
          '@media (max-width: 630px)': {
            margin: 'auto',
            marginY: '1rem',
            fontSize: '2.2rem',
          },
        }}>
        {Number(selectedItemData?.price_uah) * numberOfTires} {t('uah')}
      </Typography>
      <Box
        display={'flex'}
        margin={'2.5rem 0'}
        gap={'1rem'}
        sx={{
          '@media (max-width: 990px)': {
            flexDirection: 'column',
            gap: '3rem',
            marginTop: '1.5rem',
          },
          '@media (max-width: 918px)': {
            flexDirection: 'row',
          },
          '@media (max-width: 630px)': {
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: '4rem',
          },
        }}>
        <StyledTextField
          id="outlined-basic"
          variant="outlined"
          type="number"
          value={numberOfTires}
          onChange={handleNumberOfTires}
        />
        <Box
          display={'flex'}
          gap={'1rem'}
          sx={{
            '@media (max-width: 630px)': {
              flexDirection: 'column',
              margin: 'auto',
              width: '100%',
            },
          }}>
          {buttonInfo.map((item, i) => (
            <Box key={i}>
              <ButtonWithIcon
                button={
                  <StyledButton onClick={item.function} variant="contained">
                    {item.text}
                  </StyledButton>
                }
                icon={item.icon}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
