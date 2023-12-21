import { useSelector } from 'react-redux';

import { Box, Stack, Typography, styled } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { BASE_COLORS, FONTS } from '../../../shared/constants';
import { selectCurrentPageItemList } from '../../shopPage/selectors';
import { ShopItemCard } from '../../shopPage/components/ShopItemCard';

export default function TopRated() {
  const shopItems = useSelector(selectCurrentPageItemList());
  const similarItems = shopItems.sort((a, b) => b.rate - a.rate).slice(0, 10);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
  };

  const SlyderBox = styled(Box)({
    '.slick-dots li button:before': {
      color: BASE_COLORS.DEFAULT_BLUE,
      fontSize: '8px',
    },
    '.slick-dots li.slick-active button:before': {
      color: BASE_COLORS.DEFAULT_BLUE,
    },
    '.slick-slide > div': {
      margin: '0 10px',
    },
  });

  return (
    <Stack spacing={4} mt={5}>
      <Typography
        variant="h5"
        fontFamily={FONTS.BOLD_TEXT_FAMILY}
        fontWeight={600}>
        Top Rated
      </Typography>
      <SlyderBox>
        <Slider {...settings}>
          {similarItems.map((item) => (
            <Box key={item.id} padding={1} sx={{ width: '100%' }}>
              <ShopItemCard
                id={item.id}
                brand={item.brand}
                name={item.name}
                width={item.width}
                height={item.height}
                diametr={item.diametr}
                rating={item.rate}
                price={item.price_uah}
                imgName={item.image_file}
                country={item.country}
                season={item.season}
                year={item.year}
              />
            </Box>
          ))}
        </Slider>
      </SlyderBox>
    </Stack>
  );
}
