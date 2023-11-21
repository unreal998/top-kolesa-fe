import { Box, TextField, Typography, Button, Slider } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterData } from "../../../../mainPage/selectors";
import { actions } from "../../../reducer";
import { selectSelectedPrice } from "../../../selectors";
import { useState } from "react";
import { FILTER_COLORS, FILTER_FONT } from "../constants";

function FilterFullMenuPriceData() {
  const dispatch = useDispatch();
  const filtersParams = useSelector(selectFilterData());
  const selectedPriceGlobal = useSelector(selectSelectedPrice);
  const [tempPrice, setTempPrice] = useState(selectedPriceGlobal);

  const minPrice = Math.min(...filtersParams.prices);
  const maxPrice = Math.max(...filtersParams.prices);

  function handlePriceChange(event: Event, newValue: number | number[]) {
    setTempPrice(newValue as number[]);
  }

  function handleLeftSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
    let newMinPrice = Math.max(
      parseInt(event.target.value, 10),
      Math.min(...filtersParams.prices)
    );
    newMinPrice = Math.min(newMinPrice, tempPrice[1]);
    setTempPrice([newMinPrice, tempPrice[1]]);
  }

  function handleRightSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
    let newMaxPrice = Math.min(
      parseInt(event.target.value, 10),
      Math.max(...filtersParams.prices)
    );
    newMaxPrice = Math.max(newMaxPrice, tempPrice[0]);
    setTempPrice([tempPrice[0], newMaxPrice]);
  }

  function handleResetFilterPrice() {
    dispatch(actions.setResetPriceRange());
    dispatch(actions.initializePriceRange([minPrice, maxPrice]));
    setTempPrice([minPrice, maxPrice]);
  }

  function handleApplyFilterPrice() {
    dispatch(actions.setPriceChange(tempPrice));
    dispatch(actions.toggleFullMenu());
  }

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      sx={{
        width: "352px",
        padding: "10px",
      }}
    >
      <Box
        onClick={handleResetFilterPrice}
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "12px",
          marginBottom: "32px",
          width: "fit-content",
          cursor:
            (minPrice !== tempPrice[0] && maxPrice !== tempPrice[1]) ||
            tempPrice[0] !== minPrice ||
            tempPrice[1] !== maxPrice
              ? "pointer"
              : "default",
          color:
            (minPrice !== tempPrice[0] && maxPrice !== tempPrice[1]) ||
            tempPrice[0] !== minPrice ||
            tempPrice[1] !== maxPrice
              ? FILTER_COLORS.TEXT_MAIN
              : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
          transition: "all 0.2s ease",
        }}
      >
        <ClearIcon
          style={{
            color:
              (minPrice !== tempPrice[0] && maxPrice !== tempPrice[1]) ||
              tempPrice[0] !== minPrice ||
              tempPrice[1] !== maxPrice
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
      <Box display="flex" justifyContent="space-around" marginBottom="20px">
        <TextField
          label="Min. Price"
          variant="outlined"
          value={tempPrice[0]}
          onChange={handleLeftSliderChange}
          type="number"
          sx={{
            width: "150px",
            "& .MuiInputBase-input": {
              fontFamily: FILTER_FONT.MAIN_TEXT_FAMILY,
            },
            "& .MuiInputLabel-input": {
              fontFamily: FILTER_FONT.MAIN_TEXT_FAMILY,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: FILTER_COLORS.DEFAULT_BLUE,
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: FILTER_COLORS.DEFAULT_BLUE,
              },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: FILTER_COLORS.DEFAULT_BLUE,
            },
            "&:hover .MuiInputLabel-root": {
              color: FILTER_COLORS.DEFAULT_BLUE,
            },
          }}
        />
        <TextField
          label="Max. Price"
          variant="outlined"
          value={tempPrice[1]}
          onChange={handleRightSliderChange}
          type="number"
          sx={{
            width: "150px",
            "& .MuiInputBase-input": {
              fontFamily: FILTER_FONT.MAIN_TEXT_FAMILY,
            },
            "& .MuiInputLabel-input": {
              fontFamily: FILTER_FONT.MAIN_TEXT_FAMILY,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: FILTER_COLORS.DEFAULT_BLUE,
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: FILTER_COLORS.DEFAULT_BLUE,
              },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: FILTER_COLORS.DEFAULT_BLUE,
            },
            "&:hover .MuiInputLabel-root": {
              color: FILTER_COLORS.DEFAULT_BLUE,
            },
          }}
        />
      </Box>
      <Slider
        value={tempPrice}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        step={100}
        min={Math.min.apply(null, filtersParams.prices)}
        max={Math.max.apply(null, filtersParams.prices)}
        sx={{
          width: "90%",
          margin: "0 auto",
          color: FILTER_COLORS.DEFAULT_BLUE,
          "& .MuiSlider-valueLabel": {
            fontFamily: FILTER_FONT.MAIN_TEXT_FAMILY,
          },
        }}
      />
      <Button
        onClick={handleApplyFilterPrice}
        variant="contained"
        sx={{
          marginTop: "18px",
          fontFamily: FILTER_FONT.BOLD_TEXT_FAMILY,
          fontWeight: "bold",
          background: FILTER_COLORS.DEFAULT_BLUE,
          "&:hover": {
            background: FILTER_COLORS.DEFAULT_BLUE,
          },
        }}
      >
        Show
      </Button>
    </Box>
  );
}
export default FilterFullMenuPriceData;
