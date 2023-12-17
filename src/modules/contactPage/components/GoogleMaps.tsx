import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

export function GoogleMaps({
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

  return (
    <Box
      width="100%"
      height="500px"
      ref={ref}
      id="map"
      sx={{ borderBottomRightRadius: "6px", borderTopRightRadius: "6px" }}
    />
  );
}
