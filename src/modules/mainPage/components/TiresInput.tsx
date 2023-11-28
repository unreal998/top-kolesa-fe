import { Box, Stack, Typography } from "@mui/material";
import { ImgCarousel } from "../../../shared/components/ImgCarousel";
import { SliderItem } from "../../../shared/types";
import { BASE_COLORS } from "../../../shared/constants";
import { useTranslation } from "react-i18next";
import TiresFilter from "./TiresFilter";

function SliderItemElement(props: SliderItem) {
  return <>{props.description}</>;
}

const sliderData: SliderItem[] = [
  {
    imgSource: "",
    description: (
      <Box
        sx={{
          backgroundImage:
            "url(https://www.logodesignlove.com/wp-content/uploads/2020/01/goodyear-logo-01.jpg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: "200px",
          height: "80px",
          userSelect: "none",
        }}
      />
    ),
  },
  {
    imgSource: "",
    description: (
      <Box
        sx={{
          backgroundImage:
            "url(https://s19532.pcdn.co/wp-content/uploads/2018/08/Linglong-Tire-logo.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: "200px",
          height: "80px",
          userSelect: "none",
        }}
      />
    ),
  },
  {
    imgSource: "",
    description: (
      <Box
        sx={{
          backgroundImage:
            "url(https://1000logos.net/wp-content/uploads/2020/07/Momo-logo.jpg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: "200px",
          height: "80px",
          userSelect: "none",
        }}
      />
    ),
  },
  {
    imgSource: "",
    description: (
      <Box
        sx={{
          backgroundImage:
            "url(https://www.logodesignlove.com/wp-content/uploads/2020/01/goodyear-logo-01.jpg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: "200px",
          height: "80px",
          userSelect: "none",
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
          backgroundImage: "url(./imgs/hero-1-2.jpg)",
          backgroundSize: "cover",
        }}
      >
        <Stack direction="row" alignItems="center" width="75%">
          <Typography
            variant="h2"
            fontWeight="800"
            color="#ffffff"
            width="42%"
            fontFamily="Montserrat, sans-serif"
          >
            {t("tireSelectorTitle")}
          </Typography>
          <TiresFilter />
        </Stack>
      </Box>
      <Stack bgcolor={BASE_COLORS.DEFAULT_BLUE}>
        <Box
          sx={{
            backgroundImage: "url(./imgs/bg-brand.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Stack
            gap="10px"
            justifyContent="space-around"
            padding="20px"
            direction="row"
          >
            <Stack
              gap="10px"
              alignItems="flex-start"
              justifyContent="center"
              color="#fff"
            >
              <Typography
                fontFamily="Montserrat, sans-serif"
                fontWeight="900"
                variant="h2"
              >
                {t("popularBrands")}
              </Typography>
              <Typography fontFamily="PT Sans, sans-serif">
                {" "}
                {t("popularBrandsSubtitle")}
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
              backgroundImage: "url(./imgs/brand-shape.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />
        </Box>
      </Stack>
    </>
  );
}
