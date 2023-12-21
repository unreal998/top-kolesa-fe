
import { Box, Stack, Typography } from "@mui/material";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
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
      const myLatLng = {
        lat: 49.238440161453745,
        lng: 28.403964997993405,
      };
      new google.maps.Marker({
        position: myLatLng,
        map,
        title: 'Hello World!',
      });
      const mySeccondLatLng = {
        lat: 49.207908075179304,
        lng: 28.500303753907346,
      };
      new google.maps.Marker({
        position: mySeccondLatLng,
        map,
        title: 'Hello World!',
      });
    }
  });

  return (
    <Box
      width="50%"
      height="500px"
      ref={ref}
      id="map"
      sx={{
        "@media (max-width: 1025px)": {
          width: "80%",
        },
        "@media (max-width: 650px)": {
          height: "400px",
        },
        "@media (max-width: 520px)": {
          height: "30rem",
        },
      }}
    />
  );
}

export function GoogleMap() {
  const center = { lat: 49.23290247396144, lng: 28.458753231671704 };
  const [zoom, setZoom] = useState(12);
  const { t } = useTranslation();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 600) {
        setZoom(11);
      } else {
        setZoom(12);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="row"
      padding="4rem 2rem"
      justifyContent="space-around"
      alignItems="center"
      sx={{
        backgroundImage: "url(./imgs/ourServiceImgs/bg.jpg)",
        backgroundSize: "contain",
        "@media (max-width: 1025px)": {
          flexDirection: "column",
          gap: "3rem",
        },
      }}
    >
      <Stack gap="10px">
        <Typography
          variant="h3"
          fontWeight="900"
          fontFamily="Montserrat, sans-serif"
          color="#000"
          pb={"1rem"}
        >
          {t("howToFindUS")}
        </Typography>
        <Stack>
          <Typography
            variant="h5"
            fontFamily="Montserrat, sans-serif"
            fontWeight="600"
            color="#000">
            {t('officeBased')}
          </Typography>
          <Typography
            variant="body1"
            fontFamily="PT Sans, sans-serif"
            fontWeight="400"
            color="#000"
            fontSize={"1rem"}
            sx={{
              "@media (max-width: 605px)": {
                fontSize: "1.1rem",
              },
            }}
          >
            Глобал
          </Typography>
          <Typography
            variant="body1"
            fontFamily="PT Sans, sans-serif"
            fontWeight="400"
            color="#000"
            fontSize={"1rem"}
            sx={{
              "@media (max-width: 605px)": {
                fontSize: "1.1rem",
              },
            }}
          >
            Tyre Plus
          </Typography>
        </Stack>
        <Stack>
          <Typography
            variant="h5"
            fontFamily="Montserrat, sans-serif"
            fontWeight="600"
            color="#000">
            {t('waitingForCall')}
          </Typography>
          <Typography
            variant="body1"
            fontFamily="PT Sans, sans-serif"
            fontWeight="400"
            color="#000"
            fontSize={"1rem"}
            sx={{
              "@media (max-width: 605px)": {
                fontSize: "1.1rem",
              },
            }}
          >
            (099) 273-77-44
          </Typography>
          <Typography
            variant="body1"
            fontFamily="PT Sans, sans-serif"
            fontWeight="400"
            color="#000"
            fontSize={"1rem"}
            sx={{
              "@media (max-width: 605px)": {
                fontSize: "1.1rem",
              },
            }}
          >
            (097) 273-77-44
          </Typography>
          <Typography
            variant="body1"
            fontFamily="PT Sans, sans-serif"
            fontWeight="400"
            color="#000"
            fontSize={"1rem"}
            sx={{
              "@media (max-width: 605px)": {
                fontSize: "1.1rem",
              },
            }}
          >
            (063) 253-77-44
          </Typography>
        </Stack>
        <Stack>
          <Typography
            variant="h5"
            fontFamily="Montserrat, sans-serif"
            fontWeight="600"
            color="#000">
            {t('ourMail')}
          </Typography>
          <Typography
            variant="body1"
            fontFamily="PT Sans, sans-serif"
            fontWeight="400"
            color="#000"
            fontSize={"1rem"}
            sx={{
              "@media (max-width: 605px)": {
                fontSize: "1.1rem",
              },
            }}
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
