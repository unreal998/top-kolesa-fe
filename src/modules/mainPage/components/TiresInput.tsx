import { Box, Stack, Typography } from '@mui/material';
import { ImgCarousel } from '../../../shared/components/ImgCarousel';
import { SliderItem } from '../../../shared/types';
import { BASE_COLORS } from '../../../shared/constants';
import { useTranslation } from 'react-i18next';
import TiresFilter from './TiresFilter';

const sliderData: SliderItem[] = [
  {
    imgSource: '',
    description: (
      <Box
        sx={{
          backgroundImage: 'url(./imgs/tireBrands/michelinLogo.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '200px',
          height: '70px',
          userSelect: 'none',
          backgroundColor: '#fff',
          '@media (max-width: 520px)': {
            width: '170px',
            height: '60px',
          },
        }}
      />
    ),
  },
  {
    imgSource: '',
    description: (
      <Box
        sx={{
          backgroundImage: 'url(./imgs/tireBrands/goodyearLogo.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '200px',
          height: '70px',
          userSelect: 'none',
          backgroundColor: '#06469d',
          '@media (max-width: 520px)': {
            width: '170px',
            height: '60px',
          },
        }}
      />
    ),
  },
  {
    imgSource: '',
    description: (
      <Box
        sx={{
          backgroundImage: 'url(./imgs/tireBrands/continentalLogo.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '200px',
          height: '80px',
          userSelect: 'none',
          '@media (max-width: 520px)': {
            width: '170px',
            height: '60px',
          },
        }}
      />
    ),
  },
  {
    imgSource: '',
    description: (
      <Box
        sx={{
          backgroundImage: 'url(./imgs/tireBrands/linglongLogo.jpg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '200px',
          height: '70px',
          userSelect: 'none',
          backgroundColor: '#fff',
          backgroundPosition: 'center',
          marginX: '1px',
          '@media (max-width: 520px)': {
            width: '170px',
            height: '60px',
          },
        }}
      />
    ),
  },
  {
    imgSource: '',
    description: (
      <Box
        sx={{
          backgroundImage: 'url(./imgs/tireBrands/fuldaLogo.jpg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '180px',
          height: '70px',
          userSelect: 'none',
          '@media (max-width: 520px)': {
            width: '170px',
            height: '60px',
          },
        }}
      />
    ),
  },
];

export function TiresInput() {
  const { t } = useTranslation();

  return (
    <>
      <Box
        display="flex"
        padding="5%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position={'relative'}
        sx={{
          backgroundImage: 'url(./imgs/hero-1-2.jpg)',
          backgroundSize: 'cover',
        }}>
        <Typography
          variant="h2"
          fontWeight="800"
          color="#ffffff"
          fontFamily="Montserrat, sans-serif"
          position={'absolute'}
          left={'4%'}
          top={'36%'}
          sx={{
            '@media (max-width: 1600px)': {
              width: '10rem',
              top: '20%',
            },
            '@media (max-width: 1100px)': {
              top: '36%',
              fontSize: '3rem',
            },
            '@media (max-width: 975px)': {
              display: 'none',
            },
          }}>
          {t('tireSelectorTitle1')}
        </Typography>
        <Typography
          variant="h2"
          fontWeight="800"
          color="#ffffff"
          fontFamily="Montserrat, sans-serif"
          position={'absolute'}
          left={'4%'}
          top={'48%'}
          sx={{

            '@media (max-width: 1600px)': {
              width: '10rem',
            },
            '@media (max-width: 1100px)': {
              top: '36%',
              left: '77%',
              fontSize: '3rem',
            },
            '@media (max-width: 975px)': {
              display: 'none',
            },
          }}>
          {t('tireSelectorTitle2')}
        </Typography>
        <Stack direction="row" alignContent={'center'}>
          <TiresFilter />
        </Stack>
      </Box>
      <Stack bgcolor={BASE_COLORS.DEFAULT_BLUE}>
        <Box
          sx={{
            backgroundImage: 'url(./imgs/bg-brand.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}>
          <Stack
            gap="10px"
            justifyContent="space-around"
            padding="2rem"
            direction="column"
            sx={{
              '@media (max-width: 500px)': {
                padding: '2rem 0',
              },
            }}>
            <Stack gap="10px" color="#fff">
              <Typography
                fontFamily="Montserrat, sans-serif"
                fontWeight="900"
                variant="h2"
                m={'auto'}>
                {t('popularBrands')}
              </Typography>
            </Stack>
            <Box
              p={'1rem 0'}
              width={'70rem'}
              m={'auto'}
              pl={'25px'}
              sx={{
                '@media (max-width: 1650px)': {
                  width: '40rem',
                },
                '@media (max-width: 1200px)': {
                  width: '50rem',
                },
                '@media (max-width: 690px)': {
                  width: '35rem',
                },
                '@media (max-width: 420px)': {
                  margin: 'auto',
                  width: '180px',
                },
              }}>
              <ImgCarousel sliderData={sliderData} />
            </Box>
            <Typography
              variant="subtitle1"
              fontFamily="PT Sans, sans-serif"
              m={'auto'}
              color="#fff"
              fontSize={'20px'}
              sx={{
                '@media (max-width: 600px)': {
                  fontSize: '1.3rem',
                },
                '@media (max-width: 400px)': {
                  fontSize: '1.3rem',
                },
              }}>
              {t('popularBrandsSubtitle')}
            </Typography>
          </Stack>
          <Box
            height="40px"
            sx={{
              backgroundImage: 'url(./imgs/brand-shape.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
        </Box>
      </Stack>
    </>
  );
}
