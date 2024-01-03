import {
  Box,
  Button,
  List,
  ListItem,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { CartItem } from '../../../shared/components/header/CartItem';
import { CartItemData } from '../../../shared/types';
import { BASE_COLORS, FILTER_COLORS, FONTS } from '../../../shared/constants';
import { useTranslation } from 'react-i18next';

export function CartInfo({
  checkoutItemDetails,
  cartItems,
  setNumberOfTires,
  totalAmount,
  handleOrder,
}: any) {
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
      maxHeight={checkoutItemDetails?.length <= 5 ? '100%' : '69.2rem'}
      bgcolor={BASE_COLORS.BACKGROUND_WHITE}
      p={'2rem'}
      borderRadius={'0.5rem'}
      sx={{
        '@media (max-width: 918px)': {
          maxHeight: '100%',
        },
      }}>
      <Typography
        variant="h6"
        fontWeight={600}
        fontFamily={FONTS.BOLD_TEXT_FAMILY}
        pb={'1rem'}>
        {t('yourOder')}
      </Typography>
      <Box sx={{ overflowY: 'auto' }}>
        {checkoutItemDetails?.map((cartItem: CartItemData, index: any) => (
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
      <Box pt={'1rem'}>
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
