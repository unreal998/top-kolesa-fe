import React, { useEffect, useState } from "react";
import { Box, Link, Rating, Stack, Typography } from "@mui/material";
import { BASE_COLORS } from "../../../shared/constants";
import { ShopItem } from "../reducer";
import { SHOP_ITEM_TIRES_IMG_PREFIX } from "../../../constants";

export function ShopItemCard({ id, name, imgName, rating, price }: ShopItem) {
  const [value, setValue] = useState<number | null>(2);

  useEffect(() => {
    setValue(rating);
  }, [rating]);

  return (
    <Link
      href={`/item?id=${id.toString()}`}
      sx={{
        textDecoration: "none",
        outline: "none",
        textAlign: "center",
      }}
    >
      <Stack
        direction="column"
        gap="15px"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          sx={{
            backgroundImage: imgName
              ? `url("${SHOP_ITEM_TIRES_IMG_PREFIX}${imgName}")`
              : `url("./imgs/noPhotoImg.jpg")`,
            width: "100%",
            height: "200px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
        <Stack
          bgcolor={BASE_COLORS.BACKGROUND_WHITE}
          alignItems="center"
          justifyContent="center"
          gap="5px"
          width="80%"
          padding="10%"
        >
          <Rating name="read-only" value={value} readOnly />
          <Typography
            fontFamily="Montserrat, sans-serif"
            fontWeight="700"
            color="#000"
          >
            {name}
          </Typography>
          <Typography
            fontFamily="PT Sans, sans-serif"
            fontWeight="600"
            fontSize="16px"
            color={BASE_COLORS.DEFAULT_BLUE}
          >
            ${price}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
}