import React, { useCallback } from "react"
import { Autocomplete, Box, Button, Checkbox, Collapse, FormControlLabel, FormGroup, List, ListItemButton, ListItemText, ListSubheader, Slider, Stack, TextField, styled } from "@mui/material"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { BASE_COLORS } from "../../../shared/constants"

const FilterButton = styled(ListItemButton)({
    color: '#fff',
    padding: '15px',
    borderRadius: 0,
    '&:hover': {
        backgroundColor: '#1565c0'
    },
    '&:focus': {
        border: `1px solid ${BASE_COLORS.DEFAULT_BLUE}`,
        backgroundColor: '#fff',
        color: BASE_COLORS.DEFAULT_BLUE,
    }
})

type ModalState = {
    width: boolean,
    profile: boolean,
    diametr: boolean,
    price: boolean,
    season: boolean,
    brand: boolean
}

function valuetext(value: number) {
    return `${value} uah`;
  }

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 }
];

export function FilterBar () {
    const [open, setOpen] = React.useState({
        width: false,
        profile: false,
        diametr: false,
        price: false,
        season: false,
        brand: false
    } as ModalState);

    const handleClick = useCallback((id: string) => {
      setOpen({
            ...open,
            [id]: !open[id as keyof ModalState],
        });
    }, [open]);

    const [price, setPriceValue] = React.useState<number[]>([500, 20000]);

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        setPriceValue(newValue as number[]);
    };

    return (
        <Stack
            sx={{
                width: '360px', 
                position:'sticky', 
                top:'0px',
                bgcolor: BASE_COLORS.DEFAULT_BLUE,
                borderRadius: '2px'
            }}
            direction='column'
        >
            <List
                sx={{ 
                    width: '100%', 
                    maxWidth: 360, 
                }}
                component="nav"
                >
                <FilterButton onClick={() => handleClick('width')}>
                    <ListItemText primary="Width" />
                    {open.width ? <ExpandLess /> : <ExpandMore />}
                </FilterButton>
                <Collapse in={open.width} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Autocomplete
                            disablePortal
                            options={top100Films}
                            sx={{ p: '2px', border: '0px' }}
                            renderInput={(params) => <TextField 
                                disabled={params.disabled}
                                id={params.id}
                                size={params.size}
                                fullWidth={params.fullWidth}
                                InputProps={params.InputProps}
                                inputProps={params.inputProps}
                            />}
                        />
                    </List>
                </Collapse>
                <FilterButton onClick={() => handleClick('profile')}>
                    <ListItemText primary="Profile" />
                    {open.profile ? <ExpandLess /> : <ExpandMore />}
                </FilterButton>
                <Collapse in={open.profile} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Autocomplete
                            disablePortal
                            options={top100Films}
                            sx={{ p: '2px', border: '0px' }}
                            renderInput={(params) => <TextField
                                disabled={params.disabled}
                                id={params.id}
                                size={params.size}
                                fullWidth={params.fullWidth}
                                InputProps={params.InputProps}
                                inputProps={params.inputProps}
                            />}
                        />
                    </List>
                </Collapse>
                <FilterButton onClick={() => handleClick('diametr')}>
                    <ListItemText primary="Diametr" />
                    {open.diametr ? <ExpandLess /> : <ExpandMore />}
                </FilterButton>
                <Collapse in={open.diametr} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Autocomplete
                            disablePortal
                            options={top100Films}
                            sx={{ p: '2px', border: '0px' }}
                            renderInput={(params) => <TextField
                                disabled={params.disabled}
                                id={params.id}
                                size={params.size}
                                fullWidth={params.fullWidth}
                                InputProps={params.InputProps}
                                inputProps={params.inputProps}
                            />}
                        />
                    </List>
                </Collapse>
                <FilterButton onClick={() => handleClick('price')}>
                    <ListItemText primary="Price" />
                    {open.price ? <ExpandLess /> : <ExpandMore />}
                </FilterButton>
                <Collapse in={open.price} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Slider
                            defaultValue={0}
                            value={price}
                            onChange={handlePriceChange}
                            max={20000}
                            step={100}
                            valueLabelDisplay="on"
                        />
                    </List>
                </Collapse>
                <FilterButton onClick={() => handleClick('season')}>
                    <ListItemText primary="Season" />
                    {open.season ? <ExpandLess /> : <ExpandMore />}
                </FilterButton>
                <Collapse in={open.season} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Winter" />
                            <FormControlLabel control={<Checkbox />} label="Summer" />
                            <FormControlLabel color="#fff" control={<Checkbox />} label="Multiseason" />
                        </FormGroup>
                    </List>
                </Collapse>
                <FilterButton onClick={() => handleClick('brand')}>
                    <ListItemText primary="Brand" />
                    {open.brand ? <ExpandLess /> : <ExpandMore />}
                </FilterButton>
                <Collapse in={open.brand} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Bridgestoun" />
                            <FormControlLabel control={<Checkbox />} label="Michelen" />
                            <FormControlLabel color="#fff" control={<Checkbox />} label="Bosh" />
                        </FormGroup>
                    </List>
                </Collapse>
            </List>
            <Stack gap='10px' direction='row'>
                <Button>Clear</Button>
                <Button>Apply</Button>
            </Stack>

        </Stack>
    )
}