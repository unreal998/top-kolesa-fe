import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../reducer";
import { selectFilterData } from "../../../../mainPage/selectors";

import { Button, IconButton, styled, Box, ButtonGroup } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ClearIcon from "@mui/icons-material/Clear";

import { FILTER_COLORS, FILTER_FONT } from "../constants";

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
  fontFamily: FILTER_FONT.BOLD_TEXT_FAMILY,
  borderTop: "none",
  "& span": {
    fontFamily: FILTER_FONT.MAIN_TEXT_FAMILY,
    fontWeight: "400",
    fontSize: "10px",
    transition: "color 0.2s ease",
  },
  "& p": {
    fontSize: "16px",

    transition: "color 0.2s ease",
  },
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
  fontFamily: FILTER_FONT.BOLD_TEXT_FAMILY,
  borderTop: "none",
  cursor: "default",
  "& p": {
    padding: 0,
    margin: 0,
    color: FILTER_COLORS.TEXT_MAIN,
    fontSize: "13px",
    fontFamily: FILTER_FONT.MAIN_TEXT_FAMILY,
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

type FilterShortMenuRowProps = {
  filterName: "Price";
  icon: React.ReactNode;
  params: number[];
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | undefined;
};

function FilterShortMenuColumnPrice({
  icon,
  filterName,
  params,
  onClick,
}: FilterShortMenuRowProps) {
  const dispatch = useDispatch();
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
                ? FILTER_COLORS.DEFAULT_BLUE
                : FILTER_COLORS.TEXT_SHORT_MENU,
              transition: "color 0.2s ease",
            }}
          >
            {icon}
          </Box>
          <p
            style={{
              marginLeft: "11px",
              color: visableParams
                ? FILTER_COLORS.DEFAULT_BLUE
                : FILTER_COLORS.TEXT_SHORT_MENU,
              transition: "color 0.2s ease",
            }}
          >
            {filterName}
          </p>
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
            <IconButton
              onClick={onClick}
              size="small"
              sx={{
                color: "red",
                padding: "2px",
              }}
            >
              <ClearIcon fontSize="inherit" />
            </IconButton>
            <p>
              from {params[0]} to {params[1]}
            </p>
          </Box>
        </StyledButtonSecondary>
      )}
    </ButtonGroup>
  );
}

export default FilterShortMenuColumnPrice;
