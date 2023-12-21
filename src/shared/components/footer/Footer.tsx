import { MapsHomeWork, Timer } from "@mui/icons-material";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { ButtonWithIcon } from "../ButtonWithIcon";
import { FooterStrocedText } from "./FooterStrocedText";
import { Copyright } from "./Copyright";
import { BASE_COLORS } from "../../constants";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      overflow="hidden"
      sx={{
        backgroundImage: "url(./imgs/bg-footer.jpg)",
        backgroundSize: "cover",
      }}
    >
      <Stack
        padding="4% 6%"
        justifyContent="space-between"
        direction="row"
        sx={{
          "@media (max-width: 600px)": {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            gap: "5rem",
            paddingTop: "4rem",
          },
        }}
      >
        <Stack
          width="30%"
          gap="25px"
          sx={{
            "@media (max-width: 870px)": {
              width: "40%",
            },
            "@media (max-width: 600px)": {
              width: "80%",
            },
          }}
        >
          <FooterStrocedText
            text={
              <Typography
                variant="h4"
                fontFamily="Montserrat, sans-serif"
                fontWeight="700"
                fontSize="2.5rem"
                color="#fff"
                sx={{
                  "@media (max-width: 870px)": {
                    fontSize: "2rem",
                  },
                  "@media (max-width: 605px)": {
                    fontSize: "1.8rem",
                  },
                }}
              >
                {t("about")}
              </Typography>
            }
          />
          <Typography
            lineHeight="1.7"
            fontFamily="PT Sans, sans-serif"
            color={BASE_COLORS.DEFAULT_GREY}
            variant="body1"
            fontSize={"1rem"}
            sx={{
              "@media (max-width: 605px)": {
                fontSize: "1.1rem",
              },
              "@media (max-width: 420px)": {
                fontSize: "1.2rem",
              },
            }}
          >
            {t("aboutSubtitle")}
          </Typography>
          <ButtonWithIcon
            button={
              <Button
                variant="contained"
                sx={{
                  backgroundColor: BASE_COLORS.DEFAULT_BLUE,
                  fontWeight: "600",
                  fontFamily: "PT Sans, sans-serif",
                  borderRadius: "999px",
                  padding: "16px 40px",
                  fontSize: "0.9rem",
                }}
              >
                {t("viewOnMap")}
              </Button>
            }
            icon={<MapsHomeWork sx={{ height: "14px", width: "14px" }} />}
          ></ButtonWithIcon>
        </Stack>
        <Stack
          width="30%"
          gap="25px"
          sx={{
            "@media (max-width: 770px)": {
              width: "40%",
            },
            "@media (max-width: 600px)": {
              width: "80%",
            },
          }}
        >
          <FooterStrocedText
            text={
              <Typography
                variant="h4"
                fontFamily="Montserrat, sans-serif"
                fontWeight="700"
                fontSize="2.5rem"
                color="#fff"
                sx={{
                  "@media (max-width: 870px)": {
                    fontSize: "2rem",
                  },
                  "@media (max-width: 605px)": {
                    fontSize: "1.8rem",
                  },
                }}
              >
                {" "}
                {t("connectWithUs")}
              </Typography>
            }
          />
          <Stack gap="10px">
            <Typography
              lineHeight="1.7"
              fontFamily="Montserrat, sans-serif"
              color="#fff"
              variant="body1"
              fontSize={"1rem"}
              sx={{
                "@media (max-width: 605px)": {
                  fontSize: "1.1rem",
                },
              }}
            >
              {t("waitingForCall")}
            </Typography>
            <Stack gap="6px">
              <Typography
                variant="body1"
                fontFamily="PT Sans, sans-serif"
                fontWeight="400"
                color={BASE_COLORS.DEFAULT_GREY}
                fontSize={"1rem"}
                sx={{
                  "@media (max-width: 605px)": {
                    fontSize: "1.1rem",
                  },
                }}
              >
                {" "}
                (097) 273-77-44
              </Typography>
              <Typography
                variant="body1"
                fontFamily="PT Sans, sans-serif"
                fontWeight="400"
                color={BASE_COLORS.DEFAULT_GREY}
                fontSize={"1rem"}
                sx={{
                  "@media (max-width: 605px)": {
                    fontSize: "1.1rem",
                  },
                }}
              >
                {" "}
                (099) 273-77-44
              </Typography>
              <Typography
                variant="body1"
                fontFamily="PT Sans, sans-serif"
                fontWeight="400"
                color={BASE_COLORS.DEFAULT_GREY}
                fontSize={"1rem"}
                sx={{
                  "@media (max-width: 605px)": {
                    fontSize: "1.1rem",
                  },
                }}
              >
                {" "}
                (063) 253-77-44
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        padding="1.4rem 8%"
        borderTop={`2px solid ${BASE_COLORS.DEFAULT_BLUE}`}
        direction="row"
        sx={{
          "@media (max-width: 1024px)": {
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            margin: "0",
            padding: "1.4rem 0",
          },
        }}
      >
        <Copyright />
      </Stack>
    </Box>
  );
}
