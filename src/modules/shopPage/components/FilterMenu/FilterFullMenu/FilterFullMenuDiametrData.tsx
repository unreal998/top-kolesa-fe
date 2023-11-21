import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilterData } from "../../../../mainPage/selectors";
import { selectSearchInput, selectSelectedDiametr } from "../../../selectors";
import { actions } from "../../../reducer";

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

function FilterFullMenuDiametr() {
  const dispatch = useDispatch();
  const searchInput = useSelector(selectSearchInput);
  const selectedDiametr = useSelector(selectSelectedDiametr);
  const filtersParams = useSelector(selectFilterData());
  const [filteredDiamenrOptions, setFilteredDiamenrOptions] = useState(
    filtersParams.diametr
  );

  useEffect(() => {
    const filtered = filtersParams.diametr.filter((option) =>
      option.includes(searchInput)
    );

    setFilteredDiamenrOptions(filtered);
  }, [searchInput, filtersParams.diametr]);

  function handleDiametrClick(diametr: string) {
    dispatch(actions.setSelectedDiametr(diametr));
    dispatch(actions.toggleFullMenu());
  }

  function handleResetFilterDiametr() {
    dispatch(actions.setSelectedDiametr(""));
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
          cursor: "pointer",
          color:
            selectedDiametr.length > 0
              ? FILTER_COLORS.TEXT_MAIN
              : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
          transition: "all 0.2s ease",
        }}
      >
        <ClearIcon
          style={{
            color:
              selectedDiametr.length > 0
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
        {filteredDiamenrOptions.length > 0 ? (
          filteredDiamenrOptions.map((diametrOption) => (
            <StyledButton
              key={diametrOption}
              variant="outlined"
              onClick={() => handleDiametrClick(diametrOption)}
              style={{
                backgroundColor:
                  diametrOption === selectedDiametr
                    ? `${FILTER_COLORS.BUTTON_HOVER}`
                    : "transparent",
              }}
            >
              {diametrOption}
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

export default FilterFullMenuDiametr;
