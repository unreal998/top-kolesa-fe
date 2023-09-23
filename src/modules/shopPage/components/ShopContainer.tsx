import React from "react"
import { ShopHeaderBar } from "./shopHeaderBar";
import { Grid, Stack } from "@mui/material";
import { ShopItemCard } from "./ShopItemCard";

export function ShopContainer () {
    return (
        <Stack padding='20px 2%' width='100%' gap='20px'>
            <ShopHeaderBar />
            <Grid container spacing={2}>
                <Grid xs={4}>
                    <ShopItemCard />
                </Grid>
                <Grid xs={4}>
                    <ShopItemCard />
                </Grid>
                <Grid xs={4}>
                    <ShopItemCard />
                </Grid>
                <Grid xs={4}>
                    <ShopItemCard />
                </Grid>
            </Grid>
        </Stack>
            
    )
}