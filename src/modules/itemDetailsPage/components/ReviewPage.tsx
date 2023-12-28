import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Rating,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { ArrowRight } from '@mui/icons-material';

import { ReviewItem } from './ReviewItem';
import { BASE_COLORS, FONTS } from '../../../shared/constants';
import { ButtonWithIcon } from '../../../shared/components/ButtonWithIcon';

const StyledTextField = styled(TextField)({
  fontFamily: FONTS.MAIN_TEXT_FAMILY,
  width: '50%',
  '& input': { fontFamily: FONTS.MAIN_TEXT_FAMILY },
  '& textarea': { fontFamily: FONTS.MAIN_TEXT_FAMILY },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: BASE_COLORS.DEFAULT_BLUE,
    },
    '&.Mui-focused fieldset': {
      borderColor: BASE_COLORS.DEFAULT_BLUE,
    },
  },
  '@media (max-width: 630px)': {
    width: '100%',
  },
});

const StyledButton = styled(Button)({
  backgroundColor: BASE_COLORS.DEFAULT_BLUE,
  fontWeight: '600',
  borderRadius: '999px',
  padding: '20px 40px',
});

export default function ReviewPage() {
  const { t } = useTranslation();
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  return (
    <Stack
      padding="0 15%"
      gap="30px"
      maxWidth={'85rem'}
      m={'auto'}
      sx={{
        '@media (max-width: 2000px)': {
          padding: '0 5%',
        },
      }}>
      <ReviewItem />
      <Stack gap="15px" m={'auto'} width={'100%'}>
        <Typography
          fontWeight="600"
          variant="h5"
          fontFamily={FONTS.BOLD_TEXT_FAMILY}>
          {t('addReviewTitle')}
        </Typography>
        <Stack gap="20px">
          <Stack direction="row" gap="10px">
            <Typography
              color={BASE_COLORS.DEFAULT_GREY}
              component="legend"
              fontFamily={FONTS.MAIN_TEXT_FAMILY}>
              {t('yourRating')}
            </Typography>
            <Rating
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
              value={ratingValue}
            />
          </Stack>
          <Stack
            direction="row"
            gap="2%"
            sx={{
              '@media (max-width: 630px)': {
                flexDirection: 'column',
                gap: '20px',
              },
            }}>
            <StyledTextField placeholder={t('yourName')} />
            <StyledTextField placeholder={t('yourEmail')} />
          </Stack>
          <StyledTextField
            multiline
            sx={{
              width: '100%',
            }}
            rows={4}
            placeholder={t('yourComment')}
          />
          <Stack>
            <ButtonWithIcon
              button={
                <StyledButton variant="contained">
                  {t('addReviewButton')}
                </StyledButton>
              }
              icon={<ArrowRight />}></ButtonWithIcon>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
