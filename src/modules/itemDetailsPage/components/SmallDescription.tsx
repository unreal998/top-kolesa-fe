import React from "react";
import { Stack, Typography, styled } from "@mui/material";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ExtensionIcon from '@mui/icons-material/Extension';
import ExpandIcon from '@mui/icons-material/Expand';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import HeightIcon from '@mui/icons-material/Height';
import { BASE_COLORS } from "../../../shared/constants";

const SubDescriptionText = styled(Typography)({
    fontSize: '0.8rem',
    color: BASE_COLORS.DEFAULT_GREY, 
    display: 'flex',
    alignItems: 'center'
})

export function SmallDescription() {
    return (
        <Stack gap='5px'>
            <Stack direction='row' justifyContent='space-between'>
                <SubDescriptionText variant="body1" >
                            {<ApartmentIcon />}
                            Brand: Bridgestoun
                </SubDescriptionText>
                <SubDescriptionText variant="body1" >
                            {<ExtensionIcon />}
                            Model: Wilder j540
                </SubDescriptionText>
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
                <SubDescriptionText variant="body1" >
                            {<ExpandIcon />}
                            Profile: 65
                </SubDescriptionText>
                <SubDescriptionText variant="body1" >
                            {<HeightIcon />}
                            Diametr: R14
                </SubDescriptionText>
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
            <SubDescriptionText variant="body1" >
                            {<OpenInFullIcon />}
                            Width: 175
                </SubDescriptionText>
                <SubDescriptionText variant="body1" >
                            {<ThermostatIcon />}
                            Season: Summer
                </SubDescriptionText>
            </Stack>
        </Stack>
    )
}