import { Autocomplete, Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./reducer";
import { actions as shopActions } from "../shopPage/reducer";
import { selectSelectedCityName, selectCityListData, selectWarehoutListData } from "./selectors";
import { selectSelectedItemData } from "../shopPage/selectors";
import { itemBuyDataBuilder } from "../itemDetailsPage/utils/itemBuyDataBuilder";
import { useTranslation } from "react-i18next";

export function CheckoutPage() {
    const dispatch = useDispatch();
    const cityListData = useSelector(selectCityListData())
    const warehouseData = useSelector(selectWarehoutListData())
    const selectedCityName = useSelector(selectSelectedCityName())
    const selectedItemData = useSelector(selectSelectedItemData());
    const [deliveryState, changeDeliveryState] = useState('self')
    const [paymentState, changePaymentState] = useState('cash');
    const { t } = useTranslation();

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
          <Typography variant="h6"> {t('contactDestails')} </Typography>
          <Stack gap='10px'>
          <TextField
              label={t('name')}
              required={true}
            />
            <TextField
              label={t('secondName')}
              required={true}
            />
            <TextField
              label={t('number')}
              required={true}
            />
            <TextField 
              label={t('email')}
            />
          </Stack>
        </Stack>
        <Stack>
          <Typography variant="h6"> {t('delivery')} </Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="self"
              name="radio-buttons-group"
              onChange={(e, value) => changeDeliveryState(value)}
            >
              <FormControlLabel value="self" control={<Radio />} label={t('pickup')} />
              <FormControlLabel value="post" control={<Radio />} label={t('novaPoshta')} />

            </RadioGroup>
          </FormControl>
          {deliveryState === 'post' && <Stack gap='10px'>
            <Autocomplete
              freeSolo
              disableClearable
              disablePortal
              options={optionsData}
              renderInput={(params: any) => <TextField  onChange={(e) => handleCityTextChange(e)} {...params} label={t('city')} />}
            />
            <Autocomplete
              freeSolo
              disableClearable
              disablePortal
              onSelect={handleWarehouseTextChange}
              options={optionsWarehouseData}
              renderInput={(params: any) => <TextField {...params} label={t('warehouse')} />}
            />
          </Stack>}
        </Stack>
        <Stack>
          <Typography variant="h6"> {t('pay')} </Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="cash"
              name="radio-buttons-group"
              onChange={(e, value) => changePaymentState(value)}
            >
              <FormControlLabel value="cash" control={<Radio />} label= {t('cash')} />
              <FormControlLabel value="card" control={<Radio />} label= {t('transfer')}/>

            </RadioGroup>
          </FormControl>
        </Stack>
        <Stack gap='15px'>
          <Typography variant="h6">{t('addComment')}</Typography>
          <TextField
              multiline
              label=""
              rows={4}
            />
        </Stack>
        <Button sx={{width: '10%'}} variant="contained" onClick={handleOrder}> {t('buy')}</Button>
      </Stack>
    )
}
