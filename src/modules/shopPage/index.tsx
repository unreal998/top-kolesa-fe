import React, { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { Box } from "@mui/material"
import { ShopContainer } from "./components/ShopContainer"
import { FilterBar } from "./components/FilterBar"
import { actions } from "./reducer"

export function ShopPage () {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.getShopItems(1))
    }, [dispatch])

    return (
        <Box padding='0 30px' alignItems='flex-start' display='flex' flexDirection='row'>
            <FilterBar />
            <ShopContainer />
        </Box>
    )
}