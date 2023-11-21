import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../../reducer";
import { selectFilterData } from "../../../../mainPage/selectors";
import { selectSearchInput, selectSelectedWidth } from "../../../selectors";

import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { FILTER_COLORS, FILTER_FONT } from "../constants";

const ButtonsContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  overflowY: "auto",
  maxHeight: "472px",
  width: "372px",
});

const StyledButton = styled(Button)({
  height: "59px",
  border: "none",
  fontSize: "1.2rem",
  fontFamily: FILTER_FONT.BOLD_TEXT_FAMILY,
  color: `${FILTER_COLORS.TEXT_MAIN}`,
  "&:hover": {
    backgroundColor: `${FILTER_COLORS.BUTTON_HOVER}`,
    border: "none",
    borderColor: "transparent",
  },
  "&:focus": {
    borderColor: "transparent",
  },
});

function FilterFullMenuWidthData() {
  const dispatch = useDispatch();
  const searchInput = useSelector(selectSearchInput);
  const selectedWidth = useSelector(selectSelectedWidth);
  const filtersParams = useSelector(selectFilterData());
  const [filteredWidthOptions, setFilteredWidthOptions] = useState(
    filtersParams.width
  );

  useEffect(() => {
    const filtered = filtersParams.width
      .filter((option) => option.includes(searchInput))
      .sort((a, b) => Number(a) - Number(b));
    setFilteredWidthOptions(filtered);
  }, [searchInput, filtersParams.width]);

  function handleWidthClick(width: string) {
    dispatch(actions.setSelectedWidth(width));
    dispatch(actions.toggleFullMenu());
  }

  function handleResetFilterDiametr() {
    dispatch(actions.setSelectedWidth(""));
  }

  return (
    <>
      <Box
        onClick={handleResetFilterDiametr}
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "12px",
          marginBottom: "12px",
          width: "fit-content",
          cursor: selectedWidth.length > 0 ? "pointer" : "default",
          color:
            selectedWidth.length > 0
              ? FILTER_COLORS.TEXT_MAIN
              : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
          transition: "all 0.2s ease",
        }}
      >
        <ClearIcon
          style={{
            color:
              selectedWidth.length > 0
                ? FILTER_COLORS.BUTTON_RESET_FILTER
                : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
            transition: "all 0.2s ease",
          }}
        />
        <Typography
          sx={{
            fontSize: "14px",
            fontFamily: FILTER_FONT.MAIN_TEXT_FAMILY,
          }}
        >
          Reset Filter
        </Typography>
      </Box>
      <ButtonsContainer>
        {filteredWidthOptions.length > 0 ? (
          filteredWidthOptions.map((widthOption) => (
            <StyledButton
              key={widthOption}
              variant="outlined"
              onClick={() => handleWidthClick(widthOption)}
              style={{
                backgroundColor:
                  widthOption === selectedWidth
                    ? `${FILTER_COLORS.BUTTON_HOVER}`
                    : "transparent",
              }}
            >
              {widthOption}
            </StyledButton>
          ))
        ) : (
          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: FILTER_FONT.MAIN_TEXT_FAMILY,
              marginTop: "20px",
            }}
          >
            No matches found
          </Typography>
        )}
      </ButtonsContainer>
    </>
  );
}

export default FilterFullMenuWidthData;
