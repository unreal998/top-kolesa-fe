import { Box, Button, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import Carousel from "react-material-ui-carousel";

type SliderItem = {
    imgSource: string,
    description: ReactNode
}

const sliderData: SliderItem[] = [
    {
        imgSource: './imgs/hero-1-1.jpg',
        description: <Stack color='#fff'>
                        <Typography variant="h5">-- We Make Customs Wheel</Typography>
                        <Typography variant="h1"fontWeight='800'>Best Wheel <br /> Coming In 2023</Typography>
                        <Typography variant="subtitle1" maxWidth="55%">Proactively cultivate high standards in initiatives through virtual e-tailers. Interactively simplify high-quality intellectual</Typography>
                    </Stack>
    },
    {
        imgSource: './imgs/hero-1-2.jpg',
        description: <Stack color='#fff'>
                        <Typography variant="h5">-- We Make Customs Wheel</Typography>
                        <Typography variant="h1" fontWeight='800'>Best Wheel <br /> Coming In 2023</Typography>
                        <Typography variant="subtitle1" maxWidth="55%">Proactively cultivate high standards in initiatives through virtual e-tailers. Interactively simplify high-quality intellectual</Typography>
                    </Stack>
    },
    {
        imgSource: './imgs/hero-1-3.jpg',
        description: <Stack color='#fff'>
                        <Typography variant="h5">-- We Make Customs Wheel</Typography>
                        <Typography variant="h1" fontWeight='800'>Best Wheel <br /> Coming In 2023</Typography>
                        <Typography variant="subtitle1" maxWidth="55%">Proactively cultivate high standards in initiatives through virtual e-tailers. Interactively simplify high-quality intellectual</Typography>
                    </Stack>
    }
]

export function ImgCarousel () {
    return (
        <Carousel indicators={false} autoPlay={false}>
            {
                sliderData.map( (item, i) => <Item key={i} imgSource={item.imgSource} description={item.description} /> )
            }
        </Carousel>
    )
}

function Item(props: SliderItem)
{
    return (
        <Stack padding='6%' sx={{backgroundImage: `url(${props.imgSource})`, backgroundSize:'cover'}} gap='15px' alignItems='flex-start'>
            {props.description}

            <Button variant="contained" size="medium">
                Check it out!
            </Button>
        </Stack>
    )
}