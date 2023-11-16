import { Box, Stack, Typography, styled } from "@mui/material";
import { useState } from "react";
import { ImgCarousel } from "../../../shared/components/ImgCarousel";
import { SliderItem } from "../../../shared/types";
import { ElectricBolt } from "@mui/icons-material";
import { BASE_COLORS } from "../../../shared/constants";
import { useTranslation } from "react-i18next";
import StoreIcon from '@mui/icons-material/Store';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import HandymanIcon from '@mui/icons-material/Handyman';
import WarehouseIcon from '@mui/icons-material/Warehouse';




const SecDividerContainer = styled("div")({
  width: "100px",
  height: "3px",
  textAlign: "center",
  backgroundColor: BASE_COLORS.DEFAULT_BLUE,
});

const StyledServiceDescriptionTypography = styled(Typography)({
  padding: "20px 60px",
  backgroundColor: BASE_COLORS.DEFAULT_BLUE,
  alignSelf: "flex-end",
  fontWeight: "700",
  fontFamily: "Montserrat, sans-serif",
  color: "#fff",
});

const StyledServiceHoverDescriptionStack = styled(Stack)({
  color: "#fff",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  textAlign: "center",
  backgroundColor: "rgba(0,0,0, 0.5)",
  padding: "20% 10% 30% 0%",
  gap: "15px",
  marginBottom: "45px",
});

const SecDividerAnimation = styled("div")({
  width: "20%",
  height: "5px",
  textAlign: "center",
  backgroundColor: BASE_COLORS.DEFAULT_BLUE,
  marginTop: "-1px",
  "-webkit-animation":
    "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite alternate-reverse both",
  animation:
    "slide-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite alternate-reverse both",

  "@-webkit-keyframes slide-right": {
    "0%": {
      "-webkit-transform": "translateX(0)",
      transform: "translateX(0)",
    },
    "100%": {
      "-webkit-transform": "translateX(100px)",
      transform: "translateX(100px)",
    },
  },
  "@keyframes slide-right": {
    "0%": {
      "-webkit-transform": "translateX(0)",
      transform: "translateX(0)",
    },
    "100%": {
      "-webkit-transform": "translateX(100px)",
      transform: "translateX(100px)",
    },
  },
});

function SliderItemElement(props: SliderItem) {
  const [isHover, changeHover] = useState(false);

  return (
    <Box
      display="flex"
      sx={{
        backgroundImage: `url(${props.imgSource})`,
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          cursor: "default",
        },
        userSelect: "none",
      }}
      gap="15px"
      alignItems="flex-start"
      width="430px"
      height="457px"
      onMouseEnter={() => changeHover(true)}
      onMouseLeave={() => changeHover(false)}
    >
      {isHover ? props.hoverDescription : props.description}
    </Box>
  );
}

export function OurServices() {
  const { t } = useTranslation();
  const sliderData: SliderItem[] = [
    {
      imgSource: "./imgs/ourServiceImgs/sr-img-1-1.jpg",
      description: (
        <StyledServiceDescriptionTypography variant="h5">
          {t("tireSelectionService")}
        </StyledServiceDescriptionTypography>
      ),
      hoverDescription: (
        <StyledServiceHoverDescriptionStack>
          <StoreIcon
            sx={{ width: "70px", height: "70px", marginBottom: "20px" }}
          />
          <Typography
            fontWeight="700"
            fontFamily="Montserrat, sans-serif"
            variant="h5"
          >
            {t("tireSelectionService")}
          </Typography>
          <Typography variant="subtitle1" maxWidth="85%">
          {t("tireSelectionServiceDesription")}
          </Typography>
        </StyledServiceHoverDescriptionStack>
      ),
    },
    {
      imgSource: "./imgs/ourServiceImgs/sr-img-1-2.jpg",
      description: (
        <StyledServiceDescriptionTypography variant="h5">
          {t("diskSelectionService")}
        </StyledServiceDescriptionTypography>
      ),
      hoverDescription: (
        <StyledServiceHoverDescriptionStack>
          <ScreenSearchDesktopIcon
            sx={{ width: "70px", height: "70px", marginBottom: "20px" }}
          />
          <Typography
            fontWeight="700"
            fontFamily="Montserrat, sans-serif"
            variant="h5"
          >
            {t("diskSelectionService")}
          </Typography>
          <Typography variant="subtitle1" maxWidth="85%">
          {t("tireSelectionServiceSubtitleDescription")}
          </Typography>
        </StyledServiceHoverDescriptionStack>
      ),
    },
    {
      imgSource: "./imgs/ourServiceImgs/sr-img-1-3.jpg",
      description: (
        <StyledServiceDescriptionTypography variant="h5">
          {t("serviceStation")}
        </StyledServiceDescriptionTypography>
      ),
      hoverDescription: (
        <StyledServiceHoverDescriptionStack>
          <HandymanIcon
            sx={{ width: "70px", height: "70px", marginBottom: "20px" }}
          />
          <Typography
            fontWeight="700"
            fontFamily="Montserrat, sans-serif"
            variant="h5"
          >
            {t("serviceStation")}
          </Typography>
          <Typography variant="subtitle1" maxWidth="85%">
          {t("serviceStationDescription")}
          </Typography>
        </StyledServiceHoverDescriptionStack>
      ),
    },
    {
      imgSource: "./imgs/ourServiceImgs/sr-img-1-4.jpg",
      description: (
        <StyledServiceDescriptionTypography variant="h5">
          {t("storage")}
        </StyledServiceDescriptionTypography>
      ),
      hoverDescription: (
        <StyledServiceHoverDescriptionStack>
          <WarehouseIcon
            sx={{ width: "70px", height: "70px", marginBottom: "20px" }}
          />
          <Typography fontWeight="700" variant="h5">
          {t("storage")}
          </Typography>
          <Typography
            fontFamily="PT Sans, sans-serif"
            variant="subtitle1"
            maxWidth="85%"
          >
            {t("storageDescription")}
          </Typography>
        </StyledServiceHoverDescriptionStack>
      ),
    },
  ];
  return (
    <Box
      display="flex"
      flexDirection="column"
      padding="8%"
      justifyContent="center"
      gap="20px"
      sx={{
        backgroundImage: "url(./imgs/bg-4.jpg)",
        backgroundSize: "contain",
      }}
    >
      <Stack justifyContent="center" alignItems="center" gap="15px">
        <Typography
          variant="h2"
          color="#000"
          fontFamily="Montserrat, sans-serif"
          fontWeight="800"
        >
          {t("ourServices")}
        </Typography>
        <SecDividerContainer>
          <SecDividerAnimation />
        </SecDividerContainer>
        <Typography
          textAlign="center"
          variant="body2"
          width="60%"
          color={BASE_COLORS.DEFAULT_GREY}
        ></Typography>
      </Stack>
      <ImgCarousel
        gap="10px"
        outerWidth="100%"
        innerWidth={1530}
        sliderData={sliderData}
        ItemElement={SliderItemElement}
      />
    </Box>
  );
}
