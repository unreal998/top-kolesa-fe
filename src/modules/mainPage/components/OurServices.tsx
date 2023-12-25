import { Box, Typography } from '@mui/material';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import { BASE_COLORS, FONTS } from '../../../shared/constants';
import { SliderCarousel } from '../../../shared/components/SliderCarousel';
import { motion } from 'framer-motion';
import StoreIcon from '@mui/icons-material/Store';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import HandymanIcon from '@mui/icons-material/Handyman';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import styled from '@emotion/styled';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  arrows: false,
  responsive: [
    {
      breakpoint: 1020,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 605,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const hoverAnimationBack = {
  rest: {
    y: -100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  hover: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const hoverAnimationHeader = {
  rest: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  hover: {
    y: 30,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
};

const HoverDiv = styled(motion.div)({
  position: 'absolute',
  width: '25rem',
  margin: 'auto',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (max-width: 1350px)': {
    width: '20rem',
  },
  '@media (max-width: 650px)': {
    width: '18rem',
  },
  '@media (max-width: 605px)': {
    width: '30rem',
  },
});

export function OurServices() {
  const { t } = useTranslation();

  const services = [
    {
      title: 'tireSelectionService',
      description: 'tireSelectionServiceDesription',
      imgSrc: './imgs/ourServiceImgs/sr-img-1-1.jpg',
      icon: (
        <StoreIcon
          sx={{
            width: '70px',
            height: '70px',
            marginBottom: '20px',
            color: '#fff',
          }}
        />
      ),
    },
    {
      title: 'diskSelectionService',
      description: 'diskSelectionServiceSubtitle',
      imgSrc: './imgs/ourServiceImgs/sr-img-1-2.jpg',
      icon: (
        <ScreenSearchDesktopIcon
          sx={{
            width: '70px',
            height: '70px',
            marginBottom: '20px',
            color: '#fff',
          }}
        />
      ),
    },
    {
      title: 'serviceStation',
      description: 'serviceStationDescription',
      imgSrc: './imgs/ourServiceImgs/sr-img-1-3.jpg',
      icon: (
        <HandymanIcon
          sx={{
            width: '70px',
            height: '70px',
            marginBottom: '20px',
            color: '#fff',
          }}
        />
      ),
    },
    {
      title: 'storage',
      description: 'storageDescription',
      imgSrc: './imgs/ourServiceImgs/sr-img-1-4.jpg',
      icon: (
        <WarehouseIcon
          sx={{
            width: '70px',
            height: '70px',
            marginBottom: '20px',
            color: '#fff',
          }}
        />
      ),
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      paddingY="8%"
      justifyContent="center"
      alignItems="center"
      gap="20px"
      sx={{
        backgroundImage: 'url(./imgs/bg-4.jpg)',
        backgroundSize: 'contain',
      }}>
      <Typography
        variant="h2"
        color="#000"
        fontFamily={FONTS.BOLD_TEXT_FAMILY}
        fontWeight="800"
        textAlign={'center'}
        mb={1}>
        {t('ourServices')}
      </Typography>
      <SliderCarousel />
      <Box
        width={'80rem'}
        m={'auto'}
        mt={3}
        sx={{
          '@media (max-width: 1350px)': {
            width: '70rem',
          },
          '@media (max-width: 1020px)': {
            width: '50rem',
          },
          '@media (max-width: 650px)': {
            width: '40rem',
          },
          '@media (max-width: 605px)': {
            width: '100%',
          },
        }}>
        <Slider {...settings}>
          {services.map((service, i) => (
            <Box key={i} position="relative" mb={5} width="25rem">
              <motion.div initial="rest" whileHover="hover" animate="rest">
                <Box
                  component="img"
                  src={service.imgSrc}
                  m={'auto'}
                  width={'25rem'}
                  sx={{
                    '@media (max-width: 1350px)': {
                      width: '20rem',
                    },
                    '@media (max-width: 650px)': {
                      width: '18rem',
                    },
                    '@media (max-width: 605px)': {
                      width: '30rem',
                    },
                  }}
                />
                <motion.div variants={hoverAnimationHeader}>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    position="absolute"
                    bottom={-35}
                    left={0}
                    right={0}
                    p={'1.2rem'}
                    fontFamily={FONTS.BOLD_TEXT_FAMILY}
                    bgcolor={BASE_COLORS.DEFAULT_BLUE}
                    width={'16rem'}
                    textAlign={'center'}
                    color={'#fff'}
                    m={'auto'}
                    sx={{
                      '@media (max-width: 1350px)': {
                        padding: '1rem 0.3rem',
                        bottom: -28,
                        width: '14.5rem',
                        fontSize: '1.4rem',
                      },
                      '@media (max-width: 800px)': {
                        padding: '1rem 0rem',
                        width: '15rem',
                        fontSize: '1.5rem',
                      },
                      '@media (max-width: 650px)': {
                        width: '14rem',
                        fontSize: '1.4rem',
                      },
                      '@media (max-width: 605px)': {
                        padding: '1.5rem 3rem',
                        width: '16rem',
                        fontSize: '2rem',
                      },
                    }}>
                    {t(service.title)}
                  </Typography>
                </motion.div>
                <HoverDiv variants={hoverAnimationBack}>
                  <Box textAlign={'center'}>
                    {service.icon}
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      fontFamily={FONTS.BOLD_TEXT_FAMILY}
                      width={250}
                      textAlign={'center'}
                      color={'#fff'}
                      m={'auto'}
                      pb={2}>
                      {t(service.title)}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      fontFamily={FONTS.MAIN_TEXT_FAMILY}
                      width={250}
                      textAlign={'center'}
                      color={'#fff'}
                      m={'auto'}>
                      {t(service.description)}
                    </Typography>
                  </Box>
                </HoverDiv>
              </motion.div>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
