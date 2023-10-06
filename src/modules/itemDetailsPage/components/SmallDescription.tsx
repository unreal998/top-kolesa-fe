import React from "react";
import { Stack, Typography, styled } from "@mui/material";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ExtensionIcon from '@mui/icons-material/Extension';
import ExpandIcon from '@mui/icons-material/Expand';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import HeightIcon from '@mui/icons-material/Height';
import { BASE_COLORS } from "../../../shared/constants";
import { ShopItemAPI } from "../../shopPage/reducer";

const SubDescriptionText = styled(Typography)({
    fontSize: '0.8rem',
    color: BASE_COLORS.DEFAULT_GREY, 
    display: 'flex',
    alignItems: 'center'
})

export function SmallDescription(itemData: ShopItemAPI) {
    return (
        <Stack gap='5px'>
            <Stack direction='row' justifyContent='space-between'>
                <SubDescriptionText variant="body1" >
                            {<ApartmentIcon />}
                            Brand: {itemData.brand}
                </SubDescriptionText>
                <SubDescriptionText variant="body1" >
                            {<ExtensionIcon />}
                            Model: {itemData.name}
                </SubDescriptionText>
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
                <SubDescriptionText variant="body1" >
                            {<ExpandIcon />}
                            Profile: {itemData.height}
                </SubDescriptionText>
                <SubDescriptionText variant="body1" >
                            {<HeightIcon />}
                            Diametr: {itemData.diametr}
                </SubDescriptionText>
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
            <SubDescriptionText variant="body1" >
                            {<OpenInFullIcon />}
                            Width: {itemData.width}
                </SubDescriptionText>
                <SubDescriptionText variant="body1" >
                            {<ThermostatIcon />}
                            Season: {itemData.season}
                </SubDescriptionText>
            </Stack>
        </Stack>
    )
}