import { Box, Typography, styled } from '@mui/material';
import { FONTS, BASE_COLORS } from '../../shared/constants';
import { useTranslation } from 'react-i18next';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

const StyledHeadingText = styled(Typography)({
  fontFamily: `${FONTS.BOLD_TEXT_FAMILY}`,
  fontSize: '2rem',
  fontWeight: '700',
});

export function CheckoutOrderPage() {
  const { t } = useTranslation();

  const shippingData = ['{full name}', '{street}', '{city+zip}'];

  const items = [
    {
      name: '{item1}',
      price: '{price}',
      items: '{how many}',
    },
    {
      name: '{item2}',
      price: '{price}',
      items: '{how many}',
    },
    {
      name: '{item3}',
      price: '{price}',
      items: '{how many}',
    },
  ];

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
            <StyledHeadingText>{`${t(
              'orderThank',
            )}, {name}`}</StyledHeadingText>
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
            {`${t('orderNumber')}: {id}`}
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={'1rem'}>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {t('shippingAddress')}:
            </Typography>
            {shippingData.map((data, i) => (
              <Typography key={i} variant="subtitle1" fontWeight={500}>
                {data}
              </Typography>
            ))}
          </Box>
          <Box width={'25rem'}>
            <Typography variant="subtitle1" fontWeight={600}>
              {t('yourOder')}:
            </Typography>
            {items.map((item, i) => (
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
                  {item.name} ({item.items}):
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  textAlign={'start'}
                  width={'8rem'}>
                  {item.price} {t('uah')}
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
              {` {amount} ${t('uah')}`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
