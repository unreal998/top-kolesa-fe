import { SyntheticEvent, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../shopPage/reducer";
import { useNavigate } from "react-router-dom";
import { selectFilterData } from "../selectors";
import { useTranslation } from "react-i18next";

import {
  Autocomplete,
  AutocompleteChangeReason,
  Button,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { inputLabelClasses } from "@mui/material/InputLabel";

import { ButtonWithIcon } from "../../../shared/components/ButtonWithIcon";
import { BASE_COLORS, FILTER_COLORS, FONTS } from "../../../shared/constants";

type FieldType = "width" | "profile" | "diametr" | "season" | "brand";

type AutocompleteOptionType = {
  id: FieldType;
  options: string[] | number[];
  label: string;
  onChange: (
    event: SyntheticEvent,
    value: unknown,
    reason: AutocompleteChangeReason
  ) => void;
};

const StyledAutocomplete = styled(Autocomplete)({
  //LABEL COLOR/FONTS
  "&:hover": {
    [`& .${inputLabelClasses.root}.${inputLabelClasses.shrink}`]: {
      color: BASE_COLORS.DEFAULT_BLUE,
    },
  },
  [`& .${inputLabelClasses.root}`]: {
    color: "defaultColor",
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
    [`&.${inputLabelClasses.focused}`]: {
      color: BASE_COLORS.DEFAULT_BLUE,
    },
  },
  //INPUT COLOR/FONTS
  "& .MuiOutlinedInput-root": {
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: BASE_COLORS.DEFAULT_BLUE,
      color: BASE_COLORS.DEFAULT_BLUE,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: BASE_COLORS.DEFAULT_BLUE,
    },
    "&.Mui-focused .MuiInputLabel-root": {
      color: BASE_COLORS.DEFAULT_BLUE,
    },
  },
  "& .MuiAutocomplete-clearIndicator": {
    color: FILTER_COLORS.BUTTON_RESET_FILTER,
  },
  //OPTION COLOR/FONTS
  "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
  },
  "& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover": {
    backgroundColor: FILTER_COLORS.DEFAULT_BLUE_INACTIVE,
  },
  "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']:hover":
    {
      backgroundColor: `${FILTER_COLORS.DEFAULT_BLUE_INACTIVE} !important`,
      color: `${FILTER_COLORS.TEXT_MAIN} !important`,
    },
  "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']": {
    backgroundColor: `${BASE_COLORS.DEFAULT_BLUE} !important`,
    color: `${BASE_COLORS.BACKGROUND_WHITE}`,
  },
});

function TiresFilter() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useNavigate();
  const filtersParams = useSelector(selectFilterData());
  const [width, setWidthValue] = useState("");
  const [profile, setProfileValue] = useState("");
  const [diametr, setDiametrValue] = useState("");
  const [season, setSeasonValue] = useState("");
  const [brand, setBrandValue] = useState("");

  const handleSearchButton = useCallback(() => {
    dispatch(actions.setSelectedWidth(width));
    dispatch(actions.setSelectedProfile(profile));
    dispatch(actions.setSelectedDiametr(diametr));
    dispatch(actions.setSeasonChange([season]));
    dispatch(actions.setBrandChange([brand]));
    history(
      `shop/?price=${JSON.stringify([
        Math.min.apply(null, filtersParams.prices),
        Math.max.apply(null, filtersParams.prices),
      ])}&width=${JSON.stringify(width)}&profile=${JSON.stringify(
        profile
      )}&diametr=${JSON.stringify(diametr)}&season=${JSON.stringify(
        season === t("summer")
          ? "summer"
          : season === t("winter")
          ? "winter"
          : "all-season"
      )}&brand=${JSON.stringify(brand)}`,
      { replace: true }
    );
  }, [
    brand,
    diametr,
    filtersParams.prices,
    history,
    profile,
    season,
    t,
    width,
    dispatch,
  ]);

  const handleAutocompleteChange = useCallback(
    (type: FieldType) =>
      (
        event: SyntheticEvent,
        value: unknown,
        reason: AutocompleteChangeReason
      ) => {
        if (typeof value !== "string") return;
        switch (type) {
          case "width":
            setWidthValue(value);
            break;
          case "profile":
            setProfileValue(value);
            break;
          case "diametr":
            setDiametrValue(value);
            break;
          case "season":
            setSeasonValue(value);
            break;
          case "brand":
            setBrandValue(value);
            break;
          default:
            break;
        }
      },
    []
  );

  const sortOptions = useCallback((options: (string | number)[]) => {
    const optionsCopy = [...options];
    return optionsCopy.sort((a, b) => {
      const aStr = a.toString();
      const bStr = b.toString();
      return isNaN(Number(a)) || isNaN(Number(b))
        ? aStr.localeCompare(bStr)
        : Number(a) - Number(b);
    });
  }, []);

  const autocompleteOptions: AutocompleteOptionType[] = [
    {
      id: "width",
      options: filtersParams?.width,
      label: t("width"),
      onChange: handleAutocompleteChange("width"),
    },
    {
      id: "profile",
      options: filtersParams?.height,
      label: t("profile"),
      onChange: handleAutocompleteChange("profile"),
    },
    {
      id: "diametr",
      options: filtersParams?.diametr,
      label: t("diametr"),
      onChange: handleAutocompleteChange("diametr"),
    },
    {
      id: "season",
      options: [t("summer"), t("winter"), t("all-season")],
      label: t("season"),
      onChange: handleAutocompleteChange("season"),
    },
    {
      id: "brand",
      options: filtersParams?.brands,
      label: t("brand"),
      onChange: handleAutocompleteChange("brand"),
    },
  ];

  return (
    <Stack gap="25px" width="60%" alignItems="center">
      <Typography
        variant="h3"
        color="#ffffff"
        fontWeight="600"
        fontFamily={FONTS.BOLD_TEXT_FAMILY}
      >
        {t("tireSelection")}
      </Typography>
      <Stack
        bgcolor={BASE_COLORS.BACKGROUND_WHITE}
        borderRadius="20px"
        padding="40px 20px"
        justifyContent="center"
        flexWrap="wrap"
        width="480px"
        direction="row"
        gap="20px"
      >
        {autocompleteOptions.map(({ id, options, label, onChange }) => (
          <StyledAutocomplete
            key={id}
            disablePortal
            onChange={onChange}
            options={
              id === "width" || id === "brand" ? sortOptions(options) : options
            }
            sx={{
              width: id === "season" || id === "brand" ? 190 : 120,
            }}
            renderInput={(params) => (
              <TextField
                label={t(label)}
                {...params}
                InputLabelProps={{
                  ...params.InputLabelProps,
                  children: undefined,
                }}
              />
            )}
          />
        ))}
      </Stack>
      <ButtonWithIcon
        button={
          <Button
            variant="contained"
            onClick={handleSearchButton}
            sx={{
              backgroundColor: BASE_COLORS.DEFAULT_BLUE,
              fontWeight: "600",
              fontFamily: FONTS.MAIN_TEXT_FAMILY,
              borderRadius: "999px",
              padding: "20px 40px",
            }}
          >
            {t("searchButton")}
          </Button>
        }
        icon={<ArrowRightIcon />}
      ></ButtonWithIcon>
    </Stack>
  );
}

export default TiresFilter;
