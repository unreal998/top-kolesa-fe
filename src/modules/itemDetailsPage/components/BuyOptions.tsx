import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { actions } from "../../shopPage/reducer";
import { selectSelectedItemData } from "../../shopPage/selectors";

import { Box, Button, TextField, Typography, styled } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import { ButtonWithIcon } from "../../../shared/components/ButtonWithIcon";
import { BASE_COLORS, FONTS } from "../../../shared/constants";

const StyledTextField = styled(TextField)({
  width: "80px",
  height: "40px",
  "& input": {
    marginLeft: "10px",
    fontFamily: FONTS.BOLD_TEXT_FAMILY,
    fontWeight: 600,
    fontSize: "16px",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: BASE_COLORS.DEFAULT_BLUE,
    },
    "&.Mui-focused fieldset": {
      borderColor: BASE_COLORS.DEFAULT_BLUE,
    },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: BASE_COLORS.DEFAULT_BLUE,
  fontWeight: 600,
  fontFamily: "PT Sans, sans-serif",
  borderRadius: "999px",
  padding: "16px 40px",
});

type CartItem = {
  tireId: number | undefined;
  numberOfTires: number;
};

export default function BuyOptions({ tireId }: { tireId: number | undefined }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedItemData = useSelector(selectSelectedItemData());
  const history = useNavigate();
  const [numberOfTires, setNumberOfTires] = useState<number>(4);

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const selectedItemId = searchParams.get("id");
    dispatch(actions.getShopItems(""));
    dispatch(actions.setSelectedItemId(selectedItemId || ""));
  }, [dispatch]);

  const handleFastBuy = useCallback(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const selectedItemId = searchParams.get("id");

    history(`/checkout?id=${selectedItemId}`, { replace: true });
  }, [history]);

  const handleNumberOfTires = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numValue = Number(value);
    if (numValue >= 1) {
      setNumberOfTires(numValue);
    } else {
      setNumberOfTires(1);
    }
  };

  const handleAddToCart = () => {
    const existingCartItemsString = localStorage.getItem("cartItem");
    let existingCartItems = existingCartItemsString
      ? JSON.parse(existingCartItemsString)
      : [];

    const itemIndex = existingCartItems.findIndex(
      (item: CartItem) => item.tireId === tireId
    );

    if (itemIndex > -1) {
      existingCartItems[itemIndex].numberOfTires += numberOfTires;
    } else {
      existingCartItems.push({ tireId, numberOfTires });
    }

    localStorage.setItem("cartItem", JSON.stringify(existingCartItems));

    const cartItems = JSON.parse(localStorage.getItem("cartItem") || "").length;
    dispatch(actions.setCartItemCount(cartItems));
  };

  return (
    <>
      <Typography
        variant="h3"
        fontWeight="600"
        fontSize="30px"
        color={BASE_COLORS.DEFAULT_BLUE}
        fontFamily={FONTS.BOLD_TEXT_FAMILY}
        mt={"30px"}
        mb={"20px"}
      >
        {(Number(selectedItemData?.price_uah) / 4) * numberOfTires} {t("uah")}
      </Typography>
      <Box display={"flex"} margin={"20px 0 40px"} gap={3}>
        <StyledTextField
          id="outlined-basic"
          variant="outlined"
          type="number"
          value={numberOfTires}
          onChange={handleNumberOfTires}
        />
        <ButtonWithIcon
          button={
            <StyledButton onClick={handleAddToCart} variant="contained">
              {t("addToCart")}
            </StyledButton>
          }
          icon={
            <ShoppingCartOutlinedIcon sx={{ height: "14px", width: "14px" }} />
          }
        />
        <ButtonWithIcon
          button={
            <StyledButton onClick={handleFastBuy} variant="contained">
              {t("fastBuy")}
            </StyledButton>
          }
          icon={
            <ShoppingBagOutlinedIcon sx={{ height: "14px", width: "14px" }} />
          }
        />
      </Box>
    </>
  );
}
