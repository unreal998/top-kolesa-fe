import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Slider,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { BASE_COLORS } from "../../../shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../reducer";
import { selectFilterData } from "../../mainPage/selectors";
import { CLIENT_URL, SERVER_URL } from "../../../constants";

const FilterButton = styled(ListItemButton)({
  color: "#fff",
  padding: "15px",
  borderRadius: 0,
  "&:hover": {
    backgroundColor: "#1565c0",
  },
  "&:focus": {
    border: `1px solid ${BASE_COLORS.DEFAULT_BLUE}`,
    backgroundColor: "#fff",
    color: BASE_COLORS.DEFAULT_BLUE,
  },
});

type ModalState = {
  width: boolean;
  profile: boolean;
  diametr: boolean;
  price: boolean;
  season: boolean;
  brand: boolean;
};

function valuetext(value: number) {
  return `${value} uah`;
}

export function FilterBar() {
  const [open, setOpen] = React.useState({
    width: false,
    profile: false,
    diametr: false,
    price: false,
    season: false,
    brand: false,
  } as ModalState);

  const history = useNavigate();
  const [searchParams] = useSearchParams();

  const [price, setPriceValue] = useState<number[]>([0, 0]);
  const [width, setWidthValue] = useState("");
  const [profile, setProfileValue] = useState("");
  const [diametr, setDiametrValue] = useState("");
  const [season, setSeasonValue] = useState({
    winter: false,
    summer: false,
    allSeason: false,
  });
  const [brand, setBrandValue] = useState("");
  const dispatch = useDispatch();
  const filtersParams = useSelector(selectFilterData());

  const handleClick = useCallback(
    (id: string) => {
      setOpen({
        ...open,
        [id]: !open[id as keyof ModalState],
      });
    },
    [open],
  );

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceValue(newValue as number[]);
  };
  const handleWidthChange = (
    event: SyntheticEvent<Element, Event>,
    value: string | null,
  ) => {
    setWidthValue(value as string);
  };
  const handleProfileChange = (
    event: SyntheticEvent<Element, Event>,
    value: string | null,
  ) => {
    setProfileValue(value as string);
  };
  const handleDiametrChange = (
    event: SyntheticEvent<Element, Event>,
    value: string | null,
  ) => {
    setDiametrValue(value as string);
  };
  const handleSeasonChange = (name: string, checked: boolean) => {
    setSeasonValue({
      ...season,
      [name]: checked,
    });
  };
  const handleBrandChange = (
    event: SyntheticEvent<Element, Event>,
    value: string | null,
  ) => {
    setBrandValue(value as string);
  };

  const handleApplyButtonPress = useCallback(() => {
    history(
      `?price=${JSON.stringify(
        price,
      )}&width=${width}&profile=${profile}&diametr=${diametr}&season=${JSON.stringify(season)}&brand=${brand}`,
    );
  }, [brand, diametr, history, price, profile, season, width]);

  useEffect(() => {
    const priceFilter = searchParams.get("price");
    const widthFilter = searchParams.get("width");
    const profileFilter = searchParams.get("profile");
    const diametrFilter = searchParams.get("diametr");
    const seasonFilter = searchParams.get("season");
    const brandFilter = searchParams.get("brand");
    const priceArray = priceFilter
      ? [JSON.parse(priceFilter)[0], JSON.parse(priceFilter)[1]]
      : [
          Math.min.apply(null, filtersParams.prices),
          Math.max.apply(null, filtersParams.prices),
        ];
    setPriceValue(priceArray);
    setWidthValue(widthFilter || "");
    setProfileValue(profileFilter || "");
    setDiametrValue(diametrFilter || "");
    setSeasonValue(seasonFilter ? JSON.parse(seasonFilter) : "");
    setBrandValue(brandFilter || "");
  }, [filtersParams, searchParams]);

  return (
    <Stack
      sx={{
        width: "360px",
        position: "sticky",
        top: "0px",
        bgcolor: BASE_COLORS.DEFAULT_BLUE,
        borderRadius: "2px",
      }}
      direction="column"
    >
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
        }}
        component="nav"
      >
        <FilterButton onClick={() => handleClick("price")}>
          <ListItemText primary="Price" />
          {open.price ? <ExpandLess /> : <ExpandMore />}
        </FilterButton>
        <Collapse in={open.price} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Slider
              defaultValue={0}
              value={price}
              onChange={handlePriceChange}
              max={Math.max.apply(null, filtersParams.prices)}
              step={100}
              valueLabelDisplay="on"
            />
          </List>
        </Collapse>
        <FilterButton onClick={() => handleClick("width")}>
          <ListItemText primary="Width" />
          {open.width ? <ExpandLess /> : <ExpandMore />}
        </FilterButton>
        <Collapse in={open.width} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Autocomplete
              disablePortal
              options={filtersParams.width}
              sx={{ p: "2px", border: "0px" }}
              onChange={handleWidthChange}
              renderInput={(params) => (
                <TextField
                  disabled={params.disabled}
                  id={params.id}
                  size={params.size}
                  fullWidth={params.fullWidth}
                  InputProps={params.InputProps}
                  inputProps={params.inputProps}
                />
              )}
            />
          </List>
        </Collapse>
        <FilterButton onClick={() => handleClick("profile")}>
          <ListItemText primary="Profile" />
          {open.profile ? <ExpandLess /> : <ExpandMore />}
        </FilterButton>
        <Collapse in={open.profile} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Autocomplete
              disablePortal
              options={filtersParams.height}
              sx={{ p: "2px", border: "0px" }}
              onChange={handleProfileChange}
              renderInput={(params) => (
                <TextField
                  disabled={params.disabled}
                  id={params.id}
                  size={params.size}
                  fullWidth={params.fullWidth}
                  InputProps={params.InputProps}
                  inputProps={params.inputProps}
                />
              )}
            />
          </List>
        </Collapse>
        <FilterButton onClick={() => handleClick("diametr")}>
          <ListItemText primary="Diametr" />
          {open.diametr ? <ExpandLess /> : <ExpandMore />}
        </FilterButton>
        <Collapse in={open.diametr} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Autocomplete
              disablePortal
              options={filtersParams.diametr}
              onChange={handleDiametrChange}
              sx={{ p: "2px", border: "0px" }}
              renderInput={(params) => (
                <TextField
                  disabled={params.disabled}
                  id={params.id}
                  size={params.size}
                  fullWidth={params.fullWidth}
                  InputProps={params.InputProps}
                  inputProps={params.inputProps}
                />
              )}
            />
          </List>
        </Collapse>
        <FilterButton onClick={() => handleClick("season")}>
          <ListItemText primary="Season" />
          {open.season ? <ExpandLess /> : <ExpandMore />}
        </FilterButton>
        <Collapse in={open.season} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <FormGroup>
              <FormControlLabel
                onChange={(event, checked) =>
                  handleSeasonChange("winter", checked)
                }
                control={<Checkbox />}
                label="Winter"
              />
              <FormControlLabel
                onChange={(event, checked) =>
                  handleSeasonChange("summer", checked)
                }
                control={<Checkbox />}
                label="Summer"
              />
              <FormControlLabel
                onChange={(event, checked) =>
                  handleSeasonChange("allSeason", checked)
                }
                color="#fff"
                control={<Checkbox />}
                label="Multiseason"
              />
            </FormGroup>
          </List>
        </Collapse>
        <FilterButton onClick={() => handleClick("brand")}>
          <ListItemText primary="Brand" />
          {open.brand ? <ExpandLess /> : <ExpandMore />}
        </FilterButton>
        <Collapse in={open.brand} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <FormGroup>
              <Autocomplete
                disablePortal
                options={filtersParams.brands}
                sx={{ p: "2px", border: "0px" }}
                onChange={handleBrandChange}
                renderInput={(params) => (
                  <TextField
                    disabled={params.disabled}
                    id={params.id}
                    size={params.size}
                    fullWidth={params.fullWidth}
                    InputProps={params.InputProps}
                    inputProps={params.inputProps}
                  />
                )}
              />
            </FormGroup>
          </List>
        </Collapse>
      </List>
      <Stack gap="10px" direction="row">
        <Button>Clear</Button>
        <Button onClick={handleApplyButtonPress}>Apply</Button>
      </Stack>
    </Stack>
  );
}
