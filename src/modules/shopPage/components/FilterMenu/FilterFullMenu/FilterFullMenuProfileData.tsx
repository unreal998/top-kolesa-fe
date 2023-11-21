import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../../reducer";
import { selectFilterData } from "../../../../mainPage/selectors";
import { selectSearchInput, selectSelectedProfile } from "../../../selectors";

import { Box, Button, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
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

function FilterFullMenuProfileData() {
  const dispatch = useDispatch();
  const searchInput = useSelector(selectSearchInput);
  const selectedProfile = useSelector(selectSelectedProfile);
  const filtersParams = useSelector(selectFilterData());
  const [filteredProfileOptions, setFilteredProfileOptions] = useState(
    filtersParams.height
  );

  useEffect(() => {
    const filtered = filtersParams.height
      .filter((option) => option.includes(searchInput))
      .sort((a, b) => Number(a) - Number(b));
    setFilteredProfileOptions(filtered);
  }, [searchInput, filtersParams.height]);

  const handleProfileClick = (profile: string) => {
    dispatch(actions.setSelectedProfile(profile));
    dispatch(actions.toggleFullMenu());
  };

  const handleResetFilterDiametr = () => {
    dispatch(actions.setSelectedProfile(""));
  };

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
          cursor: selectedProfile.length > 0 ? "pointer" : "default",
          color:
            selectedProfile.length > 0
              ? FILTER_COLORS.TEXT_MAIN
              : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
          transition: "all 0.2s ease",
        }}
      >
        <ClearIcon
          style={{
            color:
              selectedProfile.length > 0
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
        {filteredProfileOptions.length > 0 ? (
          filteredProfileOptions.map((heightOption) => (
            <StyledButton
              key={heightOption}
              variant="outlined"
              onClick={() => handleProfileClick(heightOption)}
              style={{
                backgroundColor:
                  heightOption === selectedProfile
                    ? `${FILTER_COLORS.BUTTON_HOVER}`
                    : "transparent",
              }}
            >
              {heightOption}
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

export default FilterFullMenuProfileData;
