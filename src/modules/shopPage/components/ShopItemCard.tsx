import React, { useEffect, useState } from 'react';
import { Box, Link, Rating, Stack, Typography, styled } from '@mui/material';
import { BASE_COLORS, FILTER_COLORS, FONTS } from '../../../shared/constants';
import { ShopItem } from '../reducer';
import { SHOP_ITEM_TIRES_IMG_PREFIX } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Opacity } from '@mui/icons-material';

const HoverableBox = styled(motion.div)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 'calc(100% - 216px)',
  backgroundColor: 'rgba(248,248,248,0.85)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 1,

  '@media (max-width: 1050px)': {
    with: '1rem',
  },
  '@media (max-width: 1200px)': {
    bottom: 'calc(100% - 195px)',
  },
  '@media (max-width: 800px)': {
    bottom: 'calc(100% - 175px)',
  },
  '@media (max-width: 500px)': {
    bottom: 'calc(100% - 150px)',
  },
  '@media (max-width: 400px)': {
    bottom: 'calc(100% - 130px)',
  },
});

const hoverAnimationBackVariants = {
  initial: {
    y: 100,
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
  rest: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const StyledText = styled(Typography)({
  fontFamily: `${FONTS.MAIN_TEXT_FAMILY}`,
  fontSize: '1rem',
  color: FILTER_COLORS.TEXT_MAIN,
});

const StyledTextBold = styled(Typography)({
  fontFamily: `${FONTS.BOLD_TEXT_FAMILY}`,
  fontSize: '1rem',
  color: FILTER_COLORS.TEXT_MAIN,
  fontWeight: 600,
});

export function ShopItemCard({
  id,
  brand,
  name,
  width,
  height,
  diametr,
  imgName,
  rating,
  price,
  country,
  season,
  year,
  speed,
  weight,
  param,
}: ShopItem) {
  const { t } = useTranslation();
  const [value, setValue] = useState<number | null>(2);
  const [hoverWindow, setHoverWindow] = useState<boolean>(false);

  useEffect(() => {
    setValue(rating);
  }, [rating]);

  const tableData = [
    { title: t('width'), info: width },
    { title: t('diametr'), info: diametr },
    { title: t('profile'), info: height },
    { title: t('country'), info: country },
    { title: t('season'), info: season },
    { title: t('year'), info: year },
  ];

  const handleHoverOpen = () => {
    setHoverWindow(true);
  };

  const handleHoverClose = () => {
    setHoverWindow(false);
  };

  return (
    <Link
      href={`/item?id=${id.toString()}`}
      sx={{
        textDecoration: 'none',
        outline: 'none',
        textAlign: 'center',
      }}>
      <Stack
        direction="column"
        gap="1rem"
        alignItems="center"
        justifyContent="center"
        position="relative"
        onMouseEnter={handleHoverOpen}
        onMouseLeave={handleHoverClose}
        onTouchStart={handleHoverOpen}
        onTouchEnd={handleHoverClose}>
        <Box style={{ width: '100%' }}>
          <Box
            sx={{
              backgroundImage: imgName
                ? `url("${SHOP_ITEM_TIRES_IMG_PREFIX}${imgName}")`
                : `url("./imgs/noPhotoImg.jpg")`,
              width: '100%',
              height: '12rem',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              marginBottom: '1rem',
            }}
          />
          <Box
            bgcolor={BASE_COLORS.BACKGROUND_WHITE}
            display={'flex'}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="5px"
            width="80%"
            padding="10%"
            height={'5rem'}
            sx={{
              '@media (max-width: 2050px)': {
                height: '4rem',
              },
              '@media (max-width: 1150px)': {
                width: '87%',
                p: '6%',
              },
              '@media (max-width: 550px)': {
                height: '7rem',
                width: '87%',
                p: '6%',
              },
            }}>
            <Rating
              name="read-only"
              value={value}
              readOnly
              sx={{
                paddingBottom: '0.5rem',
              }}
            />
            <Typography
              variant="subtitle1"
              fontFamily={FONTS.BOLD_TEXT_FAMILY}
              fontWeight="600"
              color="#000"
              height={'3rem'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}>
              {brand} {name}
            </Typography>
            <Typography
              variant="subtitle1"
              fontFamily={FONTS.BOLD_TEXT_FAMILY}
              fontWeight="600"
              color="#000"
              height={'3rem'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}>
              {width}/{height} R{diametr} {weight}
              {speed} {param}
            </Typography>
            <Typography
              variant="h6"
              fontFamily={FONTS.BOLD_TEXT_FAMILY}
              fontWeight="600"
              color={BASE_COLORS.DEFAULT_BLUE}>
              {price} {t('uah')}
            </Typography>
          </Box>
          <HoverableBox
            variants={hoverAnimationBackVariants}
            animate={hoverWindow ? 'hover' : 'rest'}
            exit="rest"
            sx={{
              opacity: hoverWindow ? 1 : 0,
            }}>
            <Box
              width={'100%'}
              px={'20%'}
              sx={{
                '@media (max-width: 1150px)': {
                  px: '35%',
                },
                '@media (max-width: 550px)': {
                  px: '28%',
                },
              }}>
              <Box
                mt={'5%'}
                mb={'0.5rem'}
                sx={{
                  '@media (max-width: 1150px)': {
                    mt: '1rem',
                  },
                }}>
                <InfoOutlinedIcon
                  fontSize="large"
                  sx={{ color: BASE_COLORS.DEFAULT_BLUE }}
                />
                <StyledTextBold>{t('shortInfo')}</StyledTextBold>
              </Box>
              <Box>
                {tableData.map((item, index) => (
                  <Box
                    key={index}
                    display={'flex'}
                    justifyContent={'space-between'}>
                    <StyledText>{item.title}</StyledText>
                    <StyledTextBold>{item.info}</StyledTextBold>
                  </Box>
                ))}
              </Box>
            </Box>
          </HoverableBox>
        </Box>
      </Stack>
    </Link>
  );
}
