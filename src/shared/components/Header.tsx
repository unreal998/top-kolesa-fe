import { Email, Language, MapsHomeWork, Timer } from "@mui/icons-material";
import { Box, Button, Collapse, Link, Stack, Typography } from "@mui/material";
import { TypographyWithIcon } from "../../modules/mainPage/components/TypographyWithIcon";
import { BASE_COLORS } from "../constants";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import i18next from "i18next";

export function Header () {
    const languages = [
        {
            code: 'en',
            name: 'English'
        },
        {
            code: 'ru',
            name: 'Русский'
        },
        {
            code: 'ua',
            name: 'Українська'
        },
    ]
    const {t} = useTranslation();
    const currentLanguageCode = localStorage.getItem('i18nextLng') || 'en';
    const [isLanguageModalOpen, setLanguageModalOpen] = useState(false)

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
                    <TypographyWithIcon icon={<MapsHomeWork sx={{fill: '#FFF'}} />} typography={ <Typography color='#FFFFFF' variant="body2">{t('headerAddress')}</Typography>}/>
                    <TypographyWithIcon icon={<Timer sx={{fill: '#FFF'}} />} typography={ <Typography color='#FFFFFF' variant="body2">{t('workHours')}</Typography>}/>
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
                <Stack alignItems='center'>
                    <Button onClick={() => setLanguageModalOpen(true)} sx={{color: "#000"}}> <Language sx={{marginRight: '10px'}}/>{currentLanguageCode}</Button>
                    <Collapse in={isLanguageModalOpen} timeout="auto" unmountOnExit>
                        {languages.map((item) => 
                            <Button onClick={() => {
                                setLanguageModalOpen(false);
                                i18next.changeLanguage(item.code);
                            }} sx={{color: "#000"}}>{item.name}</Button>
                        )}
                    </Collapse>
                </Stack>
            </Box>
        </Box>
    )
}