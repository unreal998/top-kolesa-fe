import { MapsHomeWork, Timer } from '@mui/icons-material';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { ButtonWithIcon } from '../ButtonWithIcon';
import { FooterStrocedText } from './FooterStrocedText';
import { Copyright } from './Copyright';
import { BASE_COLORS } from '../../constants';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      overflow="hidden"
      sx={{
        backgroundImage: 'url(./imgs/bg-footer.jpg)',
        backgroundSize: 'cover',
      }}>
      <Stack padding="4% 6%" justifyContent="space-between" direction="row">
        <Stack width="30%" gap="25px">
          <FooterStrocedText
            text={
              <Typography
                variant="h4"
                fontFamily="Montserrat, sans-serif"
                fontWeight="700"
                fontSize="24px"
                color="#fff">
                {' '}
                {t('about')}
              </Typography>
            }
          />
          <Typography
            lineHeight="1.7"
            fontFamily="PT Sans, sans-serif"
            color={BASE_COLORS.DEFAULT_GREY}
            variant="body1">
            {' '}
            {t('aboutSubtitle')}
          </Typography>
          <ButtonWithIcon
            button={
              <Button
                variant="contained"
                sx={{
                  backgroundColor: BASE_COLORS.DEFAULT_BLUE,
                  fontWeight: '600',
                  fontFamily: 'PT Sans, sans-serif',
                  borderRadius: '999px',
                  padding: '16px 40px',
                }}>
                {t('viewOnMap')}
              </Button>
            }
            icon={
              <MapsHomeWork sx={{ height: '14px', width: '14px' }} />
            }></ButtonWithIcon>
        </Stack>
        <Stack width="30%" gap="25px">
          <FooterStrocedText
            text={
              <Typography
                variant="h4"
                fontFamily="Montserrat, sans-serif"
                fontWeight="700"
                fontSize="24px"
                color="#fff">
                {' '}
                {t('connectWithUs')}
              </Typography>
            }
          />
          <Stack gap="10px">
            <Typography
              lineHeight="1.7"
              fontFamily="Montserrat, sans-serif"
              color="#fff"
              variant="body1">
              {t('waitingForCall')}
            </Typography>
            <Stack gap="6px">
              <Typography
                variant="body1"
                fontFamily="PT Sans, sans-serif"
                fontWeight="400"
                color={BASE_COLORS.DEFAULT_GREY}>
                {' '}
                (097) 273-77-44
              </Typography>
              <Typography
                variant="body1"
                fontFamily="PT Sans, sans-serif"
                fontWeight="400"
                color={BASE_COLORS.DEFAULT_GREY}>
                {' '}
                (099) 273-77-44
              </Typography>
              <Typography
                variant="body1"
                fontFamily="PT Sans, sans-serif"
                fontWeight="400"
                color={BASE_COLORS.DEFAULT_GREY}>
                {' '}
                (063) 253-77-44
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        padding="2% 8%"
        borderTop={`2px solid ${BASE_COLORS.DEFAULT_BLUE}`}
        direction="row">
        <Copyright />
      </Stack>
    </Box>
  );
}
