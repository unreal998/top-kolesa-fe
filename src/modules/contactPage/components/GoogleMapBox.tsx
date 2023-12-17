import { Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMaps } from "./GoogleMaps";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { BASE_COLORS, FONTS } from "../../../shared/constants";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

function GoogleMapBox() {
  const { t } = useTranslation();
  const [address1, setAddress1] = useState<boolean>(true);

  const handleChangeShowAddress = () => {
    setAddress1(!address1);
  };

  return (
    <Box>
      <Box
        display={"flex"}
        pt={10}
        width={"85%"}
        alignItems={"center"}
        justifyContent={"center"}
        m={"0 auto"}
      >
        <MapsHomeWorkIcon
          sx={{ color: BASE_COLORS.DEFAULT_BLUE }}
          fontSize="large"
        />
        <Typography
          variant="h4"
          fontFamily={`${FONTS.BOLD_TEXT_FAMILY}`}
          fontWeight="700"
          ml={1}
        >
          Наші магазини та пункти видачі
        </Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        pt={3}
        m={"0 auto"}
        width={"85%"}
      >
        <Grid
          container
          border={`2px solid ${BASE_COLORS.DEFAULT_BLUE}`}
          borderRadius={2}
        >
          <Grid item xs={4}>
            <Box height="100%" display="flex" flexDirection="column">
              <Box
                onClick={handleChangeShowAddress}
                height={"50%"}
                bgcolor={address1 ? BASE_COLORS.BACKGROUND_WHITE : ""}
                sx={{
                  borderTopLeftRadius: "20px",
                }}
                display={"flex"}
                p={2}
              >
                adress1
              </Box>
              <Box
                onClick={handleChangeShowAddress}
                height={"50%"}
                bgcolor={!address1 ? BASE_COLORS.BACKGROUND_WHITE : ""}
                sx={{
                  borderBottomLeftRadius: "20px",
                }}
              >
                adress2
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box height="100%" width="100%">
              <Wrapper apiKey="AIzaSyD4GZ_2q8aJK28ASr6ZNbpgYAymWP0Vlxw">
                <GoogleMaps
                  center={
                    address1
                      ? { lat: 49.238440161453745, lng: 28.403964997993405 }
                      : { lat: 49.207908075179304, lng: 28.500303753907346 }
                  }
                  zoom={16}
                />
              </Wrapper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default GoogleMapBox;
