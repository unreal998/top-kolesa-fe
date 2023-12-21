import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchInput, selectSelectedStudded } from '../../../selectors';
import { actions } from '../../../reducer';

import styled from '@emotion/styled';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import {
  FILTER_COLORS,
  FONTS,
  BASE_COLORS,
} from '../../../../../shared/constants';
import { useTranslation } from 'react-i18next';

const CheckBoxContainer = styled(FormGroup)({
  display: 'grid',
  paddingLeft: '10px',
  gridTemplateColumns: 'repeat(2, 1fr)',
  overflowY: 'auto',
  maxHeight: '400px',
  width: '362px',
});

function FilterFullMenuSeasonData() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedStudded = useSelector(selectSelectedStudded);
  const searchInput = useSelector(selectSearchInput);
  const [studded, setStudded] = useState(selectedStudded);

  const filteredSeasons = useMemo(() => {
    return [t('studded'), t('studless')].filter((studded) =>
      studded.toLowerCase().includes(searchInput.toLowerCase()),
    );
  }, [searchInput]);

  const handleSeasonChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, studdedOption: string) => {
      const updatedStudded = e.target.checked
        ? [...studded, studdedOption]
        : studded.filter((s) => s !== studdedOption);
      setStudded(updatedStudded);
    },
    [studded],
  );

  const handleSubmit = () => {
    dispatch(actions.setStuddedChange(studded));
    dispatch(actions.toggleFullMenu());
  };

  const handleResetFilterSeason = () => {
    dispatch(actions.setResetStudded());
    setStudded([]);
  };

  return (
    <>
      <Box
        onClick={handleResetFilterSeason}
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '12px',
          marginBottom: '12px',
          width: 'fit-content',
          cursor:
            studded.length > 0 || selectedStudded.length > 0
              ? 'pointer'
              : 'default',
          color:
            studded.length > 0 || selectedStudded.length > 0
              ? FILTER_COLORS.TEXT_MAIN
              : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
          transition: 'all 0.2s ease',
        }}>
        <ClearIcon
          style={{
            color:
              studded.length > 0 || selectedStudded.length > 0
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
      <CheckBoxContainer>
        {filteredSeasons.length > 0 ? (
          filteredSeasons.map((type, i) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={studded.includes(i === 0 ? 'studded' : 'studless')}
                  onChange={(e) =>
                    handleSeasonChange(e, i === 0 ? 'studded' : 'studless')
                  }
                  sx={{
                    '&.Mui-checked': {
                      color: BASE_COLORS.DEFAULT_BLUE,
                      '&:after': {
                        backgroundColor: BASE_COLORS.DEFAULT_BLUE,
                      },
                    },
                  }}
                />
              }
              label={type}
              key={type}
              sx={{
                '& .MuiTypography-root': {
                  fontFamily: FONTS.MAIN_TEXT_FAMILY,
                },
              }}
            />
          ))
        ) : (
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: FONTS.MAIN_TEXT_FAMILY,
              marginTop: '20px',
            }}>
            {t('noMatchesFound')}
          </Typography>
        )}
      </CheckBoxContainer>
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{
          marginTop: '18px',
          fontFamily: FONTS.BOLD_TEXT_FAMILY,
          fontWeight: 'bold',
          background: BASE_COLORS.DEFAULT_BLUE,
          '&:hover': {
            background: BASE_COLORS.DEFAULT_BLUE,
          },
        }}>
        {t('set')}
      </Button>
    </>
  );
}

export default FilterFullMenuSeasonData;
