import { styled, Box, Typography } from '@mui/material';

import { FILTER_COLORS, FONTS } from '../../../../../shared/constants';
import { useTranslation } from 'react-i18next';

const StyledButton = styled(Box)({
  display: 'flex',
  padding: '0 0 0 12px',
  boxSizing: 'border-box',
  alignItems: 'center',
  fontWeight: '600',
  height: '3.7rem',
  width: '16rem',
  borderRadius: 0,
  borderColor: FILTER_COLORS.BORDER,
  color: FILTER_COLORS.TEXT_MAIN,
  fontFamily: FONTS.BOLD_TEXT_FAMILY,
  background: FILTER_COLORS.SHORT_MENU_RESET_BUTTON_BACKGROUND,
  borderBottom: 'none',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: FILTER_COLORS.SHORT_MENU_RESET_BUTTON_BACKGROUND,
    borderColor: FILTER_COLORS.BORDER,
    borderBottom: 'none',
  },
  '&:active': {
    backgroundColor: FILTER_COLORS.SHORT_MENU_RESET_BUTTON_BACKGROUND,
    borderColor: FILTER_COLORS.BORDER,
    borderBottom: 'none',
  },
});

type FilterShortMenuRowProps = {
  icon: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

function FilterShortMenuReset({ icon, onClick }: FilterShortMenuRowProps) {
  const { t } = useTranslation();
  return (
    <StyledButton onClick={onClick}>
      <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          {icon}
        </Box>
        <Typography
          variant="body1"
          fontFamily={FONTS.BOLD_TEXT_FAMILY}
          fontWeight={600}
          ml={1.3}>
          {t('resetAllFilters')}
        </Typography>
      </Box>
    </StyledButton>
  );
}

export default FilterShortMenuReset;
