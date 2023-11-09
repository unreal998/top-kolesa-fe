import { Box, Stack } from "@mui/material";
import { SliderItem } from "../types";
import { useRef } from "react";
import "./ImgCarousel.css";

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
      overflow="auto"
      width={outerWidth}
      display="flex"
      flexDirection="row"
    >
      <Stack
        direction="row"
        gap={gap}
        ref={sliderRef}
        width={`${innerWidth.toString()}px`}
        sx={{
          marginTop: "-1px",
        }}
      >
        {sliderData.map((item, i) => (
          <ItemElement
            key={i}
            imgSource={item.imgSource}
            description={item.description}
            hoverDescription={item.hoverDescription}
          />
        ))}
      </Stack>
    </Box>
  );
}
