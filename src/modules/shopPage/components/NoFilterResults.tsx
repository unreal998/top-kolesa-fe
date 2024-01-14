import { Box, Button, Typography, styled } from '@mui/material';

import { useTranslation } from 'react-i18next';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from 'react-router-dom';
import { BASE_COLORS, FONTS } from '../../../shared/constants';

const StyledHeadingText = styled(Typography)({
  fontFamily: `${FONTS.BOLD_TEXT_FAMILY}`,
  marginTop: '1rem',
  textAlign: 'center',
  fontSize: '2rem',
  fontWeight: '600',
});

function NoFilterResults() {
  const { t } = useTranslation();
  const history = useNavigate();

  const handleBackHome = () => {
    history('/');
  };

  return (
    <Box
      m={'3% auto 10%'}
      maxWidth={'60rem'}
      minHeight={'40vh'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
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
        variant="h3"
        fontWeight="800"
        fontSize={'3.4rem'}
        mb={'4rem'}
        color={`${BASE_COLORS.DEFAULT_BLUE}`}
        fontFamily={`${FONTS.BOLD_TEXT_FAMILY}`}
        textAlign={'center'}>
        {t('noResultsHeader')}
      </Typography>

      <Box
        textAlign={'center'}
        sx={{
          '@media (max-width: 630px)': {
            width: '90%',
          },
        }}>
        <StyledHeadingText>{t('noResultsText1')} </StyledHeadingText>
        <StyledHeadingText>{t('noResultsText2')}</StyledHeadingText>
      </Box>
    </Box>
  );
}

export default NoFilterResults;
