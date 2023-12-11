import { useCallback, useMemo, useState } from "react";

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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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

  const handleBrandChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, newBrand: string) => {
      const updatedBrands = e.target.checked
        ? [...brands, newBrand]
        : brands.filter((s) => s !== newBrand);
      setBrands(updatedBrands);
    },
    [brands]
  );

  const handleSubmit = () => {
    dispatch(actions.setBrandChange(brands));
    dispatch(actions.toggleFullMenu());
  };

  const handleResetFilterBrand = () => {
    dispatch(actions.setResetBrand());
    setBrands([]);
  };

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
          color:
            brands.length > 0
              ? FILTER_COLORS.TEXT_MAIN
              : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
          transition: "all 0.2s ease",
        }}
      >
        <ClearIcon
          style={{
            color:
              brands.length > 0 || brands.length > 0
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
            variant="subtitle2"
            sx={{
              fontFamily: FONTS.MAIN_TEXT_FAMILY,
              marginTop: "20px",
            }}
          >
            {t("noMatchesFound")}
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
        {t("set")}
      </Button>
    </>
  );
}

export default FilterFullMenuBrandData;
