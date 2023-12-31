import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilterData } from '../../../../mainPage/selectors';
import { selectSearchInput, selectSelectedDiametr } from '../../../selectors';
import { actions } from '../../../reducer';

import { useTranslation } from 'react-i18next';

import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { FILTER_COLORS, FONTS } from '../../../../../shared/constants';

const ButtonsContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  overflowY: 'auto',
  maxHeight: '472px',
  width: '372px',
});

const StyledButton = styled(Button)({
  height: '59px',
  border: 'none',
  fontSize: '1.2rem',
  fontFamily: FONTS.BOLD_TEXT_FAMILY,
  color: `${FILTER_COLORS.TEXT_MAIN}`,
  '&:hover': {
    backgroundColor: `${FILTER_COLORS.BACKGROUND_GREY}`,
    border: 'none',
    borderColor: 'transparent',
  },
  '&:focus': {
    borderColor: 'transparent',
  },
});

function FilterFullMenuDiametr() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchInput = useSelector(selectSearchInput);
  const selectedDiametr = useSelector(selectSelectedDiametr);
  const filtersParams = useSelector(selectFilterData());
  const [filteredDiamenrOptions, setFilteredDiamenrOptions] = useState(
    filtersParams.diametr,
  );

  useEffect(() => {
    const filtered = filtersParams.diametr.filter((option) =>
      option.includes(searchInput),
    );

    setFilteredDiamenrOptions(filtered);
  }, [searchInput, filtersParams.diametr]);

  const handleDiametrClick = useCallback(
    (diametr: string) => {
      dispatch(actions.setSelectedDiametr(diametr));
      dispatch(actions.toggleFullMenu());
    },
    [dispatch],
  );

  const handleResetFilterDiametr = () => {
    dispatch(actions.setSelectedDiametr(''));
  };

  return (
    <>
      <Box
        onClick={handleResetFilterDiametr}
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '12px',
          marginBottom: '12px',
          width: 'fit-content',
          cursor: 'pointer',
          color:
            selectedDiametr.length > 0
              ? FILTER_COLORS.TEXT_MAIN
              : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
          transition: 'all 0.2s ease',
        }}>
        <ClearIcon
          style={{
            color:
              selectedDiametr.length > 0
                ? FILTER_COLORS.BUTTON_RESET_FILTER
                : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
            transition: 'all 0.2s ease',
          }}
        />
        <Typography
          variant="subtitle2"
          pt={0.2}
          sx={{
            fontFamily: FONTS.MAIN_TEXT_FAMILY,
          }}>
          {t('resetFilter')}
        </Typography>
      </Box>
      <ButtonsContainer>
        {filteredDiamenrOptions.length > 0 ? (
          filteredDiamenrOptions.slice(1).map((diametrOption) => (
            <StyledButton
              key={diametrOption}
              variant="outlined"
              onClick={() => handleDiametrClick(diametrOption)}
              style={{
                backgroundColor:
                  diametrOption === selectedDiametr
                    ? `${FILTER_COLORS.BACKGROUND_GREY}`
                    : 'transparent',
              }}>
              {diametrOption}
            </StyledButton>
          ))
        ) : (
          <Box
            paddingLeft={1.2}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '200px',
            }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: FONTS.MAIN_TEXT_FAMILY,
                marginTop: '20px',
              }}>
              {t('noMatchesFound')}
            </Typography>
          </Box>
        )}
      </ButtonsContainer>
    </>
  );
}

export default FilterFullMenuDiametr;
