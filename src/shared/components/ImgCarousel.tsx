import Slider from "react-slick";
import { Box } from "@mui/material";
import { SliderItem } from "../types";
import "slick-carousel/slick/slick.css";

const settings = {
  slidesToShow: 5,
  responsive: [
    {
      breakpoint: 1650,
      settings: {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 0,
        arrows: false,
        dots: true,
      },
    },
    {
      breakpoint: 690,
      settings: {
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        arrows: false,
        dots: true,
      },
    },
    {
      breakpoint: 421,
      settings: {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
        dots: false,
      },
    },
  ],
};

export function ImgCarousel({ sliderData }: { sliderData: SliderItem[] }) {
  return (
    <Slider {...settings}>
      {sliderData.map((item, i) => (
        <Box key={i}>{item.description}</Box>
      ))}
    </Slider>
  );
}
