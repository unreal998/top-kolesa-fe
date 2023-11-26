import { Autocomplete, Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./reducer";
import { actions as shopActions } from "../shopPage/reducer";
import { selectSelectedCityName, selectCityListData, selectWarehoutListData } from "./selectors";
import { selectSelectedItemData } from "../shopPage/selectors";
import { itemBuyDataBuilder } from "../itemDetailsPage/utils/itemBuyDataBuilder";

export function CheckoutPage() {
    const dispatch = useDispatch();
    const cityListData = useSelector(selectCityListData())
    const warehouseData = useSelector(selectWarehoutListData())
    const selectedCityName = useSelector(selectSelectedCityName())
    const selectedItemData = useSelector(selectSelectedItemData());
    const [deliveryState, changeDeliveryState] = useState('self')
    const [paymentState, changePaymentState] = useState('cash')

    useEffect(() => {
      const searchParams = new URLSearchParams(document.location.search);
      const selectedItemId = searchParams.get("id");
      dispatch(shopActions.getShopItems(""));
      dispatch(shopActions.setSelectedItemId(selectedItemId || ""));
    }, [dispatch])

    const handleCityTextChange = useCallback((e: SyntheticEvent) => {
      const inputTarget = e.target as HTMLInputElement
      if (inputTarget.value.length > 1) {
        dispatch(actions.fetchCityListByInput(inputTarget.value))
      }
    }, [dispatch])

    const handleOrder = useCallback(() => {
      if (selectedItemData) {
        dispatch(actions.fetchBuyItemAction(itemBuyDataBuilder(selectedItemData)))
      }
    }, [dispatch, selectedItemData])

    const handleWarehouseTextChange = useCallback(() => {
      dispatch(actions.fetchWarehouseListByInput(selectedCityName))
    }, [selectedCityName, dispatch])

    const optionsData = useMemo(() => {
      return cityListData ? cityListData.map((option) => option.title) : []
    }, [cityListData])

    const optionsWarehouseData = useMemo(() => {
      return warehouseData ? warehouseData.map((option) => option.title) : []
    }, [warehouseData])

    return (
      <Stack flexDirection='column' padding="2% 10%" gap='10px'>
        <Stack gap='5px'>
          <Typography variant="h6">Контактні дані</Typography>
          <Stack gap='10px'>
            <TextField
              label="Прізвище"
              required={true}
            />
            <TextField
              label="Ім'я"
              required={true}
            />
            <TextField
              label="Телефон"
              required={true}
            />
            <TextField 
              label="Електронна пошта"
            />
          </Stack>
        </Stack>
        <Stack>
          <Typography variant="h6">Доставка</Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="self"
              name="radio-buttons-group"
              onChange={(e, value) => changeDeliveryState(value)}
            >
              <FormControlLabel value="self" control={<Radio />} label="Самовивіз" />
              <FormControlLabel value="post" control={<Radio />} label="Нова Пошта" />

            </RadioGroup>
          </FormControl>
          {deliveryState === 'post' && <Stack gap='10px'>
            <Autocomplete
              freeSolo
              disableClearable
              disablePortal
              options={optionsData}
              renderInput={(params: any) => <TextField  onChange={(e) => handleCityTextChange(e)} {...params} label="Місто" />}
            />
            <Autocomplete
              freeSolo
              disableClearable
              disablePortal
              onSelect={handleWarehouseTextChange}
              options={optionsWarehouseData}
              renderInput={(params: any) => <TextField {...params} label="Відділення" />}
            />
          </Stack>}
        </Stack>
        <Stack>
          <Typography variant="h6">Оплата</Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="cash"
              name="radio-buttons-group"
              onChange={(e, value) => changePaymentState(value)}
            >
              <FormControlLabel value="cash" control={<Radio />} label="Готівкою" />
              <FormControlLabel value="card" control={<Radio />} label="Переказ" />

            </RadioGroup>
          </FormControl>
        </Stack>
        <Stack gap='15px'>
          <Typography variant="h6">Додати коментар</Typography>
          <TextField
              multiline
              label=""
              rows={4}
            />
        </Stack>
        <Button sx={{width: '10%'}} variant="contained" onClick={handleOrder}>Придбати</Button>
      </Stack>
    )
}
