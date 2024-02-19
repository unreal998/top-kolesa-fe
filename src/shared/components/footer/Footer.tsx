import { MapsHomeWork } from '@mui/icons-material';
import { Box, Button, Link, Stack, Typography, styled } from '@mui/material';
import { ButtonWithIcon } from '../ButtonWithIcon';
import { FooterStrocedText } from './FooterStrocedText';
import { Copyright } from './Copyright';
import { BASE_COLORS, FONTS } from '../../constants';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';
import { contactPhones } from '../../constants';

const StyledTextBox = styled(Stack)({
  width: '30%',
  gap: '25px',
  '@media (max-width: 1600px)': {
    width: '40%',
  },
  '@media (max-width: 1050px)': {
    width: '45%',
  },
  '@media (max-width: 712px)': {
    width: '80%',
  },
});

const StyledHeader = styled(Typography)({
  fontFamily: FONTS.BOLD_TEXT_FAMILY,
  fontWeight: '700',
  fontSize: '2.5rem',
  color: '#fff',
  '@media (max-width: 870px)': {
    fontSize: '2rem',
  },
  '@media (max-width: 605px)': {
    fontSize: '1.8rem',
  },
});

const StyledSubText = styled(Typography)({
  lineHeight: '1.7',
  fontFamily: FONTS.MAIN_TEXT_FAMILY,
  color: BASE_COLORS.DEFAULT_GREY,
  variant: 'body1',
  fontSize: '1rem',
  '@media (max-width: 605px)': {
    fontSize: '1.1rem',
  },
  '@media (max-width: 420px)': {
    fontSize: '1.2rem',
  },
});

export function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleShowMap = useCallback(() => {
    if (location.pathname !== '/contact' && location.pathname !== '/') {
      navigate('/contact', { state: { scrollToMap: true } });
    } else if (location.pathname === '/contact') {
      scrollToMapContact();
    } else if (location.pathname === '/') {
      scrollToMapMain();
    }
  }, [navigate, location.pathname]);

  const scrollToMapContact = useCallback(() => {
    const mapBox = document.getElementById('googleMapBox');
    if (mapBox) {
      mapBox.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToMapMain = useCallback(() => {
    const mapBox = document.getElementById('mapMainPages');
    if (mapBox) {
      mapBox.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      overflow="hidden"
      sx={{
        backgroundImage: 'url(./imgs/bg-footer.jpg)',
        backgroundSize: 'cover',
      }}>
      <Stack
        padding="4rem 8rem"
        justifyContent="space-around"
        direction="row"
        m={'0 auto'}
        sx={{
          '@media (min-width: 600px)': {
            padding: '4rem 6%',
          },
          '@media (max-width: 918px)': {
            padding: '4% 4rem',
            gap: '3rem',
          },
          '@media (max-width: 712px)': {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            gap: '5rem',
            paddingTop: '4rem',
          },
        }}>
        <StyledTextBox>
          <FooterStrocedText text={<StyledHeader>{t('about')}</StyledHeader>} />
          <StyledSubText>{t('aboutSubtitle')}</StyledSubText>
          <Box
            sx={{
              '@media (max-width: 712px)': {
                margin: ' auto',
              },
            }}>
            <ButtonWithIcon
              button={
                <Button
                  onClick={handleShowMap}
                  variant="contained"
                  sx={{
                    backgroundColor: BASE_COLORS.DEFAULT_BLUE,
                    fontWeight: '600',
                    fontFamily: FONTS.MAIN_TEXT_FAMILY,
                    borderRadius: '999px',
                    padding: '16px 40px',
                    fontSize: '0.9rem',
                  }}>
                  {t('viewOnMap')}
                </Button>
              }
              icon={<MapsHomeWork sx={{ height: '14px', width: '14px' }} />}
            />
          </Box>
        </StyledTextBox>
        <StyledTextBox>
          <FooterStrocedText
            text={<StyledHeader> {t('connectWithUs')}</StyledHeader>}
          />
          <Stack gap="10px">
            <Typography
              lineHeight="1.7"
              fontFamily={FONTS.MAIN_TEXT_FAMILY}
              color="#fff"
              variant="body1"
              fontSize={'1rem'}
              sx={{
                '@media (max-width: 605px)': {
                  fontSize: '1.1rem',
                },
              }}>
              {t('waitingForCall')}
            </Typography>
            <Stack gap="6px">
              {contactPhones.map((phone, i) => (
                <StyledSubText key={i}>
                  <Link
                    href={phone.link}
                    color="inherit"
                    style={{ textDecoration: 'none' }}>
                    {phone.phone}
                  </Link>
                </StyledSubText>
              ))}
            </Stack>
          </Stack>
        </StyledTextBox>
      </Stack>
      <Stack borderTop={`2px solid ${BASE_COLORS.DEFAULT_BLUE}`} />
      <Box
        padding="1.4rem 8%"
        sx={{
          '@media (min-width: 2000px)': {
            padding: '1.4rem',
            width: '110rem',
            margin: '0 auto',
          },
          '@media (max-width: 1024px)': {
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
            padding: '1.4rem 0',
          },
        }}>
        <Copyright />
      </Box>
    </Box>
  );
}
