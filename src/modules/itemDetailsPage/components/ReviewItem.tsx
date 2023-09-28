import { Button, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import { BASE_COLORS } from "../../../shared/constants";

export function ReviewItem() {
    return (
        <Stack gap='5px' padding='5%' border={`1px solid ${BASE_COLORS.BORDER_WHITE}`}>
            <Stack direction='row' justifyContent='space-between'>
                <Typography variant="h6">Item Name</Typography>
                <Rating name="read-only" value={4} readOnly />
            </Stack>
            <Typography fontWeight='600' color={BASE_COLORS.DEFAULT_BLUE} variant="body2">26.04.2023</Typography>
            <Typography variant="body1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim placeat, eos officiis facilis, repellendus totam, sint molestiae nisi vero earum ducimus sapiente modi animi? Eius error eos ex sequi nobis?</Typography>
        </Stack>
    )
}