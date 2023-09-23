import { Email, Language, MapsHomeWork, Timer } from "@mui/icons-material";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { TypographyWithIcon } from "../../modules/mainPage/components/TypographyWithIcon";
import { BASE_COLORS } from "../constants";

export function Header () {
    return (
        <Box width='100%' display='flex' flexDirection='column' overflow='hidden'>
            <Box 
                    bgcolor={BASE_COLORS.DEFAULT_BLUE}
                    display='flex' 
                    flexDirection='row' 
                    gap='20px' 
                    width='100%' 
                    padding='11px 11px 11px 80px' 
                >
                    <TypographyWithIcon icon={<Email sx={{fill: '#FFF'}} />} typography={ <Typography color='#FFFFFF' variant="body2"> support@topkolesa.com </Typography>}/>
                    <TypographyWithIcon icon={<MapsHomeWork sx={{fill: '#FFF'}} />} typography={ <Typography color='#FFFFFF' variant="body2"> Vinnytsia Mechnikova str 1a </Typography>}/>
                    <TypographyWithIcon icon={<Timer sx={{fill: '#FFF'}} />} typography={ <Typography color='#FFFFFF' variant="body2"> Mon-Fri: 8:00 - 20:00 </Typography>}/>
            </Box>
            <Box 
                display='flex' 
                flexDirection='row'
                gap='20px' 
                width='92%' 
                padding='30px 4%' 
                alignItems='center' 
                justifyContent='space-between'
            >
                <Link href="#" >
                    <img src="./logo.png" alt="logo"></img>
                </Link>
                <Stack display='flex' flexDirection='row' gap='15px'>
                    <Link underline="none" href='/' sx={{color: "#000"}} >Home</Link>
                    <Link underline="none" href='/shop'sx={{color: "#000"}}>Shop</Link>
                    <Link underline="none" sx={{color: "#000"}}>About</Link>
                    <Link underline="none" sx={{color: "#000"}}>Contact</Link>
                </Stack>
                <Stack direction='row' alignItems='center'>
                    <Button sx={{color: "#000"}}> <Language sx={{marginRight: '10px'}}/>EN</Button>
                </Stack>
            </Box>
        </Box>
    )
}