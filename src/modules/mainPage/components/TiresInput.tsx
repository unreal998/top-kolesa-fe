import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import React from "react";
import { useCallback } from "react";
import { ButtonWithIcon } from "./ButtonWithIcon";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { ImgCarousel } from "../../../shared/components/ImgCarousel";
import { SliderItem } from "../../../shared/types";
import { BASE_COLORS } from "../../../shared/constants";
import { useTranslation } from "react-i18next";

function SliderItemElement(props: SliderItem)
{
    return (
        <>
            {props.description}
        </>
    )
}

const sliderData: SliderItem[] = [
    {
        imgSource: '',
        description: <Box 
            sx={{
                backgroundImage: 'url(https://www.logodesignlove.com/wp-content/uploads/2020/01/goodyear-logo-01.jpg)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                width: '200px',
                height: '80px',
                userSelect: 'none'
            }}/>
    },
    {
        imgSource: '',
        description: <Box 
            sx={{
                backgroundImage: 'url(https://s19532.pcdn.co/wp-content/uploads/2018/08/Linglong-Tire-logo.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                width: '200px',
                height: '80px',
                userSelect: 'none'
            }}/>
    },
    {
        imgSource: '',
        description: <Box 
            sx={{
                backgroundImage: 'url(https://1000logos.net/wp-content/uploads/2020/07/Momo-logo.jpg)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                width: '200px',
                height: '80px',
                userSelect: 'none'
            }}/>
        
    },
    {
        imgSource: '',
        description: <Box 
            sx={{
                backgroundImage: 'url(https://www.logodesignlove.com/wp-content/uploads/2020/01/goodyear-logo-01.jpg)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                width: '200px',
                height: '80px',
                userSelect: 'none'
            }}/>
    }
]

export function TiresInput() {
    const [age, setAge] = React.useState('');
    const {t} = useTranslation();

    const handleChange = useCallback((event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    }, [])

    return (
        <>
            <Box
                width='90%'
                display='flex'
                padding='5%'
                flexDirection='column'
                alignItems='flex-start'
                justifyContent='center'
                sx={{ backgroundImage: 'url(./imgs/hero-1-2.jpg)', backgroundSize: 'cover' }}
            >
                <Stack direction='row' alignItems='center' width="75%">
                    <Typography variant="h2" fontWeight='800' color='#ffffff' width='42%' fontFamily='Montserrat, sans-serif'>{t('tireSelectorTitle')}</Typography>
                    <Stack gap='25px' width='60%' alignItems="center">
                        <Typography variant="h3" color='#ffffff' fontWeight='600' fontFamily='Montserrat, sans-serif'>{t('tireSelection')}</Typography>
                        <Stack bgcolor='rgba(255,255,255, 0.4)' borderRadius='20px' padding='40px 20px' justifyContent='center' flexWrap='wrap' width='480px' direction='row' gap='20px'>
                            <FormControl sx={{ minWidth: 120 }}>
                                <InputLabel >{t('width')}</InputLabel>
                                <Select
                                    sx={{ opacity: 1 }}
                                    size="medium"
                                    value={age}
                                    label='Width'
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 120 }}>
                                <InputLabel>{t('profile')}</InputLabel>
                                <Select
                                    value={age}
                                    label="Profile"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 120 }}>
                                <InputLabel>{t('diametr')}</InputLabel>
                                <Select
                                    value={age}
                                    label="Diameter"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 120 }}>
                                <InputLabel>{t('season')}</InputLabel>
                                <Select
                                    value={age}
                                    label="Season"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Winter</MenuItem>
                                    <MenuItem value={20}>Summer</MenuItem>
                                    <MenuItem value={30}>All</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 120 }}>
                                <InputLabel>{t('brand')}</InputLabel>
                                <Select
                                    value={age}
                                    label="Brand"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        <ButtonWithIcon
                            button={
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: BASE_COLORS.DEFAULT_BLUE,
                                        fontWeight: '600',
                                        fontFamily: 'PT Sans',
                                        borderRadius: '999px',
                                        padding: '20px 40px'
                                    }}>{t('searchButton')}
                                </Button>} icon={<ArrowRightIcon />}></ButtonWithIcon>
                    </Stack>
                </Stack>
            </Box>
            <Stack bgcolor={BASE_COLORS.DEFAULT_BLUE}>
                <Box 
                    sx={{
                        backgroundImage: 'url(./imgs/bg-brand.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}>
                    <Stack gap='10px' justifyContent='space-around'  padding='20px' direction='row'>
                        <Stack gap='10px' alignItems='flex-start' justifyContent='center' color='#fff'>
                            <Typography fontFamily='Montserrat, sans-serif' fontWeight='900' variant="h2">{t('popularBrands')}</Typography>
                            <Typography fontFamily='PT Sans, sans-serif'> {t('popularBrandsSubtitle')}</Typography>
                        </Stack>
                        <ImgCarousel 
                            gap="10px" 
                            innerWidth={600}
                            outerWidth="400px" 
                            sliderData={sliderData} 
                            ItemElement={SliderItemElement}
                        />
                    </Stack>
                    <Box 
                        height='40px' 
                        sx={{
                            backgroundImage: 'url(./imgs/brand-shape.png)', 
                            backgroundRepeat: 'no-repeat', 
                            backgroundSize: 'cover'
                        }}/>
                </Box>
            </Stack>
        </>

    )
}