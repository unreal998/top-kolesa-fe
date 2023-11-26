import { Box, Stack, Typography } from "@mui/material";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

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
      const myLatLng = { lat: 49.238440161453745, lng: 28.403964997993405 };
      new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Hello World!",
      });
      const mySeccondLatLng = {
        lat: 49.207908075179304,
        lng: 28.500303753907346,
      };
      new google.maps.Marker({
        position: mySeccondLatLng,
        map,
        title: "Hello World!",
      });
    }
  });

  return <Box width="50%" height="500px" ref={ref} id="map" />;
}

export function GoogleMap() {
  const center = { lat: 49.23290247396144, lng: 28.458753231671704 };
  const zoom = 12;
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="row"
      padding="40px 20px"
      justifyContent="space-around"
      alignItems="center"
      sx={{
        backgroundImage: "url(./imgs/ourServiceImgs/bg.jpg)",
        backgroundSize: "contain",
      }}
    >
      <Stack gap="10px">
        <Typography
          variant="h3"
          fontWeight="900"
          fontFamily="Montserrat, sans-serif"
          color="#000"
        >
          {t("howToFindUS")}
        </Typography>
        <Stack>
          <Typography
            variant="h5"
            fontFamily="Montserrat, sans-serif"
            fontWeight="600"
            color="#000"
          >
            {t("officeBased")}
          </Typography>
          <Typography
            variant="body1"
            fontFamily="PT Sans, sans-serif"
            fontWeight="400"
            color="#000"
          >
            Глобал
          </Typography>
          <Typography
            variant="body1"
            fontFamily="PT Sans, sans-serif"
            fontWeight="400"
            color="#000"
          >
            Tyre Plus
          </Typography>
        </Stack>
        <Stack>
          <Typography
            variant="h5"
            fontFamily="Montserrat, sans-serif"
            fontWeight="600"
            color="#000"
          >
            {t("waitingForCall")}
          </Typography>
          <Typography
            variant="body1"
            fontFamily="PT Sans, sans-serif"
            fontWeight="400"
            color="#000"
          >
            (099) 273-77-44
          </Typography>
          <Typography
            variant="body1"
            fontFamily="PT Sans, sans-serif"
            fontWeight="400"
            color="#000"
          >
            (097) 273-77-44
          </Typography>
          <Typography
            variant="body1"
            fontFamily="PT Sans, sans-serif"
            fontWeight="400"
            color="#000"
          >
            (063) 253-77-44
          </Typography>
        </Stack>
        <Stack>
          <Typography
            variant="h5"
            fontFamily="Montserrat, sans-serif"
            fontWeight="600"
            color="#000"
          >
            {t("ourMail")}
          </Typography>
          <Typography
            variant="body1"
            fontFamily="PT Sans, sans-serif"
            fontWeight="400"
            color="#000"
          >
            topkolesa@gmail.com
          </Typography>
        </Stack>
      </Stack>
      <Wrapper apiKey="AIzaSyD4GZ_2q8aJK28ASr6ZNbpgYAymWP0Vlxw">
        <MyMapComponent center={center} zoom={zoom} />
      </Wrapper>
    </Box>
  );
}