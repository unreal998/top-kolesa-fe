import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import React, { SyntheticEvent, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./reducer";
import { selectSelectedCityName, selectCityListData, selectWarehoutListData } from "./selectors";

export function CheckoutPage() {
    const dispatch = useDispatch();
    const cityListData = useSelector(selectCityListData())
    const warehouseData = useSelector(selectWarehoutListData())
    const selectedCityName = useSelector(selectSelectedCityName())

    const handleCityTextChange = useCallback((e: SyntheticEvent) => {
      const inputTarget = e.target as HTMLInputElement
      if (inputTarget.value.length > 1) {
        dispatch(actions.fetchCityListByInput(inputTarget.value))
      }
    }, [dispatch])

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
      <Box flexDirection='row' padding="2% 10%">
        <Stack>
          <Typography>Контактні дані</Typography>
          <Stack>
            <TextField
              label="Телефон"
              required={true}
            />
            <TextField 
              label="Електронна пошта"
            />
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
          </Stack>
        </Stack>
        <Stack>
          <Typography>Доставка</Typography>
        </Stack>
        <Stack>
          <Typography>Оплата</Typography>
        </Stack>
        <Stack>
          <Typography>Додати коментар</Typography>
        </Stack>
      </Box>
    )
}
