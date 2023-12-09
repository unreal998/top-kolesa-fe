import { useSelector } from "react-redux";

import { Stack, styled } from "@mui/material";

import { selectSelectedItemData } from "../../shopPage/selectors";
import { SHOP_ITEM_TIRES_IMG_PREFIX } from "../../../constants";

const StyledStack = styled(Stack)({
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  minHeight: "390px",
  maxHeight: "650px",
  minWidth: "390px",
  maxWidth: "650px",
  width: "520px",
  height: "520px",
  alignItems: "flex-end",
});

export default function TireImg() {
  const selectedItemData = useSelector(selectSelectedItemData());

  return (
    <StyledStack
      sx={{
        backgroundImage: selectedItemData?.image_file
          ? `url("${SHOP_ITEM_TIRES_IMG_PREFIX}${selectedItemData.image_file}")`
          : `url("./imgs/noPhotoImg.jpg")`,
      }}
    />
  );
}
