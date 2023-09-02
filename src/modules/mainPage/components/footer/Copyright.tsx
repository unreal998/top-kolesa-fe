import { CopyrightOutlined } from "@mui/icons-material";
import {  Stack, Typography } from "@mui/material";
import { ReactNode } from "react";


export function Copyright () {
    return (
        <Stack direction='row' alignItems='center'>
            <Typography lineHeight="1.7" color='#808080' variant="body1">
                Copyright {<CopyrightOutlined />} 2022 TopKolesa. All Rights Reserved.
            </Typography> 
        </Stack>
    )
}