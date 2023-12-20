import { Box, Stack } from '@mui/material';
import { SliderItem } from '../types';
import { useRef } from 'react';
import './ImgCarousel.css';

interface IImgCarousel {
  sliderData: SliderItem[];
  ItemElement: (props: SliderItem) => JSX.Element;
  gap: string;
  innerWidth: number;
  outerWidth: string;
}

export function ImgCarousel({
  sliderData,
  ItemElement,
  gap,
  innerWidth,
  outerWidth,
}: IImgCarousel) {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  return (
    <Box
      ref={containerRef}
      sx={{
        overflowX: 'auto',
        width: outerWidth,
        display: 'flex',
        flexDirection: 'row',
        '&::-webkit-scrollbar': {
          display: 'none', // for Safari and Chrome
        },
        scrollbarWidth: 'none', // for Firefox
        msOverflowStyle: 'none', // for Internet Explorer 10+
      }}>
      <Stack
        direction="row"
        gap={gap}
        ref={sliderRef}
        sx={{
          marginTop: '-1px',
          flexWrap: 'nowrap',
        }}>
        {sliderData.map((item, i) => (
          <ItemElement key={i} {...item} />
        ))}
      </Stack>
    </Box>
  );
}
