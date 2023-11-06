import React, { useCallback, useRef, useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { Apps, FormatAlignJustify } from "@mui/icons-material";
import styled from "@emotion/styled";
import { BASE_COLORS } from "../../../shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectSortParams } from "../selectors";
import { actions } from "../reducer";

const ViewButton = styled(Box)({
  backgroundColor: BASE_COLORS.BACKGROUND_WHITE,
  padding: "10px",
  paddingBottom: "7px",
  borderRadius: "7px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: BASE_COLORS.DEFAULT_BLUE,
    color: "#fff",
  },
  "&.isSelected": {
    cursor: "pointer",
    backgroundColor: BASE_COLORS.DEFAULT_BLUE,
    color: "#fff",
  },
});

export function ShopHeaderBar() {
  const [isCardView, handleCardView] = useState(false);
  const tableButton = useRef();
  const cardButton = useRef();
  const sortParams = useSelector(selectSortParams());
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(
        actions.setSortParams({ ...sortParams, showBy: +event.target.value }),
      );
    },
    [dispatch, sortParams],
  );

  const handleCardViewChange = useCallback(() => {
    const cardButtonElement = cardButton.current as unknown as HTMLElement;
    const tableButtonElement = tableButton.current as unknown as HTMLElement;
    cardButtonElement.classList.add("isSelected");
    tableButtonElement.classList.remove("isSelected");
    handleCardView(true);
  }, []);

  const handleTableViewChange = useCallback(() => {
    const cardButtonElement = cardButton.current as unknown as HTMLElement;
    const tableButtonElement = tableButton.current as unknown as HTMLElement;
    cardButtonElement.classList.remove("isSelected");
    tableButtonElement.classList.add("isSelected");
    handleCardView(false);
  }, []);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      direction="row"
      width="90%"
      gap="20px"
    >
      <Stack justifyContent="space-around" direction="row" width="15%">
        <ViewButton ref={cardButton} onClick={handleCardViewChange}>
          <Apps />
        </ViewButton>
        <ViewButton ref={tableButton} onClick={handleTableViewChange}>
          <FormatAlignJustify />
        </ViewButton>
      </Stack>
      <Divider sx={{ width: "60%" }} />
      <Stack justifyContent="space-between" direction="row" width="25%">
        <Stack alignItems="center" width="40%" gap="10px" direction="row">
          <FormControl
            size="small"
            variant="standard"
            sx={{ minWidth: 120, marginTop: "-44px" }}
          >
            <InputLabel
              sx={{
                color: BASE_COLORS.DEFAULT_GREY,
              }}
            >
              Sort By
            </InputLabel>
            <Select value={""} onChange={handleChange} label="Age">
              <MenuItem value={0}>Default</MenuItem>
              <MenuItem value={1}>By Price</MenuItem>
              <MenuItem value={2}>By Rating</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack alignItems="center" width="40%" gap="10px" direction="row">
          <FormControl
            size="small"
            variant="standard"
            sx={{ minWidth: 120, marginTop: "-44px" }}
          >
            <InputLabel
              sx={{
                color: BASE_COLORS.DEFAULT_GREY,
              }}
            >
              Show
            </InputLabel>
            <Select
              value={sortParams.showBy.toString()}
              onChange={handleChange}
              label="ShowBy"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Stack>
  );
}
