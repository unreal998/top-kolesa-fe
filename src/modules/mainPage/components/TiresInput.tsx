import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import React from "react";
import { useCallback } from "react";
import { ButtonWithIcon } from "./ButtonWithIcon";
import { ArrowRight, ArrowRightAlt, ArrowRightAltOutlined, ArrowRightAltSharp, ArrowRightRounded } from "@mui/icons-material";

export function TiresInput () {
    const [age, setAge] = React.useState('');

    const handleChange = useCallback((event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    }, [])

    return (
            <Box 
            width='90%' 
            display='flex' 
            padding='5%' 
            flexDirection='column' 
            alignItems='flex-start'
            justifyContent='center'
            sx={{backgroundImage:'url(./imgs/hero-1-2.jpg)', backgroundSize:'cover'}}
            >
                <Stack direction='row' alignItems='center' width="75%">
                    <Typography variant="h2" fontWeight='800' color='#ffffff' width='40%'>Best Tires! <br/> Best Price !</Typography>
                    <Stack gap='25px' width='60%' alignItems="center">
                        <Typography variant="h3" color='#ffffff' fontWeight='800'>Tires Calculator</Typography>
                        <Stack direction='row' gap='20px'>
                            <FormControl sx={{minWidth: 120}}>
                                <InputLabel>Width</InputLabel>
                                <Select
                                    sx={{borderColor: '#fff !important'}}
                                    size="medium"
                                    value={age}
                                    label="Width"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{minWidth: 120}}>
                                <InputLabel>Profile</InputLabel>
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
                            <FormControl sx={{minWidth: 120}}>
                                <InputLabel>Diameter</InputLabel>
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
                        </Stack>
                        <Stack direction='row' gap='20px'>
                            <FormControl sx={{minWidth: 120}}>
                                <InputLabel>Season</InputLabel>
                                <Select
                                    value={age}
                                    label="Season"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{minWidth: 120}}>
                                <InputLabel>Brand</InputLabel>
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
                                            backgroundColor: 'rgba(28,57,123,1)', 
                                            fontWeight: '600', 
                                            borderRadius: '999px',
                                            padding:'20px 40px'
                                        }}>Search
                                    </Button>} icon={<ArrowRightRounded />}></ButtonWithIcon>
                    </Stack>
                </Stack>
            </Box>
    )
}