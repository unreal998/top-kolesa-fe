import { Box, List, ListItem, Stack, Typography, styled } from '@mui/material';
import { FONTS, BASE_COLORS } from '../../shared/constants';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';

const StyledHeadingText = styled(Typography)({
  fontFamily: `${FONTS.BOLD_TEXT_FAMILY}`,
  padding: '4rem 0 1.5rem',
  textAlign: 'center',
  fontSize: '2rem',
  fontWeight: '600',
});

const StyledText = styled(Typography)({
  fontFamily: `${FONTS.MAIN_TEXT_FAMILY}`,
  fontSize: '1.1rem',
});

const StyledListItem = styled(ListItem)({
  fontFamily: `${FONTS.MAIN_TEXT_FAMILY}`,
  fontSize: '1.1rem',
  listStylePosition: 'inside',
});

const WhyWeList = [
  'whyWeText1',
  'whyWeText2',
  'whyWeText3',
  'whyWeText4',
  'whyWeText5',
  'whyWeText6',
  'whyWeText7',
  'whyWeText8',
  'whyWeText9',
];

function AboutPage() {
  const { t } = useTranslation();
  return (
    <Box
      m={'3% 25% 10%'}
      sx={{
        '@media (max-width: 1024px)': {
          margin: '3% 20% 10%',
        },
        '@media (max-width: 870px)': {
          margin: '3% 12% 10%',
        },
      }}>
      <Typography
        variant="h2"
        fontWeight="800"
        color={`${BASE_COLORS.DEFAULT_BLUE}`}
        fontFamily={`${FONTS.BOLD_TEXT_FAMILY}`}
        textAlign={'center'}>
        {t('aboutLabel')}
      </Typography>
      <StyledHeadingText>{t('welcomeHeader')}</StyledHeadingText>
      <StyledText>{t('welcomeText')}</StyledText>
      <StyledHeadingText>{t('whyWeHeader')}</StyledHeadingText>
      <List>
        {WhyWeList.map((item, i) => (
          <StyledListItem key={i}>
            <Stack direction="row" spacing={1}>
              <CheckIcon
                sx={{
                  color: `${BASE_COLORS.DEFAULT_BLUE}`,
                  fontSize: '1.2rem',
                }}
              />
              <Typography>{t(item)}</Typography>
            </Stack>
          </StyledListItem>
        ))}
      </List>
      <StyledHeadingText>{t('historyHeader')}</StyledHeadingText>
      <StyledText>{t('historyText')}</StyledText>
      <StyledHeadingText>{t('deliveryHeader')}</StyledHeadingText>
      <StyledText>{t('deliveryText')}</StyledText>
      <StyledHeadingText>{t('staffHeader')}</StyledHeadingText>
      <StyledText>{t('staffText')}</StyledText>
      <StyledHeadingText>{t('productsHeader')}</StyledHeadingText>
      <StyledText>{t('productsText')}</StyledText>
    </Box>
  );
}

export default AboutPage;
