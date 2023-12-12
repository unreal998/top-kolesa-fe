import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../../reducer";
import { selectFilterData } from "../../../../mainPage/selectors";
import { selectSearchInput, selectSelectedProfile } from "../../../selectors";

import { useTranslation } from "react-i18next";

import { Box, Button, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";

import { FILTER_COLORS, FONTS } from "../../../../../shared/constants";

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
  fontFamily: FONTS.BOLD_TEXT_FAMILY,
  color: `${FILTER_COLORS.TEXT_MAIN}`,
  "&:hover": {
    backgroundColor: `${FILTER_COLORS.BACKGROUND_GREY}`,
    border: "none",
    borderColor: "transparent",
  },
  "&:focus": {
    borderColor: "transparent",
  },
});

function FilterFullMenuProfileData() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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

  const handleProfileClick = useCallback(
    (profile: string) => {
      dispatch(actions.setSelectedProfile(profile));
      dispatch(actions.toggleFullMenu());
    },
    [dispatch]
  );

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
          variant="subtitle2"
          pt={0.2}
          sx={{
            fontFamily: FONTS.MAIN_TEXT_FAMILY,
          }}
        >
          {t("resetFilter")}
        </Typography>
      </Box>
      <ButtonsContainer>
        {filteredProfileOptions.length > 0 ? (
          filteredProfileOptions.slice(1).map((heightOption) => (
            <StyledButton
              key={heightOption}
              variant="outlined"
              onClick={() => handleProfileClick(heightOption)}
              style={{
                backgroundColor:
                  heightOption === selectedProfile
                    ? `${FILTER_COLORS.BACKGROUND_GREY}`
                    : "transparent",
              }}
            >
              {heightOption}
            </StyledButton>
          ))
        ) : (
          <Box
            paddingLeft={1.2}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "200px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: FONTS.MAIN_TEXT_FAMILY,
                marginTop: "20px",
              }}
            >
              {t("noMatchesFound")}
            </Typography>
          </Box>
        )}
      </ButtonsContainer>
    </>
  );
}

export default FilterFullMenuProfileData;
