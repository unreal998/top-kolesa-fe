import React from "react"
import { Box, Rating, Stack, Typography } from "@mui/material"
import { BASE_COLORS } from "../../../shared/constants";

export function ShopItemTable () {
    const [value, setValue] = React.useState<number | null>(2);
    return (
        <Stack direction='row' alignItems='center' justifyContent='center'>
            <Box sx={{
                    backgroundImage: 'url("./imgs/tempImgs/tire.jpg")', 
                    width: '100%',
                    height: '200px', 
                    backgroundRepeat: 'no-repeat', 
                    backgroundSize: 'contain',
                    backgroundPosition: 'center'
                }}
            />
            <Stack bgcolor={BASE_COLORS.BACKGROUND_WHITE} alignItems='center' justifyContent='center' gap='5px' width='100%'> 
                <Rating name="read-only" value={value} readOnly />
                <Typography>Legend Series</Typography>
            </Stack>
        </Stack>
    )
}