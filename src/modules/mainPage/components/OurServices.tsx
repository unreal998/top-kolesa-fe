import { Box, Stack, Typography, styled } from "@mui/material";
import { useState } from "react";
import { ImgCarousel } from "../../../shared/components/ImgCarousel";
import { SliderItem } from "../../../shared/types";
import { ElectricBolt } from "@mui/icons-material";
import { BASE_COLORS } from "../../../shared/constants";
import { useTranslation } from "react-i18next";

const SecDividerContainer = styled('div')({
    width: '100px',
    height: '3px',
    textAlign: 'center',
    backgroundColor: BASE_COLORS.DEFAULT_BLUE,
})

const StyledServiceDescriptionTypography = styled(Typography)({
    padding:'20px 60px',
    backgroundColor: BASE_COLORS.DEFAULT_BLUE ,
    alignSelf: 'flex-end',
    fontWeight:'700',
    fontFamily:'Montserrat, sans-serif',
    color: '#fff'
})

const StyledServiceHoverDescriptionStack = styled(Stack)({
    color: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center',  
    width: '100%', 
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)', 
    padding: '20% 10% 30% 0%',
    gap: "15px",
    marginBottom: '45px'
})

const SecDividerAnimation = styled('div')({
    width: '20%',
    height: '5px',
    textAlign: 'center',
    backgroundColor: BASE_COLORS.DEFAULT_BLUE,
    marginTop: '-1px',
    '-webkit-animation': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite alternate-reverse both',
	animation: 'slide-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite alternate-reverse both',

    '@-webkit-keyframes slide-right': {
        '0%': {
            '-webkit-transform': 'translateX(0)',
            transform: 'translateX(0)',
        },
        '100%': {
            '-webkit-transform': 'translateX(100px)',
            transform: 'translateX(100px)',
        }
    },
    '@keyframes slide-right': {
        '0%': {
            '-webkit-transform': 'translateX(0)',
            transform: 'translateX(0)'
        },
        '100%': {
            '-webkit-transform': 'translateX(100px)',
            transform: 'translateX(100px)'
        }
    }
  
})


function SliderItemElement(props: SliderItem)
{
    const[isHover, changeHover] = useState(false)

    return (
        <Box 
            display='flex'
            sx={{
                backgroundImage: `url(${props.imgSource})`,
                backgroundSize:'100%', 
                backgroundRepeat:'no-repeat',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                    cursor: 'default'
                },
                userSelect: 'none'
            }} 
            gap='15px' 
            alignItems='flex-start'
            width= '430px'
            height='457px'
            onMouseEnter={() => changeHover(true)}
            onMouseLeave={() => changeHover(false)}
        >

            {isHover ? props.hoverDescription : props.description }
        </Box>
    )
}

const sliderData: SliderItem[] = [
    {
        imgSource: './imgs/ourServiceImgs/sr-img-1-1.jpg',
        description: 
                    <StyledServiceDescriptionTypography 
                        variant="h5" >
                            Stock Wheels
                        </StyledServiceDescriptionTypography>,
        hoverDescription: 
                    <StyledServiceHoverDescriptionStack >
                        <ElectricBolt sx={{width: '70px', height:'70px', marginBottom: '20px'}}/>
                        <Typography fontWeight='700' fontFamily='Montserrat, sans-serif' variant="h5">Stock Wheels</Typography>
                        <Typography variant="subtitle1" maxWidth="85%">Quickly reconceptualize standardized web services for interdependent products incentivize e-business</Typography>
                    </StyledServiceHoverDescriptionStack>
    },
    {
        imgSource: './imgs/ourServiceImgs/sr-img-1-2.jpg',
        description: 
                    <StyledServiceDescriptionTypography 
                        variant="h5">
                            Stock Wheels
                    </StyledServiceDescriptionTypography>,
        hoverDescription: 
                    <StyledServiceHoverDescriptionStack >
                        <ElectricBolt sx={{width: '70px', height:'70px', marginBottom: '20px'}}/>
                        <Typography fontWeight='700' fontFamily='Montserrat, sans-serif' variant="h5">Stock Wheels</Typography>
                        <Typography variant="subtitle1" maxWidth="85%">Quickly reconceptualize standardized web services for interdependent products incentivize e-business</Typography>
                    </StyledServiceHoverDescriptionStack>
    },
    {
        imgSource: './imgs/ourServiceImgs/sr-img-1-3.jpg',
        description: 
                    <StyledServiceDescriptionTypography 
                        variant="h5" >
                            Stock Wheels
                    </StyledServiceDescriptionTypography>,
        hoverDescription: 
                <StyledServiceHoverDescriptionStack>
                        <ElectricBolt sx={{width: '70px', height:'70px', marginBottom: '20px'}}/>
                        <Typography fontWeight='700' fontFamily='Montserrat, sans-serif' variant="h5">Stock Wheels</Typography>
                        <Typography variant="subtitle1" maxWidth="85%">Quickly reconceptualize standardized web services for interdependent products incentivize e-business</Typography>
                </StyledServiceHoverDescriptionStack>
    },
    {
        imgSource: './imgs/ourServiceImgs/sr-img-1-4.jpg',
        description: 
                    <StyledServiceDescriptionTypography 
                        variant="h5">
                            Stock Wheels
                    </StyledServiceDescriptionTypography>,
        hoverDescription: 
                <StyledServiceHoverDescriptionStack>
                        <ElectricBolt sx={{width: '70px', height:'70px', marginBottom: '20px'}}/>
                        <Typography fontWeight='700' variant="h5">Stock Wheels</Typography>
                        <Typography fontFamily='PT Sans, sans-serif' variant="subtitle1" maxWidth="85%">Quickly reconceptualize standardized web services for interdependent products incentivize e-business</Typography>
                </StyledServiceHoverDescriptionStack>
    }
]

export function OurServices() {
    const {t} = useTranslation();
    return (
        <Box 
            display='flex' 
            flexDirection='column' 
            padding='8%'
            justifyContent='center'
            gap='20px'
            sx={{ 
                backgroundImage: 'url(./imgs/bg-4.jpg)',
                backgroundSize: 'contain'
            }}>
            <Stack justifyContent='center' alignItems='center' gap='15px'>
                <Typography variant="h2" color='#000' fontFamily='Montserrat, sans-serif' fontWeight='800'>{t('ourServices')}</Typography>
                <SecDividerContainer>
                    <SecDividerAnimation />
                </SecDividerContainer>
                <Typography 
                    textAlign='center' 
                    variant="body2" 
                    width='60%' 
                    color={BASE_COLORS.DEFAULT_GREY}
                >
                </Typography>
            </Stack>
            <ImgCarousel gap="10px" outerWidth="100%" innerWidth={1530} sliderData={sliderData} ItemElement={SliderItemElement}/>
        </Box> 
    )
}