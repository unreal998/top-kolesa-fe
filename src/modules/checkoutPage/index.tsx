import { Box, Stack, TextField, Typography } from "@mui/material";
import React from "react";

export function CheckoutPage() {
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
            <TextField 
              label="Місто"
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
