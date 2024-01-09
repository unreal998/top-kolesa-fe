import { Box, Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useTranslation } from 'react-i18next';

function EmptyCart() {
  const { t } = useTranslation();
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      m={'auto'}>
      <ShoppingCartOutlinedIcon
        sx={{
          fontSize: '10rem',
          color: '#f1f1f1',
        }}
      />
      <Typography variant="h5">{t('cartEmpty')}</Typography>
    </Box>
  );
}

export default EmptyCart;
