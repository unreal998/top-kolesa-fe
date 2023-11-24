import { styled, Box } from "@mui/material";

import { FILTER_COLORS, FONTS } from "../../../../../shared/constants";

const StyledButton = styled(Box)({
  display: "flex",
  padding: "0 0 0 12px",
  boxSizing: "border-box",
  alignItems: "center",
  fontWeight: "600",
  height: "59px",
  width: "252px",
  borderRadius: 0,
  borderColor: FILTER_COLORS.BORDER,
  color: FILTER_COLORS.TEXT_MAIN,
  fontFamily: FONTS.BOLD_TEXT_FAMILY,
  background: FILTER_COLORS.SHORT_MENU_RESET_BUTTON_BACKGROUND,
  borderBottom: "none",
  cursor: "pointer",
  "& span": {
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
    fontWeight: "400",
    fontSize: "16px",
    color: `${FILTER_COLORS.TEXT_MAIN}`,
  },
  "& p": {
    fontSize: "16px",
    transition: "color 0.2s ease",
  },
  "&:hover": {
    backgroundColor: FILTER_COLORS.SHORT_MENU_RESET_BUTTON_BACKGROUND,
    borderColor: FILTER_COLORS.BORDER,
    borderBottom: "none",
  },
  "&:active": {
    backgroundColor: FILTER_COLORS.SHORT_MENU_RESET_BUTTON_BACKGROUND,
    borderColor: FILTER_COLORS.BORDER,
    borderBottom: "none",
  },
});

type FilterShortMenuRowProps = {
  icon: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

function FilterShortMenuReset({ icon, onClick }: FilterShortMenuRowProps) {
  return (
    <StyledButton onClick={onClick}>
      <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          {icon}
        </Box>
        <p
          style={{
            marginLeft: "13px",
          }}
        >
          Reset All Filters
        </p>
      </Box>
    </StyledButton>
  );
}

export default FilterShortMenuReset;
