import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { useCallback } from "react";
import { ButtonWithIcon } from "./ButtonWithIcon";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { ImgCarousel } from "../../../shared/components/ImgCarousel";
import { SliderItem } from "../../../shared/types";
import { BASE_COLORS } from "../../../shared/constants";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterData } from "../selectors";
import { actions } from "../../shopPage/reducer";
import { useNavigate } from "react-router-dom";

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
  const filtersParams = useSelector(selectFilterData());

  const [width, setWidthValue] = useState("");
  const [profile, setProfileValue] = useState("");
  const [diametr, setDiametrValue] = useState("");
  const [season, setSeasonValue] = useState("");
  const [brand, setBrandValue] = useState("");
  const history = useNavigate();

  const dispatch = useDispatch();

  const handleSearchButton = useCallback(() => {
    history(
      `shop/?price=${JSON.stringify([
        Math.min.apply(null, filtersParams.prices),
        Math.max.apply(null, filtersParams.prices),
      ])}&width=${JSON.stringify(width)}&profile=${JSON.stringify(
        profile
      )}&diametr=${JSON.stringify(diametr)}&season=${JSON.stringify(
        season
      )}&brand=${JSON.stringify(brand)}`,
      { replace: true }
    );
  }, [brand, diametr, filtersParams.prices, history, profile, season, width]);

  const handleWidthChange = useCallback((event: SelectChangeEvent) => {
    setWidthValue(event.target.value as string);
  }, []);

  const handleProfileChange = useCallback((event: SelectChangeEvent) => {
    setProfileValue(event.target.value as string);
  }, []);

  const handleDiametrChange = useCallback((event: SelectChangeEvent) => {
    setDiametrValue(event.target.value as string);
  }, []);

  const handleSeasonChange = useCallback((event: SelectChangeEvent) => {
    setSeasonValue(event.target.value as string);
  }, []);

  const handleBrandChange = useCallback((event: SelectChangeEvent) => {
    setBrandValue(event.target.value as string);
  }, []);

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
          <Stack gap="25px" width="60%" alignItems="center">
            <Typography
              variant="h3"
              color="#ffffff"
              fontWeight="600"
              fontFamily="Montserrat, sans-serif"
            >
              {t("tireSelection")}
            </Typography>
            <Stack
              bgcolor="rgba(255,255,255, 0.4)"
              borderRadius="20px"
              padding="40px 20px"
              justifyContent="center"
              flexWrap="wrap"
              width="480px"
              direction="row"
              gap="20px"
            >
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>{t("width")}</InputLabel>
                <Select
                  sx={{ opacity: 1 }}
                  size="medium"
                  value={width}
                  label="Width"
                  onChange={handleWidthChange}
                >
                  {filtersParams &&
                    filtersParams?.width.map((item, index) => (
                      <MenuItem key={index} value={index}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>{t("profile")}</InputLabel>
                <Select
                  value={profile}
                  label="Profile"
                  onChange={handleProfileChange}
                >
                  {filtersParams &&
                    filtersParams?.height.map((item, index) => (
                      <MenuItem key={index} value={index}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>{t("diametr")}</InputLabel>
                <Select
                  value={diametr}
                  label="Diameter"
                  onChange={handleDiametrChange}
                >
                  {filtersParams &&
                    filtersParams?.diametr.map((item, index) => (
                      <MenuItem key={index} value={index}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>{t("season")}</InputLabel>
                <Select
                  value={season}
                  label="Season"
                  onChange={handleSeasonChange}
                >
                  <MenuItem value={10}>Winter</MenuItem>
                  <MenuItem value={20}>Summer</MenuItem>
                  <MenuItem value={30}>All</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>{t("brand")}</InputLabel>
                <Select
                  value={brand}
                  label="Brand"
                  onChange={handleBrandChange}
                >
                  {filtersParams &&
                    filtersParams?.brands.map((item, index) => (
                      <MenuItem key={index} value={index}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Stack>
            <ButtonWithIcon
              button={
                <Button
                  variant="contained"
                  onClick={handleSearchButton}
                  sx={{
                    backgroundColor: BASE_COLORS.DEFAULT_BLUE,
                    fontWeight: "600",
                    fontFamily: "PT Sans",
                    borderRadius: "999px",
                    padding: "20px 40px",
                  }}
                >
                  {t("searchButton")}
                </Button>
              }
              icon={<ArrowRightIcon />}
            ></ButtonWithIcon>
          </Stack>
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
