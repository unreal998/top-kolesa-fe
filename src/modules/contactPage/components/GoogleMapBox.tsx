import { Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMaps } from "./GoogleMaps";
import { Box, Grid, Typography, styled } from "@mui/material";
import { useState } from "react";
import { BASE_COLORS, FONTS } from "../../../shared/constants";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import { useTranslation } from "react-i18next";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const StyledHeadingText = styled(Typography)({
  fontFamily: `${FONTS.BOLD_TEXT_FAMILY}`,
  textAlign: "start",
  fontSize: "1.2rem",
  fontWeight: "600",
});

const StyledSubHeading = styled(Typography)({
  fontFamily: `${FONTS.BOLD_TEXT_FAMILY}`,
  textAlign: "start",
  fontSize: "1rem",
  fontWeight: "600",
});
const StyledText = styled(Typography)({
  fontFamily: `${FONTS.MAIN_TEXT_FAMILY}`,
  textAlign: "start",
  fontSize: "1rem",
});

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
          fontWeight="600"
          ml={1}
        >
          {t("ourStores")}
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
                flexDirection={"column"}
                p={2}
              >
                <StyledHeadingText>{t("headerCity")},</StyledHeadingText>
                <StyledHeadingText>{t("headerAddress")}</StyledHeadingText>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  pt={2.5}
                  pb={1.5}
                >
                  <CalendarMonthIcon
                    sx={{
                      color: BASE_COLORS.DEFAULT_BLUE,
                      paddingRight: "0.5rem",
                    }}
                  />
                  <StyledSubHeading>{t("openingHours")}:</StyledSubHeading>
                </Box>
                <Box display={"flex"} flexDirection={"column"}>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <StyledText>{t("workDays")}:</StyledText>
                    <StyledText>9:00 - 18:00</StyledText>
                  </Box>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <StyledText>{t("st")}:</StyledText>
                    <StyledText>9:00 - 16:00</StyledText>
                  </Box>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <StyledText>{t("su")}:</StyledText>
                    <StyledText>{t("closed")}</StyledText>
                  </Box>
                </Box>
              </Box>
              <Box
                onClick={handleChangeShowAddress}
                height={"50%"}
                bgcolor={!address1 ? BASE_COLORS.BACKGROUND_WHITE : ""}
                sx={{
                  borderBottomLeftRadius: "20px",
                }}
                display={"flex"}
                flexDirection={"column"}
                p={2}
              >
                <StyledHeadingText>{t("headerCity")},</StyledHeadingText>
                <StyledHeadingText>{t("headerAddress2")}</StyledHeadingText>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  pt={2.5}
                  pb={1.5}
                >
                  <CalendarMonthIcon
                    sx={{
                      color: BASE_COLORS.DEFAULT_BLUE,
                      paddingRight: "0.5rem",
                    }}
                  />
                  <StyledSubHeading>{t("openingHours")}:</StyledSubHeading>
                </Box>
                <Box display={"flex"} flexDirection={"column"}>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <StyledText>{t("workDays")}:</StyledText>
                    <StyledText>9:00 - 18:00</StyledText>
                  </Box>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <StyledText>{t("st")}:</StyledText>
                    <StyledText>9:00 - 16:00</StyledText>
                  </Box>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <StyledText>{t("su")}:</StyledText>
                    <StyledText>{t("closed")}</StyledText>
                  </Box>
                </Box>
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
