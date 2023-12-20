import { Box, Stack, Typography } from '@mui/material';
import { ImgCarousel } from '../../../shared/components/ImgCarousel';
import { SliderItem } from '../../../shared/types';
import { BASE_COLORS } from '../../../shared/constants';
import { useTranslation } from 'react-i18next';
import TiresFilter from './TiresFilter';

function SliderItemElement(props: SliderItem) {
  return <>{props.description}</>;
}

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
          width: '180px',
          height: '70px',
          userSelect: 'none',
          backgroundColor: '#06469d',
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
          width: '175px',
          height: '70px',
          userSelect: 'none',
          backgroundColor: '#fff',
          backgroundPosition: 'center',
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
          width: '175px',
          height: '70px',
          userSelect: 'none',
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
        width="90%"
        display="flex"
        padding="5%"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        sx={{
          backgroundImage: 'url(./imgs/hero-1-2.jpg)',
          backgroundSize: 'cover',
        }}>
        <Stack direction="row" alignItems="center" width="75%">
          <Typography
            variant="h2"
            fontWeight="800"
            color="#ffffff"
            width="42%"
            fontFamily="Montserrat, sans-serif">
            {t('tireSelectorTitle')}
          </Typography>
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
            padding="20px"
            direction="row">
            <Stack
              gap="10px"
              alignItems="flex-start"
              justifyContent="center"
              color="#fff">
              <Typography
                fontFamily="Montserrat, sans-serif"
                fontWeight="900"
                variant="h2">
                {t('popularBrands')}
              </Typography>
              <Typography fontFamily="PT Sans, sans-serif">
                {' '}
                {t('popularBrandsSubtitle')}
              </Typography>
            </Stack>
            <ImgCarousel
              gap="10px"
              innerWidth={600}
              outerWidth="400px"
              sliderData={sliderData}
              ItemElement={SliderItemElement}
            />
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
