import { Button, styled, Box } from "@mui/material";

import { FILTER_COLORS, FILTER_FONT } from "../constants";

const StyledButton = styled(Button)({
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
  fontFamily: FILTER_FONT.BOLD_TEXT_FAMILY,
  background: FILTER_COLORS.SHORT_MENU_RESET_BUTTON_BACKGROUND,
  borderBottom: "none",
  cursor: "pointer",
  "& span": {
    fontFamily: FILTER_FONT.MAIN_TEXT_FAMILY,
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
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | undefined;
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
