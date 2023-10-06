import React, { ChangeEvent, useCallback } from "react"
import { ShopHeaderBar } from "./shopHeaderBar";
import { Grid, Pagination, Stack } from "@mui/material";
import { ShopItemCard } from "./ShopItemCard";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPageItemList, selectPagesCount } from "../selectors";
import { actions } from "../reducer";

export function ShopContainer () {
    const dispatch = useDispatch()
    const pagesCount = useSelector(selectPagesCount())
    const shopItems = useSelector(selectCurrentPageItemList());
    const handlePageChange = useCallback((event: ChangeEvent<unknown>, page: number) => {
        dispatch(actions.setCurrentPage(page))
    }, [dispatch])
    return (
        <Stack padding='20px 2%' width='100%' gap='20px' alignItems='center'>
            <ShopHeaderBar />
            <Grid container spacing={2}>
                {shopItems && shopItems.map((item) => 
                    <Grid key={item.id} item={true} xs={3}>
                        <ShopItemCard id={item.id} name={item.name} rating={item.rate} price={item.price_uah} imgName={item.image_file}/>
                    </Grid> 
                )}
            </Grid>
            <Pagination onChange={handlePageChange} count={pagesCount} variant="outlined" shape="rounded" />
        </Stack>
            
    )
}