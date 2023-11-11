import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Autocomplete,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Slider,
  styled,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { BASE_COLORS } from "../../../shared/constants";
import { useSelector } from "react-redux";
import { selectFilterData } from "../../mainPage/selectors";
import { AiOutlineColumnWidth, AiOutlineDollarCircle } from "react-icons/ai";
import { LuCircleOff } from "react-icons/lu";
import { GiAlliedStar, GiTireTracks } from "react-icons/gi";
import { BsSnow } from "react-icons/bs";

const FilterButton = styled(ListItemButton)({
  color: BASE_COLORS.TEXT,
  padding: "15px",
  "&:hover": {
    backgroundColor: "transparent",
  },
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "252px",
  height: "58px",
  borderLeft: `2px solid ${BASE_COLORS.BORDER}`,
  borderRight: `2px solid ${BASE_COLORS.BORDER}`,
  "&:not(:last-child)": {
    borderBottom: `2px solid ${BASE_COLORS.BORDER}`,
  },
  "&:first-child": {
    borderTop: `2px solid ${BASE_COLORS.BORDER}`,
  },
  "&:last-child": {
    borderBottom: `2px solid ${BASE_COLORS.BORDER}`,
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

export function FilterBarNew() {
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
  const filtersParams = useSelector(selectFilterData());

  const [openWidthDialog, setOpenWidthDialog] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [openDiametrDialog, setOpenDiametrDialog] = useState(false);
  const [openPriceDialog, setOpenPriceDialog] = useState(false);
  const [openSeasonDialog, setOpenSeasonDialog] = useState(false);
  const [openBrandDialog, setOpenBrandDialog] = useState(false);

  const handleOpenWidthDialog = () => setOpenWidthDialog(true);
  const handleCloseWidthDialog = () => setOpenWidthDialog(false);

  const handleOpenProfileDialog = () => setOpenProfileDialog(true);
  const handleCloseProfileDialog = () => setOpenProfileDialog(false);

  const handleOpenDiametrDialog = () => setOpenDiametrDialog(true);
  const handleCloseDiametrDialog = () => setOpenDiametrDialog(false);

  const handleOpenPriceDialog = () => setOpenPriceDialog(true);
  const handleClosePriceDialog = () => setOpenPriceDialog(false);

  const handleOpenSeasonDialog = () => setOpenSeasonDialog(true);
  const handleCloseSeasonDialog = () => setOpenSeasonDialog(false);

  const handleOpenBrandDialog = () => setOpenBrandDialog(true);
  const handleCloseBrandDialog = () => setOpenBrandDialog(false);

  const handleClick = useCallback(
    (id: string) => {
      setOpen({
        ...open,
        [id]: !open[id as keyof ModalState],
      });
    },
    [open]
  );

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceValue(newValue as number[]);
  };
  const handleWidthChange = (
    event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    setWidthValue(value as string);
  };
  const handleProfileChange = (
    event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    setProfileValue(value as string);
  };
  const handleDiametrChange = (
    event: SyntheticEvent<Element, Event>,
    value: string | null
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
    value: string | null
  ) => {
    setBrandValue(value as string);
  };

  const handleApplyButtonPress = useCallback(() => {
    history(
      `?price=${JSON.stringify(
        price
      )}&width=${width}&profile=${profile}&diametr=${diametr}&season=${JSON.stringify(
        season
      )}&brand=${brand}`
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
        position: "sticky",
        width: `calc(252px + 4px)`,
        "& .MuiList-root": {
          width: "100%",
          "& .MuiListItemButton-root": {},
        },
      }}
      direction="column"
    >
      <List
        sx={{
          width: "100%",
        }}
        component="nav"
      >
        <FilterButton onClick={handleOpenWidthDialog}>
          <AiOutlineColumnWidth
            style={{ marginRight: "6px", width: "38px", height: "38px" }}
          />
          <ListItemText primary="Width" />
          <NavigateNextIcon />
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
        <FilterButton onClick={handleOpenProfileDialog}>
          <GiTireTracks
            style={{
              marginRight: "6px",
              width: "28px",
              height: "28px",
            }}
          />
          <ListItemText primary="Profile" />
          <NavigateNextIcon />
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
        <FilterButton onClick={handleOpenDiametrDialog}>
          <LuCircleOff
            style={{
              marginRight: "6px",
              width: "28px",
              height: "28px",
            }}
          />
          <ListItemText primary="Diametr" />
          <NavigateNextIcon />
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
        <FilterButton onClick={() => handleClick("price")}>
          <AiOutlineDollarCircle
            style={{
              marginRight: "6px",
              width: "31px",
              height: "31px",
            }}
          />
          <ListItemText primary="Price" />
          {open.price ? <NavigateNextIcon /> : <NavigateNextIcon />}
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
        <FilterButton onClick={() => handleClick("season")}>
          <BsSnow
            style={{
              marginRight: "6px",
              width: "26px",
              height: "26px",
            }}
          />
          <ListItemText primary="Season" />
          {open.season ? <NavigateNextIcon /> : <NavigateNextIcon />}
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
          <GiAlliedStar
            style={{
              marginRight: "6px",
              width: "29px",
              height: "29px",
            }}
          />
          <ListItemText primary="Brand" />
          {open.brand ? <NavigateNextIcon /> : <NavigateNextIcon />}
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
      <Dialog
        open={openWidthDialog}
        onClose={handleCloseWidthDialog}
        maxWidth="md"
      >
        <DialogTitle>Choose Width</DialogTitle>
        <DialogContent>
          {filtersParams.width.map((widthOption, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox />}
              label={widthOption}
            />
          ))}
        </DialogContent>
      </Dialog>
      <Dialog
        open={openProfileDialog}
        onClose={handleCloseProfileDialog}
        maxWidth="md"
      >
        <DialogTitle>Choose Profile</DialogTitle>
        <DialogContent>
          {filtersParams.height.map((heightOption, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox />}
              label={heightOption}
            />
          ))}
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDiametrDialog}
        onClose={handleCloseDiametrDialog}
        maxWidth="md"
      >
        <DialogTitle>Choose Diametr</DialogTitle>
        <DialogContent>
          {filtersParams.diametr.map((diametrOption, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox />}
              label={diametrOption}
            />
          ))}
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
