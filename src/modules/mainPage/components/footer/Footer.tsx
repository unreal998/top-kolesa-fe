import {  MapsHomeWork, Timer } from "@mui/icons-material";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { ButtonWithIcon } from "../ButtonWithIcon";
import { FooterStrocedText } from "./FooterStrocedText";
import { Copyright } from "./Copyright";

export function Footer () {
    return (
        <Box 
        display='flex' 
        flexDirection='column' 
        overflow='hidden'

        sx={{backgroundImage:'url(./imgs/bg-footer.jpg)', backgroundSize:'cover'}}
        >
            <Stack padding='6% 8%' justifyContent='space-between' direction='row'>
                <Stack width='30%' gap='25px'>
                    <FooterStrocedText text={ <Typography variant="h4" fontWeight='600' color='#fff'> About Company</Typography>}/>
                    <Typography lineHeight="1.7" color='#808080;' variant="body1">Conveniently integrate proactive resources after flexible total linkage. Globally reintermediate unique value with client-centric interfaces. Holisticly repurposee.</Typography>
                    <ButtonWithIcon 
                        button={
                            <Button 
                                variant="contained" 
                                sx={{
                                    backgroundColor: 'rgba(28,57,123,1)', 
                                    fontWeight: '600', 
                                    borderRadius: '999px',
                                    padding:'20px 40px'
                                }}>View Map</Button>
                        }
                        icon={<MapsHomeWork />}
                    ></ButtonWithIcon>
                </Stack>
                <Stack width='30%' gap='25px'>
                    <FooterStrocedText text={ <Typography variant="h4" fontWeight='600' color='#fff'> Connect With Us</Typography>}/>
                    <Stack gap="10px">
                        <Typography lineHeight="1.7" color='#808080;' variant="body1">We are working 24/7 !</Typography>
                        <Stack direction='row' flexWrap='wrap' gap="10px">
                            <Typography variant="h6" fontWeight='400' color='#fff'> (097) 273-77-44</Typography>
                            <Typography variant="h6" fontWeight='400' color='#fff'> (099) 273-77-44</Typography>
                            <Typography variant="h6" fontWeight='400' color='#fff'> (063) 253-77-44</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction='row' gap='5px'>
                        <Typography variant="h6" fontWeight='600' color='#fff'> Follow on:</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack padding='2% 8%' borderTop='2px solid rgba(28,57,123, 1)' direction='row'>
                <Copyright />
            </Stack>
        </Box>
    )
}