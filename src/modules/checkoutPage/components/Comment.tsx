import {
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
  styled,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BASE_COLORS, FONTS } from '../../../shared/constants';

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
  },
  '& .MuiInputLabel-root': {
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
  },
  '& .MuiInputLabel-input': {
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: BASE_COLORS.DEFAULT_BLUE,
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: BASE_COLORS.DEFAULT_BLUE,
  },
  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: BASE_COLORS.DEFAULT_BLUE,
  },
});

export function Comment({
  setInputedComment,
}: {
  setInputedComment: (value: string) => void;
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
        {t('addComment')}
      </Typography>
      <StyledTextField
        multiline
        label=""
        rows={4}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputedComment(e.target.value)
        }
      />
    </Stack>
  );
}
