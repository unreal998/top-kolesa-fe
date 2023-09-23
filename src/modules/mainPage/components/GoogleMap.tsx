import { Box, Stack, Typography } from "@mui/material";
import { Wrapper } from '@googlemaps/react-wrapper'
import { useEffect, useRef } from "react";

function MyMapComponent({
    center,
    zoom,
}: {
    center: google.maps.LatLngLiteral;
    zoom: number;
}) {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref !== null) {
            const map = new window.google.maps.Map(ref.current as HTMLInputElement, {
                center,
                zoom,
            });
            const myLatLng = { lat: 49.238440161453745, lng: 28.403964997993405 }
            new google.maps.Marker({
                position: myLatLng,
                map,
                title: "Hello World!",
            });
        }
    });

    return <Box width='50%' height='500px' ref={ref} id="map" />;
}

export function GoogleMap() {
    const center = { lat: 49.2363930042571, lng: 28.4149805559865 };
    const zoom = 13;
    return (
        <Box 
        display='flex' 
        flexDirection='row' 
        padding='40px 20px'
        justifyContent='space-around'
        alignItems='center'
        sx={{ 
            backgroundImage: 'url(./imgs/ourServiceImgs/bg.jpg)',
            backgroundSize: 'contain'
        }}>
            <Stack gap='10px'>
                <Typography variant="h3" fontWeight='800' color='#000'>How to find us ?</Typography>
                <Stack>
                    <Typography variant="h5" fontWeight='400' color='#000'>Our central offices based in Vinnytsia:</Typography>
                    <Typography variant="body1" fontWeight='400' color='#000'>Шинный Центр "Глобал"</Typography>
                    <Typography variant="body1" fontWeight='400' color='#000'>Шинный Центр "Глобал"</Typography>
                </Stack>
                <Stack>
                    <Typography variant="h5" fontWeight='400' color='#000'>We're waiting for you`r call!:</Typography>
                    <Typography variant="body1" fontWeight='400' color='#000'>(099) 273-77-44</Typography>
                    <Typography variant="body1" fontWeight='400' color='#000'>(097) 273-77-44</Typography>
                    <Typography variant="body1" fontWeight='400' color='#000'>(063) 253-77-44</Typography>
                </Stack>
                <Stack>
                    <Typography variant="h5" fontWeight='400' color='#000'>Our e-mail:</Typography>
                    <Typography variant="body1" fontWeight='400' color='#000'>topkolesa@gmail.com</Typography>
                </Stack>
            </Stack>
            <Wrapper apiKey="AIzaSyD4GZ_2q8aJK28ASr6ZNbpgYAymWP0Vlxw">
                <MyMapComponent center={center} zoom={zoom} />
            </Wrapper>
        </Box> 
    )
}