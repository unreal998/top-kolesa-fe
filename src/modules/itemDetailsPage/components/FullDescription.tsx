import React from "react";
import { Stack, Typography, styled } from "@mui/material";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ExtensionIcon from '@mui/icons-material/Extension';
import ExpandIcon from '@mui/icons-material/Expand';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import HeightIcon from '@mui/icons-material/Height';
import { BASE_COLORS } from "../../../shared/constants";

const FullDescriptionText = styled(Typography)({
    fontSize: '1.4rem',
    color: BASE_COLORS.DEFAULT_GREY, 
    display: 'flex',
    alignItems: 'center'
})

export function FullDescription() {
    return (
        <Stack padding='0 10%' gap='5px'>
            <Stack direction='row' justifyContent='space-between'>
                <Stack>
                    <FullDescriptionText variant="h5" >
                        {<ApartmentIcon />}
                        Country: Polish
                    </FullDescriptionText>
                    <FullDescriptionText variant="h5" >
                        {<ApartmentIcon />}
                        Type: Light  
                    </FullDescriptionText>
                    <FullDescriptionText variant="h5" >
                        {<ApartmentIcon />}
                        Index Scale: 82-420 kg
                    </FullDescriptionText>
                    <FullDescriptionText variant="h5" >
                        {<ApartmentIcon />}
                        Index Speed: 210  
                    </FullDescriptionText>
                    <FullDescriptionText variant="h5" >
                        {<ApartmentIcon />}
                        Name: GOODYEAR
                    </FullDescriptionText>
                    <FullDescriptionText variant="h5" >
                        {<ApartmentIcon />}
                        Year: 2020  
                    </FullDescriptionText>
                </Stack>
                <Stack>
                    <FullDescriptionText variant="h5" >
                        {<ApartmentIcon />}
                        Brand: Bridgestoun
                    </FullDescriptionText>
                    <FullDescriptionText variant="h5" >
                        {<ExtensionIcon />}
                        Model: Wilder j540
                    </FullDescriptionText>
                    <FullDescriptionText variant="h5" >
                        {<ExpandIcon />}
                        Profile: 65
                    </FullDescriptionText>
                    <FullDescriptionText variant="h5" >
                        {<HeightIcon />}
                        Diametr: R14
                    </FullDescriptionText>
                    <FullDescriptionText variant="h5" >
                        {<OpenInFullIcon />}
                        Width: 175
                    </FullDescriptionText>
                    <FullDescriptionText variant="h5" >
                        {<ThermostatIcon />}
                        Season: Summer
                    </FullDescriptionText>
                </Stack>
            </Stack>
        </Stack>
    )
}