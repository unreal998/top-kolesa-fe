import { Box, Grid, Typography, styled } from '@mui/material';
import { FONTS, BASE_COLORS } from '../../../shared/constants';
import { useTranslation } from 'react-i18next';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const StyledHeadingText = styled(Typography)({
  fontFamily: `${FONTS.BOLD_TEXT_FAMILY}`,
  textAlign: 'center',
  fontSize: '1.2rem',
  fontWeight: '600',
  paddingLeft: '0.5rem',
});

const StyledText = styled(Typography)({
  fontFamily: `${FONTS.MAIN_TEXT_FAMILY}`,
  fontSize: '1rem',
});

export function ContactMainInfo() {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        variant="h2"
        fontWeight="800"
        color={`${BASE_COLORS.DEFAULT_BLUE}`}
        fontFamily={`${FONTS.BOLD_TEXT_FAMILY}`}
        textAlign={'center'}>
        {t('contactLabel')}
      </Typography>
      <Box display={'flex'} flexDirection={'column'} gap={5}>
        <StyledText pt={'4rem'} pb={'2rem'}>
          {t('contactText')}
        </StyledText>
        <Box>
          <Grid
            container
            gap={3}
            justifyContent={'center'}
            sx={{
              '@media (max-width: 690px)': {
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              },
            }}>
            <Grid
              item
              bgcolor={BASE_COLORS.BACKGROUND_WHITE}
              height={'13rem'}
              borderRadius={2}
              width={'45%'}
              sx={{
                '@media (max-width: 1700px)': {
                  height: '14rem',
                },
                '@media (max-width: 690px)': {
                  width: '90%',
                },
                '@media (max-width: 340px)': {
                  height: '17rem',
                },
              }}>
              <Box display={'flex'} flexDirection={'column'} m={3}>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <PhoneIcon sx={{ color: BASE_COLORS.DEFAULT_BLUE }} />
                  <StyledHeadingText>{t('contactUs')}</StyledHeadingText>
                </Box>
                <Box display={'flex'} flexDirection={'column'} p={2}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    sx={{
                      '@media (max-width: 830px)': {
                        justifyContent: 'center',
                      },
                    }}>
                    <StyledText
                      sx={{
                        '@media (max-width: 830px)': {
                          display: 'none',
                        },
                      }}>
                      Vodafone
                    </StyledText>
                    <StyledText>+38 (099) 273-77-44</StyledText>
                  </Box>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    sx={{
                      '@media (max-width: 830px)': {
                        justifyContent: 'center',
                      },
                    }}>
                    <StyledText
                      sx={{
                        '@media (max-width: 830px)': {
                          display: 'none',
                        },
                      }}>
                      Kyivstar
                    </StyledText>
                    <StyledText>+38 (097) 273-77-44</StyledText>
                  </Box>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    sx={{
                      '@media (max-width: 830px)': {
                        justifyContent: 'center',
                      },
                    }}>
                    <StyledText
                      sx={{
                        '@media (max-width: 830px)': {
                          display: 'none',
                        },
                      }}>
                      Life
                    </StyledText>
                    <StyledText>+38 (063) 253-77-44</StyledText>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              bgcolor={BASE_COLORS.BACKGROUND_WHITE}
              height={'13rem'}
              borderRadius={2}
              width={'45%'}
              sx={{
                '@media (max-width: 1700px)': {
                  height: '14rem',
                },
                '@media (max-width: 690px)': {
                  width: '90%',
                },
                '@media (max-width: 340px)': {
                  height: '17rem',
                },
              }}>
              <Box display={'flex'} flexDirection={'column'} m={3}>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <AlternateEmailIcon
                    sx={{ color: BASE_COLORS.DEFAULT_BLUE }}
                  />
                  <StyledHeadingText>{t('ourMail')}</StyledHeadingText>
                </Box>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  p={2}
                  sx={{
                    '@media (max-width: 830px)': {
                      justifyContent: 'center',
                    },
                  }}>
                  <StyledText
                    sx={{
                      '@media (max-width: 830px)': {
                        display: 'none',
                      },
                    }}>
                    E-mail
                  </StyledText>
                  <StyledText>topkolesa@gmail.com</StyledText>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              width={'45%'}
              bgcolor={BASE_COLORS.BACKGROUND_WHITE}
              height={'13rem'}
              sx={{
                '@media (max-width: 1700px)': {
                  height: '14rem',
                },
                '@media (max-width: 690px)': {
                  width: '90%',
                },
                '@media (max-width: 340px)': {
                  height: '17rem',
                },
              }}
              borderRadius={2}>
              <Box display={'flex'} flexDirection={'column'} m={3}>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <CalendarMonthIcon sx={{ color: BASE_COLORS.DEFAULT_BLUE }} />
                  <StyledHeadingText>{t('openingHours')}</StyledHeadingText>
                </Box>
                <Box display={'flex'} flexDirection={'column'} p={2}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    sx={{
                      '@media (max-width: 690px)': {
                        width: '15rem',
                        margin: '0 auto',
                      },
                    }}>
                    <StyledText>{t('workDays')}:</StyledText>
                    <StyledText>9:00 - 18:00</StyledText>
                  </Box>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    sx={{
                      '@media (max-width: 690px)': {
                        width: '15rem',
                        margin: '0 auto',
                      },
                    }}>
                    <StyledText>{t('st')}:</StyledText>
                    <StyledText>9:00 - 16:00</StyledText>
                  </Box>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    sx={{
                      '@media (max-width: 690px)': {
                        width: '15rem',
                        margin: '0 auto',
                      },
                    }}>
                    <StyledText>{t('su')}:</StyledText>
                    <StyledText>{t('closed')}</StyledText>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              width={'45%'}
              bgcolor={BASE_COLORS.BACKGROUND_WHITE}
              height={'13rem'}
              borderRadius={2}
              sx={{
                '@media (max-width: 1700px)': {
                  height: '14rem',
                },
                '@media (max-width: 690px)': {
                  width: '90%',
                },
                '@media (max-width: 340px)': {
                  height: '17rem',
                },
              }}>
              <Box display={'flex'} flexDirection={'column'} m={3}>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <LocalShippingIcon sx={{ color: BASE_COLORS.DEFAULT_BLUE }} />
                  <StyledHeadingText>{t('delivery')}</StyledHeadingText>
                </Box>
                <Box display={'flex'} flexDirection={'column'} p={2}>
                  <Box display={'flex'} flexDirection={'column'} gap={2}>
                    <StyledText>{t('deliveryShort1')}</StyledText>
                    <StyledText>{t('deliveryShort2')}</StyledText>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
