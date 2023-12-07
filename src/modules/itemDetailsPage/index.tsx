import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Rating,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { BASE_COLORS } from "../../shared/constants";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import GppGoodIcon from "@mui/icons-material/GppGood";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import { SmallDescription } from "./components/SmallDescription";
import { FullDescription } from "./components/FullDescription";
import { ReviewPage } from "./components/ReviewPage";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../shopPage/reducer";
import { actions as itemDetailsActions } from "./reducer";
import { selectSelectedItemData } from "../shopPage/selectors";
import { SHOP_ITEM_TIRES_IMG_PREFIX } from "../../constants";
import { itemBuyDataBuilder } from "./utils/itemBuyDataBuilder";
import { useNavigate } from "react-router";
import Loader from "../../shared/components/Loader";
/* import ClipLoader from "react-spinners/ClipLoader"; */

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: ITabPanelProps) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </div>
  );
}

export function ItemDetailsPage() {
  const [modalValue, setModalValue] = React.useState(0);
  const [deliveryPopupHover, setDeliveryPopupHover] = useState(false);
  const [guarantiePopupHover, setGuarantiePopupHover] = useState(false);
  const [revertPopupHover, setRevertPopupHover] = useState(false);
  const selectedItemData = useSelector(selectSelectedItemData());
  const dispatch = useDispatch();
  const history = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const selectedItemId = searchParams.get("id");
    setLoading(true);
    dispatch(actions.getShopItems(""));
    dispatch(actions.setSelectedItemId(selectedItemId || ""));
  }, [dispatch]);

  useEffect(() => {
    if (selectedItemData) {
      setLoading(false);
    }
  }, [selectedItemData]);

  const handleBuy = useCallback(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const selectedItemId = searchParams.get("id");
    history(`/checkout?id=${selectedItemId}`, { replace: true });
  }, [history]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setModalValue(newValue);
  };
  return (
    <>
      {loading ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"30vh"}
        >
          <Loader />
        </Box>
      ) : (
        <Stack padding="0 15% 2%" gap="10px">
          <Stack
            bgcolor={BASE_COLORS.BACKGROUND_WHITE}
            direction="row"
            justifyContent="center"
            gap="50px"
            padding="7%"
          >
            <Stack
              sx={{
                backgroundImage: selectedItemData?.image_file
                  ? `url("${SHOP_ITEM_TIRES_IMG_PREFIX}${selectedItemData.image_file}")`
                  : `url("./imgs/noPhotoImg.jpg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                minHeight: "300px",
                maxHeight: "500px",
                minWidth: "300px",
                maxWidth: "500px",
                width: "400px",
                height: "400px",
                alignItems: "flex-end",
              }}
            />
            <Stack gap="15px">
              <Stack
                bgcolor={BASE_COLORS.BACKGROUND_WHITE}
                alignItems="flex-start"
                justifyContent="center"
                gap="5px"
                width="100%"
              >
                <Rating
                  name="read-only"
                  value={selectedItemData?.rate}
                  readOnly
                />
                <Typography variant="h3">
                  {" "}
                  {selectedItemData?.brand} {selectedItemData?.name}{" "}
                  {selectedItemData?.width}/{selectedItemData?.height} R
                  {selectedItemData?.diametr}{" "}
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="600"
                  fontSize="30px"
                  color={BASE_COLORS.DEFAULT_BLUE}
                >
                  ${selectedItemData?.price_uah}
                </Typography>
              </Stack>
              <Divider
                sx={{
                  width: "100%",
                  borderColor: BASE_COLORS.DEFAULT_BLUE,
                  borderStyle: "dashed",
                }}
              />
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row">
                  <Typography
                    fontSize="0.8rem"
                    color={BASE_COLORS.DEFAULT_GREY}
                    variant="body1"
                  >
                    <b>AVIABILITY:</b> aviable
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography
                    fontSize="0.8rem"
                    color={BASE_COLORS.DEFAULT_GREY}
                    variant="body1"
                  >
                    <b>ARTICLE:</b> {selectedItemData?.id}
                  </Typography>
                </Stack>
              </Stack>
              <Button variant="contained" onClick={handleBuy}>
                Придбати
              </Button>
              <Button variant="contained" onClick={handleBuy}>
                Додати у кошик
              </Button>
              {selectedItemData && <SmallDescription {...selectedItemData} />}
              <Stack justifyContent="space-between" direction="row">
                <Tooltip
                  onMouseEnter={() => setDeliveryPopupHover(true)}
                  onMouseLeave={() => setDeliveryPopupHover(false)}
                  color={BASE_COLORS.DEFAULT_BLUE}
                  title={
                    <Stack padding="10px">
                      <Typography variant="h6">Доставка</Typography>
                      <Typography variant="body1">
                        - Вартість від 35 грн.
                      </Typography>
                      <Typography variant="body1">
                        - Термін доставки 1-3 дні.
                      </Typography>
                      <Typography variant="body1">
                        - Доставляємо службами Нова Пошта
                      </Typography>
                      <Typography variant="body1">
                        - Є можливість самовивозу зі складів в Вінниці згідно
                        графіку роботи.
                      </Typography>
                    </Stack>
                  }
                >
                  <Stack alignItems="center">
                    {deliveryPopupHover ? (
                      <LocalShippingRoundedIcon
                        sx={{
                          color: BASE_COLORS.DEFAULT_BLUE,
                          width: "1.3em",
                          height: "1.3em",
                        }}
                      />
                    ) : (
                      <LocalShippingOutlinedIcon
                        sx={{
                          color: BASE_COLORS.DEFAULT_BLUE,
                          width: "1.3em",
                          height: "1.3em",
                        }}
                      />
                    )}
                    <Typography variant="h6">Доставка</Typography>
                  </Stack>
                </Tooltip>
                <Tooltip
                  color={BASE_COLORS.DEFAULT_BLUE}
                  onMouseEnter={() => setGuarantiePopupHover(true)}
                  onMouseLeave={() => setGuarantiePopupHover(false)}
                  title={
                    <Stack padding="10px">
                      <Typography variant="h6">Гарантія</Typography>
                      <Typography variant="body1">- Від виробника.</Typography>
                    </Stack>
                  }
                >
                  <Stack alignItems="center">
                    {guarantiePopupHover ? (
                      <GppGoodIcon
                        sx={{
                          color: BASE_COLORS.DEFAULT_BLUE,
                          width: "1.3em",
                          height: "1.3em",
                        }}
                      />
                    ) : (
                      <GppGoodOutlinedIcon
                        sx={{
                          color: BASE_COLORS.DEFAULT_BLUE,
                          width: "1.3em",
                          height: "1.3em",
                        }}
                      />
                    )}
                    <Typography variant="h6">Гарантія</Typography>
                  </Stack>
                </Tooltip>
                <Tooltip
                  color={BASE_COLORS.DEFAULT_BLUE}
                  onMouseEnter={() => setRevertPopupHover(true)}
                  onMouseLeave={() => setRevertPopupHover(false)}
                  title={
                    <Stack padding="10px">
                      <Typography variant="h6">Повернення</Typography>
                      <Typography variant="body1">
                        Протягом 14 днів <b>(Якщо товар не експлуатувався).</b>
                      </Typography>
                    </Stack>
                  }
                >
                  <Stack alignItems="center">
                    {revertPopupHover ? (
                      <ReplayCircleFilledIcon
                        sx={{
                          color: BASE_COLORS.DEFAULT_BLUE,
                          width: "1.3em",
                          height: "1.3em",
                        }}
                      />
                    ) : (
                      <ReplayOutlinedIcon
                        sx={{
                          color: BASE_COLORS.DEFAULT_BLUE,
                          width: "1.3em",
                          height: "1.3em",
                        }}
                      />
                    )}
                    <Typography variant="h6">Повернення</Typography>
                  </Stack>
                </Tooltip>
              </Stack>
            </Stack>
          </Stack>
          <Box display="flex" alignContent="center" justifyContent="center">
            <Tabs value={modalValue} onChange={handleChange}>
              <Tab label="Description" />
              <Tab label="Review (0)" />
            </Tabs>
          </Box>
          <CustomTabPanel value={modalValue} index={0}>
            {selectedItemData && <FullDescription {...selectedItemData} />}
          </CustomTabPanel>
          <CustomTabPanel value={modalValue} index={1}>
            <ReviewPage />
          </CustomTabPanel>
        </Stack>
      )}
    </>
  );
}
