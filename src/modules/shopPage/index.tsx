import React from "react"
import { Box } from "@mui/material"
import { ShopContainer } from "./components/ShopContainer"
import { FilterBar } from "./components/FilterBar"

export function ShopPage () {
    return (
        <Box padding='0 30px' alignItems='flex-start' display='flex' flexDirection='row'>
            <FilterBar />
            <ShopContainer />
        </Box>
    )
}