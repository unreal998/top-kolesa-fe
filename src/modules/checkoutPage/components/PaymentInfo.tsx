import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BASE_COLORS, FONTS } from '../../../shared/constants';

const StyledRadio = styled(Radio)({
  '&.Mui-checked': {
    color: BASE_COLORS.DEFAULT_BLUE,
  },
});

export function PaymentInfo({
  changePaymentState,
}: {
  changePaymentState: (value: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <Stack
      gap="5px"
      bgcolor={BASE_COLORS.BACKGROUND_WHITE}
      p={'2rem'}
      borderRadius={'0.5rem'}>
      <Typography
        variant="h6"
        fontWeight={600}
        pb={'1rem'}
        fontFamily={FONTS.BOLD_TEXT_FAMILY}>
        {t('pay')}
      </Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="cash"
          name="radio-buttons-group"
          onChange={(e, value) => changePaymentState(value)}>
          <FormControlLabel
            value="cash"
            control={<StyledRadio />}
            label={
              <Typography
                variant="subtitle1"
                fontSize={'1.1rem'}
                fontFamily={FONTS.MAIN_TEXT_FAMILY}>
                {t('cash')}
              </Typography>
            }
          />
          <FormControlLabel
            value="card"
            control={<StyledRadio />}
            label={
              <Typography
                variant="subtitle1"
                fontSize={'1.1rem'}
                fontFamily={FONTS.MAIN_TEXT_FAMILY}>
                {t('transfer')}
              </Typography>
            }
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}
