import {
  EmailOutlined,
  Language,
  MapsHomeWorkOutlined,
  TimerOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { TypographyWithIcon } from "../../modules/mainPage/components/TypographyWithIcon";
import { BASE_COLORS, FONTS } from "../constants";
import { useTranslation } from "react-i18next";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import i18next from "i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartModalWindowOpen,
  selectCartItemCount,
} from "../../modules/shopPage/selectors";
import { actions } from "../../modules/shopPage/reducer";
import CartModalWindow from "./CartModalWindow";
import MenuIcon from "@mui/icons-material/Menu";

export function Header() {
  const dispatch = useDispatch();
  const cartItemCount = useSelector(selectCartItemCount);
  const cartModalWindowOpen = useSelector(selectCartModalWindowOpen);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const currentLanguageCode = localStorage.getItem("i18nextLng") || "en";
  const languages = [
    {
      code: "en",
      name: "English",
    },
    {
      code: "ru",
      name: "Русский",
    },
    {
      code: "ua",
      name: "Українська",
    },
  ];

  useEffect(() => {
    const cartItemsCountFromStorage = JSON.parse(
      localStorage.getItem("cartItem") || "[]"
    ).length;

    dispatch(actions.setCartItemCount(cartItemsCountFromStorage));
  }, [dispatch, cartItemCount, cartModalWindowOpen]);

  useEffect(() => {
    dispatch(actions.getShopItems(""));
  }, [dispatch]);

  const handleLanguageClick = useCallback((event: SyntheticEvent) => {
    setAnchorEl(event.target as HTMLElement);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box width="100%" display="flex" flexDirection="column" overflow="hidden">
      <Box
        bgcolor={BASE_COLORS.DEFAULT_BLUE}
        display="flex"
        flexDirection="row"
        justifyContent={"flex-start"}
        gap="3rem"
        height={"1.6rem"}
        padding="1.1rem 4%"
        sx={{
          "@media (max-width: 1250px)": {
            justifyContent: "center",
            padding: "1.1rem 2%",
          },
          "@media (max-width: 870px)": {
            display: "none",
          },
        }}
      >
        <TypographyWithIcon
          icon={<EmailOutlined sx={{ fill: "#FFF", width: "2rem" }} />}
          typography={
            <Typography
              fontFamily="PT Sans,  sans-serif"
              color="#FFFFFF"
              variant="body2"
            >
              {" "}
              topkolesa@gmail.com{" "}
            </Typography>
          }
        />
        <TypographyWithIcon
          icon={<MapsHomeWorkOutlined sx={{ fill: "#FFF", width: "2rem" }} />}
          typography={
            <Typography
              fontFamily="PT Sans,  sans-serif"
              color="#FFFFFF"
              variant="body2"
            >
              {`${t("headerCity")}, ${t("headerAddress")} / ${t(
                "headerAddress2"
              )}`}
            </Typography>
          }
        />
        <TypographyWithIcon
          icon={<TimerOutlined sx={{ fill: "#FFF", width: "2rem" }} />}
          typography={
            <Typography
              fontFamily="PT Sans,  sans-serif"
              color="#FFFFFF"
              variant="body2"
            >
              {t("workHours")}
            </Typography>
          }
        />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        padding="30px 4%"
        alignItems="center"
        alignContent={"center"}
        justifyContent="space-between"
      >
        <Link href="/">
          <Box component={"img"} src="./logo.png" alt="logo" />
        </Link>
        <Stack
          display="flex"
          flexDirection="row"
          gap="1.5rem"
          sx={{
            "@media (max-width: 870px)": {
              display: "none",
            },
          }}
        >
          <Link
            underline="none"
            href="/"
            sx={{
              color: "#000",
              fontFamily: FONTS.MAIN_TEXT_FAMILY,
              fontSize: "1.1rem",
            }}
          >
            {t("homeLabel")}
          </Link>
          <Link
            underline="none"
            href="/shop"
            sx={{
              color: "#000",
              fontFamily: FONTS.MAIN_TEXT_FAMILY,
              fontSize: "1.1rem",
            }}
          >
            {t("shopLabel")}
          </Link>
          <Link
            underline="none"
            href="/about"
            sx={{
              color: "#000",
              fontFamily: FONTS.MAIN_TEXT_FAMILY,
              fontSize: "1.1rem",
            }}
          >
            {t("aboutLabel")}
          </Link>
          <Link
            underline="none"
            href="/contact"
            sx={{
              color: "#000",
              fontFamily: FONTS.MAIN_TEXT_FAMILY,
              fontSize: "1.1rem",
            }}
          >
            {t("contactLabel")}
          </Link>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          gap={"1rem"}
          width={"243px"}
          display={"flex"}
          justifyContent={"end"}
          sx={{
            "@media (max-width: 605px)": {
              gap: "0rem",
            },
          }}
        >
          <IconButton
            onClick={() =>
              dispatch(actions.setCartModalWindowOpen(!cartModalWindowOpen))
            }
            aria-label="cart"
            sx={{
              marginRight: cartModalWindowOpen ? "0px" : "1rem",
            }}
          >
            <Badge
              badgeContent={cartItemCount}
              sx={{
                color: "#FFF",
                "& .MuiBadge-badge": {
                  backgroundColor: BASE_COLORS.DEFAULT_BLUE,
                  fontSize: "14px",
                },
              }}
            >
              <ShoppingCartOutlinedIcon
                sx={{ color: "#000", width: "30px", height: "30px" }}
              />
            </Badge>
          </IconButton>
          {cartModalWindowOpen && <CartModalWindow />}
          <Button
            onClick={(event) => handleLanguageClick(event)}
            sx={{ color: "#000" }}
          >
            {" "}
            <Language
              sx={{ paddingRight: "10px", width: "30px", height: "30px" }}
            />
            <Typography
              fontFamily={FONTS.MAIN_TEXT_FAMILY}
              fontSize={"1.1rem"}
              sx={{
                "@media (max-width: 870px)": {
                  fontSize: "1.15rem",
                },
                "@media (max-width: 800px)": {
                  fontSize: "1.2rem",
                },
              }}
            >
              {currentLanguageCode}
            </Typography>
          </Button>
          <Menu
            open={!!anchorEl}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {languages.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  handleClose();
                  i18next.changeLanguage(item.code);
                }}
                sx={{ color: "#000" }}
              >
                <Typography
                  fontFamily={FONTS.MAIN_TEXT_FAMILY}
                  fontSize={"1.1rem"}
                  sx={{
                    "@media (max-width: 870px)": {
                      fontSize: "1.15rem",
                    },
                    "@media (max-width: 800px)": {
                      fontSize: "1.2rem",
                    },
                  }}
                >
                  {item.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
          <Button
            variant="text"
            sx={{
              padding: "0px",
              margin: "0px",
              "@media (min-width: 870px)": {
                display: "none",
                width: "40px",
                height: "40px",
              },
            }}
          >
            <MenuIcon
              sx={{
                color: "#000",
                width: "30px",
                height: "30px",
              }}
            />
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
