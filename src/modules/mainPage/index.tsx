import React from "react"
import { TiresInput } from "./components/TiresInput"
import { GoogleMap } from "./components/GoogleMap"
import { Box } from "@mui/material"
import { OurServices } from "./components/OurServices"

export function MainPage () {
    return (
        <Box>
            <TiresInput />
            <OurServices />
            <GoogleMap />
        </Box>
    )
}