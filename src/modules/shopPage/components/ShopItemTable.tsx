import React, { useEffect, useState } from 'react';
import { Box, Link, Rating, Stack, Typography, styled } from '@mui/material';
import { BASE_COLORS, FILTER_COLORS, FONTS } from '../../../shared/constants';
import { ShopItem } from '../reducer';
import { SHOP_ITEM_TIRES_IMG_PREFIX } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const HoverableBox = styled(motion.div)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 'calc(100% - 50%)',
  backgroundColor: 'rgba(248,248,248,0.85)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0,
  height: '100%',

  '@media (max-width: 2000px)': {
    right: 'calc(100% - 45%)',
  },
});

const hoverAnimationBackVariants = {
  initial: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  hover: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  tap: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  rest: {
    x: 100,
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

export function ShopItemTable({
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
}: ShopItem) {
  const { t } = useTranslation();
  const [value, setValue] = useState<number | null>(2);

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

  return (
    <Link
      href={`/item?id=${id.toString()}`}
      sx={{
        textDecoration: 'none',
        outline: 'none',
        textAlign: 'center',
      }}>
      <Box position="relative">
        <motion.div
          initial="rest"
          whileHover="hover"
          animate="rest"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Box
            sx={{
              backgroundImage: imgName
                ? `url("${SHOP_ITEM_TIRES_IMG_PREFIX}${imgName}")`
                : `url("./imgs/noPhotoImg.jpg")`,
              width: '30rem',
              height: '12rem',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              '@media (max-width: 1150px)': {
                width: '20rem',
              },
            }}
          />
          <Stack
            bgcolor={BASE_COLORS.BACKGROUND_WHITE}
            display={'flex'}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="5px"
            width="100%"
            height={'12rem'}
            px={'2rem'}>
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
              height={'4.5rem'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}>
              {brand} {name} {width}/{height} R{diametr}
            </Typography>
            <Typography
              variant="h6"
              fontFamily={FONTS.BOLD_TEXT_FAMILY}
              fontWeight="600"
              color={BASE_COLORS.DEFAULT_BLUE}>
              {price} {t('uah')}
            </Typography>
          </Stack>
          <HoverableBox
            variants={hoverAnimationBackVariants}
            initial="initial"
            whileHover="hover"
            animate="rest"
            whileTap="tap"
            exit="rest">
            <Box
              width={'130%'}
              px={'1.5rem'}
              mr={'0.7rem'}
              sx={{
                '@media (max-width: 1150px)': {
                  px: '15%',
                  mr: '25%',
                },
                '@media (max-width: 650px)': {
                  px: '15%',
                  mr: '15%',
                },
                '@media (max-width: 400px)': {
                  px: '5%',
                  mr: '5%',
                },
              }}>
              <Box
                display={'flex'}
                justifyContent={'center'}
                textAlign={'center'}
                gap={'0.5rem'}
                mb={'0.5rem'}>
                <InfoOutlinedIcon
                  fontSize="medium"
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
        </motion.div>
      </Box>
    </Link>
  );
}
