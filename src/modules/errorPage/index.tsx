import { Box, Button, Typography, styled } from '@mui/material';
import { FONTS, BASE_COLORS } from '../../shared/constants';
import { useTranslation } from 'react-i18next';
import { ButtonWithIcon } from '../../shared/components/ButtonWithIcon';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from 'react-router-dom';

const StyledHeadingText = styled(Typography)({
  fontFamily: `${FONTS.BOLD_TEXT_FAMILY}`,
  padding: '2rem 0 1.5rem',
  textAlign: 'center',
  fontSize: '2rem',
  fontWeight: '700',
});

const StyledText = styled(Typography)({
  fontFamily: `${FONTS.MAIN_TEXT_FAMILY}`,
  fontSize: '1.1rem',
});

function ErrorPage() {
  const { t } = useTranslation();
  const history = useNavigate();

  const handleBackHome = () => {
    history('/');
  };

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
      <Typography
        variant="h2"
        fontWeight="800"
        fontSize={'4rem'}
        color={`${BASE_COLORS.DEFAULT_BLUE}`}
        fontFamily={`${FONTS.BOLD_TEXT_FAMILY}`}
        textAlign={'center'}>
        {t('oops')}
      </Typography>
      <Typography
        variant="h2"
        fontWeight="800"
        fontSize={'4rem'}
        color={`${BASE_COLORS.DEFAULT_BLUE}`}
        fontFamily={`${FONTS.BOLD_TEXT_FAMILY}`}
        textAlign={'center'}>
        {t('somethingWentWrong')}
      </Typography>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'2rem'}
        m={'2rem auto'}
        width={'40rem'}
        textAlign={'center'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          '@media (max-width: 630px)': {
            width: '90%',
          },
        }}>
        <StyledHeadingText>{t('404')}</StyledHeadingText>
        <StyledText>{t('404Text')}</StyledText>
        <ButtonWithIcon
          button={
            <Button
              variant="contained"
              onClick={handleBackHome}
              sx={{
                backgroundColor: BASE_COLORS.DEFAULT_BLUE,
                fontWeight: '600',
                fontFamily: FONTS.MAIN_TEXT_FAMILY,
                borderRadius: '999px',
                padding: '20px 40px',
                fontSize: '0.9rem',
              }}>
              {t('backHome')}
            </Button>
          }
          icon={<ArrowRightIcon />}
        />
      </Box>
    </Box>
  );
}

export default ErrorPage;
