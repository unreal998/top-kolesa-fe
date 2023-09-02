import { Email, MapsHomeWork, Timer } from "@mui/icons-material";
import { Box, Link, Stack, Typography } from "@mui/material";
import { TypographyWithIcon } from "./TypographyWithIcon";

export function Header () {
    return (
        <Box width='100%' display='flex' flexDirection='column' overflow='hidden'>
            <Box bgcolor='#1C397B' display='flex' flexDirection='row' gap='20px' width='100%' padding='11px 11px 11px 80px' >
                <TypographyWithIcon icon={<Email sx={{fill: '#FFF'}} />} typography={ <Typography color='#FFFFFF' variant="body2"> support@topkolesa.com </Typography>}/>
                <TypographyWithIcon icon={<MapsHomeWork sx={{fill: '#FFF'}} />} typography={ <Typography color='#FFFFFF' variant="body2"> Vinnytsia Mechnikova str 1a </Typography>}/>
                <TypographyWithIcon icon={<Timer sx={{fill: '#FFF'}} />} typography={ <Typography color='#FFFFFF' variant="body2"> Mon-Fri: 8:00 - 20:00 </Typography>}/>
            </Box>
            <Box display='flex' flexDirection='row' gap='20px' width='100%' padding='30px 11px 30px 80px' alignItems='center' justifyContent='flex-start'>
                <Link href="#" width='40%'>
                    <img src="./logo.png"></img>
                </Link>
                <Stack display='flex' flexDirection='row' gap='15px' width='60%'>
                    <Typography variant="body1">Home</Typography>
                    <Typography variant="body1">About</Typography>
                    <Typography variant="body1">Tires</Typography>
                    <Typography variant="body1">Contact</Typography>
                </Stack>
            </Box>
        </Box>
    )
}