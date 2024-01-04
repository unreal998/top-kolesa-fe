import { Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BASE_COLORS, FONTS } from '../../../shared/constants';
import styled from '@emotion/styled';

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

type ContactInfoProps = {
  setInputedFirstName: (value: string) => void;
  setInputedLastName: (value: string) => void;
  setInputedPhone: (value: string) => void;
  setInputedEmail: (value: string) => void;
};

export function ContactInfo({
  setInputedFirstName,
  setInputedLastName,
  setInputedPhone,
  setInputedEmail,
}: ContactInfoProps) {
  const { t } = useTranslation();

  const textFields = [
    {
      label: t('name'),
      required: true,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputedFirstName(e.target.value),
    },
    {
      label: t('secondName'),
      required: true,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputedLastName(e.target.value),
    },
    {
      label: t('number'),
      required: true,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputedPhone(e.target.value),
    },
    {
      label: t('email'),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputedEmail(e.target.value),
    },
  ];
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
        {t('contactDestails')}
      </Typography>
      <Stack gap="0.5rem">
        {textFields.map((textField, i) => (
          <StyledTextField
            key={i}
            label={textField.label}
            required={textField.required}
            onChange={textField.onChange}
          />
        ))}
      </Stack>
    </Stack>
  );
}
