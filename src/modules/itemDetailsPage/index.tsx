import React, { useState } from "react";
import {  Box, Button, Divider, Rating, Stack, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { BASE_COLORS } from "../../shared/constants";
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import { SmallDescription } from "./components/SmallDescription";
import { FullDescription } from "./components/FullDescription";
import { ReviewPage } from "./components/ReviewPage";

interface ITabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  

function CustomTabPanel(props: ITabPanelProps) {
    const { children, value, index } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
      >
        {value === index && (
            children
        )}
      </div>
    );
  }

export function ItemDetailsPage () {
    const [value, setValue] = useState(2);
    const [modalValue, setModalValue] = React.useState(0);
    const [deliveryPopupHover, setDeliveryPopupHover] = useState(false);
    const [guarantiePopupHover, setGuarantiePopupHover] = useState(false);
    const [revertPopupHover, setRevertPopupHover] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setModalValue(newValue);
    };
    return (
        <Stack padding='0 15% 2%' gap='10px'>
            <Stack bgcolor={BASE_COLORS.BACKGROUND_WHITE} direction='row' justifyContent='center' gap='50px' padding='7%'>
                <Stack sx={{
                    backgroundImage: 'url("./imgs/tempImgs/tire.jpg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    minHeight: '300px',
                    maxHeight: '500px',
                    minWidth: '300px',
                    maxWidth: '500px',
                    width: '400px',
                    height: '400px',
                    alignItems: 'flex-end'
                }} />
                <Stack gap='15px'>
                    <Stack 
                        bgcolor={BASE_COLORS.BACKGROUND_WHITE} 
                        alignItems='flex-start' 
                        justifyContent='center' 
                        gap='5px' 
                        width='100%'
                    > 
                        <Rating name="read-only" value={value} readOnly />
                        <Typography variant="h3" >Legend Series</Typography>
                        <Typography variant="h3" fontWeight='600' fontSize='30px' color={BASE_COLORS.DEFAULT_BLUE} >$900</Typography>
                    </Stack>
                    <Divider sx={{
                            width:'100%',
                            borderColor: BASE_COLORS.DEFAULT_BLUE,
                            borderStyle: 'dashed'
                        }}
                    />
                    <Stack direction='row' justifyContent='space-between'>
                        <Stack direction='row' >
                            <Typography 
                                fontSize='0.8rem' 
                                color={BASE_COLORS.DEFAULT_GREY} 
                                variant="body1" 
                            >
                                <b>AVIABILITY:</b> aviable
                            </Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography 
                                fontSize='0.8rem' 
                                color={BASE_COLORS.DEFAULT_GREY} 
                                variant="body1" 
                            >
                                <b>ARTICLE:</b> 123760756
                            </Typography>
                        </Stack>
                    </Stack>
                    <Button variant="contained">BUY</Button>
                    <SmallDescription />
                    <Stack justifyContent='space-between' direction='row'>
                        <Tooltip
                            onMouseEnter={() => setDeliveryPopupHover(true)}
                            onMouseLeave={() => setDeliveryPopupHover(false)}
                            color={BASE_COLORS.DEFAULT_BLUE}
                            title={
                                <Stack padding='10px'>
                                    <Typography variant="h6">Доставка</Typography>
                                    <Typography variant="body1">- Вартість від 35 грн.</Typography>
                                    <Typography variant="body1">- Термін доставки 1-3 дні.</Typography>
                                    <Typography variant="body1">- Доставляємо службами Нова Пошта</Typography>
                                    <Typography variant="body1">- Є можливість самовивозу зі складів в Вінниці згідно графіку роботи.</Typography>
                                </Stack>}>
                            <Stack alignItems='center'>
                                {
                                    deliveryPopupHover ? <LocalShippingRoundedIcon sx={{
                                        color: BASE_COLORS.DEFAULT_BLUE,
                                        width: '1.3em',
                                        height: '1.3em'
                                    }} /> : <LocalShippingOutlinedIcon sx={{
                                        color: BASE_COLORS.DEFAULT_BLUE,
                                        width: '1.3em',
                                        height: '1.3em'
                                    }} />
                                }
                                <Typography variant="h6">Доставка</Typography>
                            </Stack>
                        </Tooltip>
                        <Tooltip
                            color={BASE_COLORS.DEFAULT_BLUE}
                            onMouseEnter={() => setGuarantiePopupHover(true)}
                            onMouseLeave={() => setGuarantiePopupHover(false)}
                            title={
                                <Stack padding='10px'>
                                    <Typography variant="h6">Гарантія</Typography>
                                    <Typography variant="body1">- Від виробника.</Typography>
                                </Stack>}>
                                <Stack alignItems='center'>
                                {
                                    guarantiePopupHover ? <GppGoodIcon sx={{
                                        color: BASE_COLORS.DEFAULT_BLUE,
                                        width: '1.3em',
                                        height: '1.3em'
                                    }} /> : <GppGoodOutlinedIcon sx={{
                                        color: BASE_COLORS.DEFAULT_BLUE,
                                        width: '1.3em',
                                        height: '1.3em'
                                    }} />
                                }
                                    <Typography variant="h6">Гарантія</Typography>
                                </Stack>
                        </Tooltip>
                        <Tooltip
                            color={BASE_COLORS.DEFAULT_BLUE}
                            onMouseEnter={() => setRevertPopupHover(true)}
                            onMouseLeave={() => setRevertPopupHover(false)}
                            title={
                                <Stack padding='10px'>
                                    <Typography variant="h6">Повернення</Typography>
                                    <Typography variant="body1">Протягом 14 днів <b>(Якщо товар не експлуатувався).</b></Typography>
                                </Stack>}>
                                <Stack alignItems='center'>
                                {
                                    revertPopupHover ?  <ReplayCircleFilledIcon sx={{
                                        color: BASE_COLORS.DEFAULT_BLUE,
                                        width: '1.3em',
                                        height: '1.3em'
                                    }} /> : <ReplayOutlinedIcon sx={{
                                        color: BASE_COLORS.DEFAULT_BLUE,
                                        width: '1.3em',
                                        height: '1.3em'
                                    }} />
                                }
                                    <Typography variant="h6">Повернення</Typography>
                                </Stack>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Stack>
            <Box display='flex' alignContent='center' justifyContent='center'>
                <Tabs value={modalValue} onChange={handleChange}>
                    <Tab label="Description" />
                    <Tab label="Review (0)" />
                </Tabs>
            </Box>
            <CustomTabPanel value={modalValue} index={0}>
                <FullDescription />
            </CustomTabPanel>
            <CustomTabPanel value={modalValue} index={1}>
                <ReviewPage />
            </CustomTabPanel>                      
        </Stack>
    )
}