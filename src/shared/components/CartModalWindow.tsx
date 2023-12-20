import {
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartModalWindowOpen,
  selectShopItemsList,
} from "../../modules/shopPage/selectors";
import { actions, ShopItemAPI } from "../../modules/shopPage/reducer";
import { SHOP_ITEM_TIRES_IMG_PREFIX } from "../../constants";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { BASE_COLORS, FILTER_COLORS, FONTS } from "../../shared/constants";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type CartItem = {
  tireId: number | undefined;
  numberOfTires: number;
};

export default function CartModalWindow() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartModalWindowOpen = useSelector(selectCartModalWindowOpen);
  const shopItemsList = useSelector(selectShopItemsList());
  const [numberOfTires, setNumberOfTires] = useState<number>(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    setOpenDrawer(cartModalWindowOpen);
  }, [cartModalWindowOpen]);

  const cartItems = JSON.parse(localStorage.getItem("cartItem") || "[]");

  const handleIncreaseQuantity = useCallback(
    (tireId: number) => {
      const updatedCartItems = cartItems.map((item: CartItem) =>
        item.tireId === tireId
          ? { ...item, numberOfTires: item.numberOfTires + 1 }
          : item
      );
      localStorage.setItem("cartItem", JSON.stringify(updatedCartItems));
      setNumberOfTires(updatedCartItems);
    },
    [cartItems]
  );

  const handleDecreaseQuantity = useCallback(
    (tireId: number) => {
      const updatedCartItems = cartItems.map((item: CartItem) =>
        item.tireId === tireId
          ? { ...item, numberOfTires: Math.max(1, item.numberOfTires - 1) }
          : item
      );
      localStorage.setItem("cartItem", JSON.stringify(updatedCartItems));
      setNumberOfTires(updatedCartItems);
    },
    [cartItems]
  );

  const handleDeleteItem = useCallback(
    (tireId: number) => {
      const updatedCartItems = cartItems.filter(
        (item: CartItem) => item.tireId !== tireId
      );
      localStorage.setItem("cartItem", JSON.stringify(updatedCartItems));
      setNumberOfTires(updatedCartItems);
    },
    [cartItems]
  );

  const cartItemDetails = cartItems.map((cartItem: CartItem) => {
    const item = shopItemsList.find(
      (item: ShopItemAPI) => item.id === cartItem.tireId
    );
    return {
      ...cartItem,
      fullName: `${item?.brand} ${item?.name} ${item?.width}/${item?.height} R${item?.diametr}`,
      price: item?.price_uah,
      article: item?.id,
      image: item
        ? `${SHOP_ITEM_TIRES_IMG_PREFIX}${item.image_file}`
        : "./imgs/noPhotoImg.jpg",
    };
  });

  const totalAmount = cartItems.reduce((total: number, cartItem: CartItem) => {
    const item = shopItemsList.find((item) => item.id === cartItem.tireId);
    return total + (item ? (item.price_uah * cartItem.numberOfTires) / 4 : 0);
  }, 0);

  const handleCloseCartModalWindow = () => {
    dispatch(actions.setCartModalWindowOpen(!cartModalWindowOpen));
  };

  return (
    <Box>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleCloseCartModalWindow}
      >
        <Box
          sx={{
            width: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            height: "100%",
          }}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            borderBottom={`1px solid ${BASE_COLORS.DEFAULT_BLUE}`}
            p={1}
          >
            <ShoppingCartOutlinedIcon />
            <Typography
              variant="h5"
              fontFamily={FONTS.BOLD_TEXT_FAMILY}
              fontWeight={600}
            >
              {t("cart")}
            </Typography>
            <IconButton
              onClick={handleCloseCartModalWindow}
              sx={{
                color: FILTER_COLORS.BUTTON_RESET_FILTER,
                padding: 0,
                position: "absolute",
                top: 10,
                right: 10,
              }}
            >
              <CloseIcon
                sx={{
                  height: "20px",
                  width: "20px",
                  padding: 0,
                }}
              />
            </IconButton>
          </Box>
          <List
            sx={{
              padding: 0,
              overflowY: "auto",
              flex: 1,
            }}
          >
            {cartItemDetails.map((cartItem: any, index: any) => (
              <ListItem key={index} disablePadding>
                <Box
                  sx={{
                    borderBottom: `1px solid ${BASE_COLORS.DEFAULT_BLUE}`,
                    cursor: "default",
                    margin: "0 10px",
                    paddingTop: "10px",
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <IconButton
                    onClick={() => handleDeleteItem(cartItem.tireId)}
                    sx={{
                      padding: 0,
                      position: "absolute",
                      top: 10,
                      right: 10,
                      "&:hover": {
                        "& .MuiSvgIcon-root": {
                          color: FILTER_COLORS.BUTTON_RESET_FILTER,
                        },
                      },
                    }}
                  >
                    <DeleteIcon
                      sx={{
                        height: "20px",
                        width: "20px",
                        padding: 0,
                        transition: "all 0.1s ",
                      }}
                    />
                  </IconButton>
                  <Box display={"flex"} flexDirection={"column"} mb={1}>
                    <Link
                      href={`/item?id=${
                        cartItem.article ? cartItem.article.toString() : ""
                      }`}
                      color={"inherit"}
                      sx={{ textDecoration: "none", display: "inline" }}
                    >
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        fontFamily={FONTS.BOLD_TEXT_FAMILY}
                        mb={1}
                        p={"0 15px"}
                      >
                        {cartItem.fullName}
                      </Typography>
                    </Link>
                    <Box display={"flex"} gap={"4%"}>
                      <Box
                        component="img"
                        sx={{
                          width: "100px",
                          height: "100px",
                        }}
                        alt={cartItem.name}
                        src={cartItem.image}
                      />
                      <Box
                        display={"flex"}
                        justifyContent={"space-around"}
                        flexDirection={"column"}
                        width={"100%"}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          fontFamily={FONTS.BOLD_TEXT_FAMILY}
                          color={BASE_COLORS.DEFAULT_BLUE}
                        >
                          {`${
                            (cartItem.price * cartItem.numberOfTires) / 4
                          } ${t("uah")}`}
                        </Typography>
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          width={"40%"}
                        >
                          <IconButton
                            onClick={() => {
                              handleIncreaseQuantity(cartItem.tireId);
                            }}
                          >
                            <AddCircleOutlineIcon
                              sx={{
                                color: BASE_COLORS.DEFAULT_BLUE,
                              }}
                            />
                          </IconButton>
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            fontFamily={FONTS.BOLD_TEXT_FAMILY}
                          >
                            {cartItem.numberOfTires}
                          </Typography>
                          <IconButton
                            onClick={() => {
                              handleDecreaseQuantity(cartItem.tireId);
                            }}
                          >
                            <RemoveCircleOutlineIcon
                              sx={{
                                color: BASE_COLORS.DEFAULT_BLUE,
                              }}
                            />
                          </IconButton>
                        </Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight={500}
                          fontFamily={FONTS.MAIN_TEXT_FAMILY}
                          color={FILTER_COLORS.TEXT_MAIN}
                        >
                          {t("article")}: {cartItem.article}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              padding: "20px 10px",
            }}
          >
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                variant="h6"
                fontWeight={600}
                fontFamily={FONTS.BOLD_TEXT_FAMILY}
              >
                {t("totalCoast")}:
              </Typography>
              <Typography
                variant="h6"
                fontWeight={600}
                fontFamily={FONTS.BOLD_TEXT_FAMILY}
                color={BASE_COLORS.DEFAULT_BLUE}
              >
                {`${totalAmount} ${t("uah")}`}
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{
                fontFamily: FONTS.BOLD_TEXT_FAMILY,
                fontWeight: "bold",
                background: BASE_COLORS.DEFAULT_BLUE,
                "&:hover": {
                  background: BASE_COLORS.DEFAULT_BLUE,
                },
              }}
            >
              {t("makeAnOrder")}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
