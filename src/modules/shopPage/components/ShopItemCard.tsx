import React, { useEffect, useState } from "react";
import { Box, Link, Rating, Stack, Typography, styled } from "@mui/material";
import { BASE_COLORS, FILTER_COLORS, FONTS } from "../../../shared/constants";
import { ShopItem } from "../reducer";
import { SHOP_ITEM_TIRES_IMG_PREFIX } from "../../../constants";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const HoverableBox = styled(motion.div)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: "calc(100% - 216px)",
  backgroundColor: "rgba(248,248,248,0.85)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
});

const hoverAnimationBack = {
  rest: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  hover: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
const hoverAnimationText = {
  rest: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const StyledText = styled(Typography)({
  fontFamily: `${FONTS.MAIN_TEXT_FAMILY}`,
  fontSize: "1rem",
  color: FILTER_COLORS.TEXT_MAIN,
});

const StyledTextBold = styled(Typography)({
  fontFamily: `${FONTS.BOLD_TEXT_FAMILY}`,
  fontSize: "1rem",
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
}: ShopItem) {
  const { t } = useTranslation();
  const [value, setValue] = useState<number | null>(2);

  useEffect(() => {
    setValue(rating);
  }, [rating]);

  const tableData = [
    { title: t("width"), info: width },
    { title: t("diametr"), info: diametr },
    { title: t("profile"), info: height },
    { title: t("country"), info: country },
    { title: t("season"), info: season },
    { title: t("year"), info: year },
  ];

  return (
    <Link
      href={`/item?id=${id.toString()}`}
      sx={{
        textDecoration: "none",
        outline: "none",
        textAlign: "center",
      }}
    >
      <Stack
        direction="column"
        gap="15px"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <motion.div
          initial="rest"
          whileHover="hover"
          animate="rest"
          style={{ width: "100%" }}
        >
          <Box
            sx={{
              backgroundImage: imgName
                ? `url("${SHOP_ITEM_TIRES_IMG_PREFIX}${imgName}")`
                : `url("./imgs/noPhotoImg.jpg")`,
              width: "100%",
              height: "200px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              marginBottom: "1rem",
            }}
          />
          <Box
            bgcolor={BASE_COLORS.BACKGROUND_WHITE}
            display={"flex"}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="5px"
            width="80%"
            padding="10%"
            height={"7rem"}
          >
            <Rating
              name="read-only"
              value={value}
              readOnly
              sx={{
                paddingBottom: "0.5rem",
              }}
            />
            <Typography
              variant="subtitle1"
              fontFamily={FONTS.BOLD_TEXT_FAMILY}
              fontWeight="600"
              color="#000"
              height={"3rem"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {brand} {name} {width}/{height} R{diametr}
            </Typography>
            <Typography
              variant="h6"
              fontFamily={FONTS.BOLD_TEXT_FAMILY}
              fontWeight="600"
              color={BASE_COLORS.DEFAULT_BLUE}
            >
              {price} {t("uah")}
            </Typography>
          </Box>
          <HoverableBox variants={hoverAnimationBack}>
            <Box width={"100%"} px={"5rem"}>
              <Box mt={"2rem"} mb={"0.5rem"}>
                <InfoOutlinedIcon
                  fontSize="large"
                  sx={{ color: BASE_COLORS.DEFAULT_BLUE }}
                />
                <StyledTextBold>Short Info</StyledTextBold>
              </Box>
              <motion.div variants={hoverAnimationText}>
                {tableData.map((item, index) => (
                  <Box
                    key={index}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <StyledText>{item.title}</StyledText>
                    <StyledTextBold>{item.info}</StyledTextBold>
                  </Box>
                ))}
              </motion.div>
            </Box>
          </HoverableBox>
        </motion.div>
      </Stack>
    </Link>
  );
}
