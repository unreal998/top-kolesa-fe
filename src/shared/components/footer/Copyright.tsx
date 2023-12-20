import { CopyrightOutlined } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { BASE_COLORS } from '../../constants';

export function Copyright() {
  return (
    <Stack direction="row" alignItems="center">
      <Typography
        lineHeight="1.7"
        color={BASE_COLORS.DEFAULT_GREY}
        variant="body1">
        Copyright {<CopyrightOutlined />} 2023 TopKolesa. All Rights Reserved.
      </Typography>
    </Stack>
  );
}
