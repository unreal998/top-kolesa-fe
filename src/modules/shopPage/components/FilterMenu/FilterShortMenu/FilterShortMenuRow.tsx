import { useDispatch } from "react-redux";
import { actions } from "../../../reducer";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, IconButton, styled, Box } from "@mui/material";

import { FILTER_COLORS, FILTER_FONT } from "../constants";

const StyledButton = styled(Button)(({ params }: { params: string }) => ({
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
  borderBottom: "none",
  "& span": {
    fontFamily: FILTER_FONT.MAIN_TEXT_FAMILY,
    fontWeight: "400",
    fontSize: "16px",
    color: `${FILTER_COLORS.TEXT_MAIN}`,
  },
  "& p": {
    fontSize: "16px",
    color:
      params && params.length > 0
        ? FILTER_COLORS.DEFAULT_BLUE
        : FILTER_COLORS.TEXT_SHORT_MENU,
    transition: "color 0.2s ease",
  },
  "&:hover": {
    backgroundColor: "transparent",
    borderColor: FILTER_COLORS.BORDER,
    borderBottom: "none",
  },
  "&:active": {
    backgroundColor: "transparent",
    borderColor: FILTER_COLORS.BORDER,
    borderBottom: "none",
  },
}));

type FilterShortMenuRowProps = {
  filterName: "Width" | "Profile" | "Diametr";
  icon: React.ReactNode;
  params: string;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | undefined;
};

function FilterShortMenuRow({
  icon,
  filterName,
  params,
  onClick,
}: FilterShortMenuRowProps) {
  const dispatch = useDispatch();

  function handleMenuToggle() {
    const tabIndex =
      filterName === "Width" ? 0 : filterName === "Profile" ? 1 : 2;
    dispatch(actions.toggleFullMenu(tabIndex));
  }

  return (
    <StyledButton onClick={handleMenuToggle} params={params}>
      <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            color:
              params && params.length > 0
                ? FILTER_COLORS.DEFAULT_BLUE
                : FILTER_COLORS.TEXT_SHORT_MENU,
            transition: "color 0.2s ease",
          }}
        >
          {icon}
        </Box>
        <p
          style={{
            marginLeft: `${
              filterName === "Width"
                ? "10px"
                : filterName === "Profile"
                ? "11px"
                : "13px"
            }`,
          }}
        >
          {filterName}
        </p>
      </Box>
      {params.length > 0 && (
        <Box display={"flex"}>
          <span>{params}</span>
          <IconButton onClick={onClick} sx={{ padding: "1px", color: "red" }}>
            <ClearIcon sx={{ padding: "1px" }} />
          </IconButton>
        </Box>
      )}
      <ArrowForwardIosIcon sx={{ height: "20px" }} />
    </StyledButton>
  );
}

export default FilterShortMenuRow;
