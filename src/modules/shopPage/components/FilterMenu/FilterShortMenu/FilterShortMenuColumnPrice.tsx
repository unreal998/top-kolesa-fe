import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../reducer";
import { selectFilterData } from "../../../../mainPage/selectors";

import { Button, styled, Box, ButtonGroup, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ClearIcon from "@mui/icons-material/Clear";

import {
  FILTER_COLORS,
  FONTS,
  BASE_COLORS,
} from "../../../../../shared/constants";
import { useTranslation } from "react-i18next";

const StyledButtonMain = styled(Button)({
  display: "flex",
  padding: "0 0 0 12px",
  boxSizing: "border-box",
  alignItems: "center",
  fontWeight: "600",
  height: "59px",
  width: "252px",
  borderRadius: 0,
  borderColor: FILTER_COLORS.BORDER,
  color: FILTER_COLORS.TEXT_SHORT_MENU,
  fontFamily: FONTS.BOLD_TEXT_FAMILY,
  borderTop: "none",
  "&:hover": {
    backgroundColor: "transparent",
    borderColor: FILTER_COLORS.BORDER,
    borderTop: "none",
  },
  "&:active": {
    backgroundColor: "transparent",
    borderColor: FILTER_COLORS.BORDER,
    borderTop: "none",
  },
});

const StyledButtonSecondary = styled(Button)({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "flex-start",
  padding: 0,
  borderRadius: 0,
  borderColor: FILTER_COLORS.BORDER,
  color: FILTER_COLORS.TEXT_SHORT_MENU,
  fontFamily: FONTS.BOLD_TEXT_FAMILY,
  borderTop: "none",
  cursor: "default",
  "& p": {
    color: FILTER_COLORS.TEXT_MAIN,
    fontSize: "13px",
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
    textTransform: "lowercase",
  },
  "&:hover": {
    backgroundColor: "transparent",
    borderColor: FILTER_COLORS.BORDER,
  },
  "&:active": {
    backgroundColor: "transparent",
    borderColor: FILTER_COLORS.BORDER,
    boxShadow: "none",
  },
});

type FilterShortMenuColumnPriceProps = {
  filterName: "Price";
  icon: React.ReactNode;
  params: number[];
  onClick?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void | undefined;
};

function FilterShortMenuColumnPrice({
  icon,
  filterName,
  params,
  onClick,
}: FilterShortMenuColumnPriceProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const filtersParams = useSelector(selectFilterData());
  const minPrice = Math.min(...filtersParams.prices);
  const maxPrice = Math.max(...filtersParams.prices);

  const visableParams =
    maxPrice === params[1] && minPrice === params[0] ? false : true;

  function handleMenuToggle() {
    dispatch(actions.toggleFullMenu(3));
  }

  return (
    <ButtonGroup
      orientation="vertical"
      fullWidth
      variant="outlined"
      aria-label="vertical contained button group"
      sx={{
        borderTop: visableParams
          ? `1px solid ${FILTER_COLORS.BORDER}`
          : `1px solid ${FILTER_COLORS.BORDER}`,
        borderRadius: 0,
        "&:hover": {
          borderTop: visableParams
            ? `1px solid ${FILTER_COLORS.BORDER}`
            : `1px solid ${FILTER_COLORS.BORDER}`,
        },
      }}
    >
      <StyledButtonMain
        onClick={handleMenuToggle}
        sx={{
          borderBottom: visableParams
            ? "none"
            : `1px solid ${FILTER_COLORS.BORDER}`,
          "&:hover": {
            borderBottom: visableParams
              ? "none"
              : `1px solid ${FILTER_COLORS.BORDER}`,
          },
          "&:active": {
            borderBottom: visableParams
              ? "none"
              : `1px solid ${FILTER_COLORS.BORDER}`,
          },
        }}
      >
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              color: visableParams
                ? BASE_COLORS.DEFAULT_BLUE
                : FILTER_COLORS.TEXT_SHORT_MENU,
              transition: "color 0.2s ease",
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="body1"
            fontFamily={FONTS.BOLD_TEXT_FAMILY}
            fontWeight={600}
            style={{
              marginLeft: "11px",
              color: visableParams
                ? BASE_COLORS.DEFAULT_BLUE
                : FILTER_COLORS.TEXT_SHORT_MENU,
              transition: "color 0.2s ease",
            }}
          >
            {t("price")}
          </Typography>
        </Box>
        <ArrowForwardIosIcon sx={{ height: "20px" }} />
      </StyledButtonMain>
      {visableParams && (
        <StyledButtonSecondary
          disableRipple={true}
          sx={{
            borderTop: visableParams
              ? "none"
              : `1px solid ${FILTER_COLORS.BORDER}`,
            "&:hover": {
              borderTop: visableParams
                ? "none"
                : `1px solid ${FILTER_COLORS.BORDER}`,
            },
            "&:active": {
              borderTop: visableParams
                ? "none"
                : `1px solid ${FILTER_COLORS.BORDER}`,
            },
          }}
        >
          <Box display="flex" alignItems="center" sx={{ padding: "0 12px" }}>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                padding: "1px",
                color: "red",
                cursor: "pointer",
                borderRadius: "50%",
                transition: "all 0.5s",
                "&:hover": {
                  backgroundColor: FILTER_COLORS.BACKGROUND_GREY,
                  transition: "all 0.3s",
                },
              }}
              onClick={onClick}
            >
              <ClearIcon fontSize="inherit" />
            </Box>
            <Typography variant="body2">
              {t("from")} {params[0]} {t("to")} {params[1]}
            </Typography>
          </Box>
        </StyledButtonSecondary>
      )}
    </ButtonGroup>
  );
}

export default FilterShortMenuColumnPrice;
