import { Box, Typography, styled } from '@mui/material';
import { FONTS, BASE_COLORS } from '../../shared/constants';
import { useTranslation } from 'react-i18next';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { selectOrderData } from './selectors';

const StyledHeadingText = styled(Typography)({
  fontFamily: `${FONTS.BOLD_TEXT_FAMILY}`,
  fontSize: '2rem',
  fontWeight: '700',
});

export function OrderPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const orderData = useSelector(selectOrderData());

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const orderId = searchParams.get('id');
    if (orderId) {
      dispatch(actions.fetchOrderData(orderId));
    }
  }, [dispatch]);

  return (
    <Box
      m={'3% auto 10%'}
      maxWidth={'60rem'}
      sx={{
        '@media (max-width: 1500px)': {
          m: '3% 20% 10%',
        },
        '@media (max-width: 1111px)': {
          m: '3% 15% 10%',
        },
        '@media (max-width: 960px)': {
          m: '3% 10% 10%',
        },
      }}>
      <Box mb={'4rem'}>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'start'}
          gap={'1rem'}>
          <CheckCircleOutlineRoundedIcon
            sx={{
              color: BASE_COLORS.DEFAULT_BLUE,
              fontSize: '2.6rem',
              mt: '0.3rem',
            }}
          />
          <Box>
            <StyledHeadingText>{`${t('orderThank')}, ${
              orderData.userName
            }`}</StyledHeadingText>
            <Typography
              variant="subtitle1"
              fontWeight={500}
              textAlign={'start'}>
              {t('managerCall')}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        bgcolor={BASE_COLORS.BACKGROUND_WHITE}
        p={'2rem'}
        borderRadius={'0.75rem'}>
        <Box
          borderBottom={`2px solid ${BASE_COLORS.DEFAULT_BLUE}`}
          display={'flex'}
          justifyContent={'space-between'}
          pb={'1rem'}
          mb={'1rem'}
          gap={'2rem'}>
          <Typography variant="h5" fontWeight={600}>
            {`${t('orderNumber')}: ${orderData.orderId}`}
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={'1rem'}>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {t('shippingAddress')}:
            </Typography>

            <Typography variant="subtitle1" fontWeight={500}>
              {orderData.deliveryAddress}
            </Typography>
          </Box>
          <Box width={'25rem'}>
            <Typography variant="subtitle1" fontWeight={600}>
              {t('yourOder')}:
            </Typography>
            {orderData.itemsList.map((item, i) => (
              <Box
                key={i}
                display={'flex'}
                justifyItems={'space-between'}
                alignItems={'end'}
                gap={'1rem'}
                width={'100%'}
                mb={'0.5rem'}>
                <Typography
                  variant="subtitle1"
                  fontWeight={500}
                  textAlign={'start'}
                  width={'15rem'}>
                  {item.brand} {item.name} {item.size}:
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  textAlign={'start'}
                  width={'8rem'}>
                  {item.count} x {item.price} {t('uah')}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box
            display={'flex'}
            justifyItems={'space-between'}
            alignItems={'end'}
            gap={'1rem'}
            width={'100%'}
            mb={'0.5rem'}>
            <Typography
              variant="h6"
              fontWeight={600}
              textAlign={'start'}
              width={'15rem'}>
              {t('totalCoast')}:
            </Typography>
            <Typography
              variant="h6"
              fontWeight={600}
              textAlign={'start'}
              width={'10rem'}>
              {` ${orderData.totalAmount}.00 ${t('uah')}`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
