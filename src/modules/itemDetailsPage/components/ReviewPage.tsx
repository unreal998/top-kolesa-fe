import { Button, FormControl, Rating, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ReviewItem } from "./ReviewItem";
import { BASE_COLORS } from "../../../shared/constants";
import { ArrowRight, CheckBox } from "@mui/icons-material";
import { ButtonWithIcon } from "../../mainPage/components/ButtonWithIcon";

export function ReviewPage() {
    const [ratingValue, setRatingValue] = useState<number | null>(0)
    return (
        <Stack padding='0 15%' gap='30px'>
            <ReviewItem/>
            <Stack gap='15px'>
                <Typography fontWeight='600' variant="h5">Add a review</Typography>
                <FormControl defaultValue="" required>
                    <Stack direction='row' gap='10px'>
                        <Typography color={BASE_COLORS.DEFAULT_GREY} component="legend">Your Rating</Typography>
                        <Rating onChange={(event, newValue) => {
                            setRatingValue(newValue);
                        }} 
                        value={ratingValue} />
                    </Stack>
                    <Stack direction='row' gap='15px'>
                        <TextField sx={{width:'45%'}} placeholder="Your name"/>
                        <TextField sx={{width:'45%'}} placeholder="Your email"/>
                    </Stack>
                    <Stack>
                    <ButtonWithIcon 
                        button={
                            <Button 
                                variant="contained" 
                                sx={{
                                    backgroundColor: BASE_COLORS.DEFAULT_BLUE, 
                                    fontWeight: '600', 
                                    borderRadius: '999px',
                                    padding:'20px 40px'
                                }}>View Map</Button>
                        }
                        icon={<ArrowRight />}
                    ></ButtonWithIcon>
                    </Stack>
                   
                </FormControl>
            </Stack>
        </Stack>
    )
}