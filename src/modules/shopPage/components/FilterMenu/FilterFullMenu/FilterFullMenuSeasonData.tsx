import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchInput, selectSelectedSeason } from "../../../selectors";
import { actions } from "../../../reducer";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import {
  FILTER_COLORS,
  FONTS,
  BASE_COLORS,
} from "../../../../../shared/constants";

const CheckBoxContainer = styled(FormGroup)({
  display: "grid",
  paddingLeft: "10px",
  gridTemplateColumns: "repeat(2, 1fr)",
  overflowY: "auto",
  maxHeight: "400px",
  width: "362px",
});

function FilterFullMenuSeasonData() {
  const dispatch = useDispatch();
  const selectedSeason = useSelector(selectSelectedSeason);
  const searchInput = useSelector(selectSearchInput);
  const [season, setSeason] = useState(selectedSeason);

  const filteredSeasons = useMemo(() => {
    return ["Winter", "Summer", "All-season"].filter((season) =>
      season.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [searchInput]);

  function handleSeasonChange(
    e: React.ChangeEvent<HTMLInputElement>,
    seasonName: string
  ) {
    const updatedSeasons = e.target.checked
      ? [...season, seasonName]
      : season.filter((s) => s !== seasonName);
    setSeason(updatedSeasons);
  }

  function handleSubmit() {
    dispatch(actions.setSeasonChange(season));
    dispatch(actions.toggleFullMenu());
  }

  function handleResetFilterSeason() {
    dispatch(actions.setResetSeason());
    setSeason([]);
  }

  return (
    <>
      <Box
        onClick={handleResetFilterSeason}
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "12px",
          marginBottom: "12px",
          width: "fit-content",
          cursor:
            selectedSeason.length > 0 || season.length > 0
              ? "pointer"
              : "default",
          color:
            selectedSeason.length > 0 || season.length > 0
              ? FILTER_COLORS.TEXT_MAIN
              : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
          transition: "all 0.2s ease",
        }}
      >
        <ClearIcon
          style={{
            color:
              selectedSeason.length > 0 || season.length > 0
                ? FILTER_COLORS.BUTTON_RESET_FILTER
                : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
            transition: "all 0.2s ease",
          }}
        />
        <Typography
          sx={{
            fontSize: "14px",
            fontFamily: FONTS.MAIN_TEXT_FAMILY,
          }}
        >
          Reset Filter
        </Typography>
      </Box>
      <CheckBoxContainer>
        {filteredSeasons.length > 0 ? (
          filteredSeasons.map((seasonName) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={season.includes(seasonName)}
                  onChange={(e) => handleSeasonChange(e, seasonName)}
                  sx={{
                    "&.Mui-checked": {
                      color: BASE_COLORS.DEFAULT_BLUE,
                      "&:after": {
                        backgroundColor: BASE_COLORS.DEFAULT_BLUE,
                      },
                    },
                  }}
                />
              }
              label={seasonName}
              key={seasonName}
              sx={{
                "& .MuiTypography-root": {
                  fontFamily: FONTS.MAIN_TEXT_FAMILY,
                },
              }}
            />
          ))
        ) : (
          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: FONTS.MAIN_TEXT_FAMILY,
              marginTop: "20px",
            }}
          >
            No matches found
          </Typography>
        )}
      </CheckBoxContainer>
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{
          marginTop: "18px",
          fontFamily: FONTS.BOLD_TEXT_FAMILY,
          fontWeight: "bold",
          background: BASE_COLORS.DEFAULT_BLUE,
          "&:hover": {
            background: BASE_COLORS.DEFAULT_BLUE,
          },
        }}
      >
        Show
      </Button>
    </>
  );
}

export default FilterFullMenuSeasonData;
