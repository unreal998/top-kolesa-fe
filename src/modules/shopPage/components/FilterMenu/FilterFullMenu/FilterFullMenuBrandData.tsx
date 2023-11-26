import { useMemo, useState } from "react";

import { actions } from "../../../reducer";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchInput, selectSelectedBrand } from "../../../selectors";
import { selectFilterData } from "../../../../mainPage/selectors";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  styled,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import {
  FILTER_COLORS,
  FONTS,
  BASE_COLORS,
} from "../../../../../shared/constants";

const CheckBoxContainer = styled("div")({
  display: "grid",
  paddingLeft: "10px",
  gridTemplateColumns: "repeat(2, 1fr)",
  overflowY: "auto",
  maxHeight: "400px",
  width: "362px",
});

function FilterFullMenuBrandData() {
  const dispatch = useDispatch();
  const selectedBrand = useSelector(selectSelectedBrand);
  const searchInput = useSelector(selectSearchInput);
  const filtersParams = useSelector(selectFilterData());
  const [brands, setBrands] = useState(selectedBrand);

  const filteredBrands = useMemo(() => {
    return filtersParams.brands
      .filter((brand) =>
        brand.toLowerCase().includes(searchInput.toLowerCase())
      )
      .sort();
  }, [searchInput, filtersParams.brands]);

  function handleBrandChange(
    e: React.ChangeEvent<HTMLInputElement>,
    newBrand: string
  ) {
    const updatedBrands = e.target.checked
      ? [...brands, newBrand]
      : brands.filter((s) => s !== newBrand);
    setBrands(updatedBrands);
  }

  function handleSubmit() {
    dispatch(actions.setBrandChange(brands));
    dispatch(actions.toggleFullMenu());
  }

  function handleResetFilterBrand() {
    dispatch(actions.setResetBrand());
    setBrands([]);
  }

  return (
    <>
      <Box
        onClick={handleResetFilterBrand}
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "12px",
          marginBottom: "12px",
          width: "fit-content",
          cursor: "pointer",
        }}
      >
        <ClearIcon
          style={{
            color:
              selectedBrand.length > 0 || brands.length > 0
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
        {filteredBrands.length > 0 ? (
          filteredBrands.map((brand) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={brands.includes(brand)}
                  onChange={(e) => handleBrandChange(e, brand)}
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
              label={brand}
              key={brand}
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
        Set
      </Button>
    </>
  );
}

export default FilterFullMenuBrandData;
