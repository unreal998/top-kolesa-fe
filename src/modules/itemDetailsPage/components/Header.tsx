import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Box, Rating, Typography } from "@mui/material";

import { selectSelectedItemData } from "../../shopPage/selectors";
import { BASE_COLORS, FONTS } from "../../../shared/constants";

export default function Header() {
  const { t } = useTranslation();
  const selectedItemData = useSelector(selectSelectedItemData());

  return (
    <>
      <Box display={"flex"} alignItems={"center"} mb={1}>
        <Rating name="read-only" value={selectedItemData?.rate} readOnly />
        <Typography
          variant="subtitle1"
          fontFamily={FONTS.MAIN_TEXT_FAMILY}
          color={BASE_COLORS.DEFAULT_BLUE}
          pl={1}
        >
          (1 {t("review")})
        </Typography>
      </Box>
      <Typography
        variant="h4"
        fontFamily={FONTS.BOLD_TEXT_FAMILY}
        fontWeight={600}
        pb={2}
        width={"fit-content"}
      >
        {selectedItemData?.brand} {selectedItemData?.name}{" "}
        {selectedItemData?.width}/{selectedItemData?.height} R
        {selectedItemData?.diametr}
      </Typography>
      <Box borderBottom={`1px dashed ${BASE_COLORS.DEFAULT_BLUE}`}></Box>
      <Box display={"flex"} justifyContent={"space-between"} mt={2}>
        <Box display={"flex"}>
          <Typography
            fontSize="0.8rem"
            fontFamily={FONTS.BOLD_TEXT_FAMILY}
            fontWeight={600}
            color={BASE_COLORS.DEFAULT_GREY}
            variant="body1"
          >
            {t("availability")}:
          </Typography>
          <Typography
            fontSize="0.8rem"
            color={BASE_COLORS.DEFAULT_GREY}
            fontFamily={FONTS.MAIN_TEXT_FAMILY}
            variant="body1"
            pl={0.5}
          >
            {t("inStock")}
          </Typography>
        </Box>
        <Box display={"flex"}>
          <Typography
            fontSize="0.8rem"
            fontFamily={FONTS.BOLD_TEXT_FAMILY}
            fontWeight={600}
            color={BASE_COLORS.DEFAULT_GREY}
            variant="body1"
          >
            {t("article")}:
          </Typography>
          <Typography
            fontSize="0.8rem"
            color={BASE_COLORS.DEFAULT_GREY}
            variant="body1"
            fontFamily={FONTS.MAIN_TEXT_FAMILY}
            pl={0.5}
          >
            {selectedItemData?.id}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
