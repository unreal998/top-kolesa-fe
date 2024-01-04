import { Box, Button, Stack, Typography, styled } from '@mui/material';
import { CartItem } from '../../../shared/components/header/CartItem';
import { CartItemData } from '../../../shared/types';
import { BASE_COLORS, FONTS } from '../../../shared/constants';
import { useTranslation } from 'react-i18next';

type CartInfoProps = {
  checkoutItemDetails: any;
  cartItems: CartItemData[];
  setNumberOfTires: (count: number) => void;
  totalAmount: number;
  handleOrder: () => void;
};

export function CartInfo({
  checkoutItemDetails,
  cartItems,
  setNumberOfTires,
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
        {checkoutItemDetails?.map((cartItem: CartItemData, index: number) => (
          <Box
            key={index}
            sx={{ borderBottom: `1px solid ${BASE_COLORS.DEFAULT_BLUE}` }}>
            <CartItem
              index={index}
              cartItemData={cartItem}
              setNumberOfTires={setNumberOfTires}
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