import React from "react";
import { Stack, Typography, styled } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ExtensionIcon from "@mui/icons-material/Extension";
import ExpandIcon from "@mui/icons-material/Expand";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import HeightIcon from "@mui/icons-material/Height";
import { BASE_COLORS } from "../../../shared/constants";
import { ShopItemAPI } from "../../shopPage/reducer";

const FullDescriptionText = styled(Typography)({
  fontSize: "1.4rem",
  color: BASE_COLORS.DEFAULT_GREY,
  display: "flex",
  alignItems: "center",
  fontFamily: "PT Sans",
});

export function FullDescription(itemData: ShopItemAPI) {
  return (
    <Stack padding="0 10%" gap="5px">
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <FullDescriptionText variant="h5">
            {<ApartmentIcon />}
            Country: {itemData.country}
          </FullDescriptionText>
          <FullDescriptionText variant="h5">
            {<ApartmentIcon />}
            Type: Light
          </FullDescriptionText>
          <FullDescriptionText variant="h5">
            {<ApartmentIcon />}
            Index Scale: {itemData.weight} kg
          </FullDescriptionText>
          <FullDescriptionText variant="h5">
            {<ApartmentIcon />}
            Index Speed: {itemData.speed}
          </FullDescriptionText>
          <FullDescriptionText variant="h5">
            {<ApartmentIcon />}
            Name: {itemData.name}
          </FullDescriptionText>
          <FullDescriptionText variant="h5">
            {<ApartmentIcon />}
            Year: {itemData.year}
          </FullDescriptionText>
        </Stack>
        <Stack>
          <FullDescriptionText variant="h5">
            {<ApartmentIcon />}
            Brand: {itemData.brand}
          </FullDescriptionText>
          <FullDescriptionText variant="h5">
            {<ExtensionIcon />}
            Model: {itemData.name}
          </FullDescriptionText>
          <FullDescriptionText variant="h5">
            {<ExpandIcon />}
            Profile: {itemData.height}
          </FullDescriptionText>
          <FullDescriptionText variant="h5">
            {<HeightIcon />}
            Diametr: R{itemData.diametr}
          </FullDescriptionText>
          <FullDescriptionText variant="h5">
            {<OpenInFullIcon />}
            Width: {itemData.width}
          </FullDescriptionText>
          <FullDescriptionText variant="h5">
            {<ThermostatIcon />}
            Season: {itemData.season}
          </FullDescriptionText>
        </Stack>
      </Stack>
    </Stack>
  );
}
