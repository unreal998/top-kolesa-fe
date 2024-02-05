import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedVechileType } from '../../../selectors';
import { actions } from '../../../reducer';

import styled from '@emotion/styled';
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
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

function FilterFullMenuVechileTypeData() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedVechileType = useSelector(selectSelectedVechileType);
  const vechileTypes = ['light', 'lightTruck', 'cargo'];
  const [vechileType, setVechileType] = useState(selectedVechileType);

  const handleTypeChange = useCallback(
    (_: unknown, type: string) => {
      setVechileType(type);
    },
    [vechileType],
  );

  const handleSubmit = () => {
    dispatch(actions.setVechileTypeChange(vechileType));
    dispatch(actions.toggleFullMenu());
  };

  const handleResetFilterSeason = () => {
    dispatch(actions.setVechileTypeChange(''));
    setVechileType('');
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
          cursor: vechileType !== '' ? 'pointer' : 'default',
          color:
            vechileType !== ''
              ? FILTER_COLORS.TEXT_MAIN
              : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
          transition: 'all 0.2s ease',
        }}>
        <ClearIcon
          style={{
            color:
              vechileType !== ''
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
        <RadioGroup onChange={handleTypeChange}>
          {vechileTypes.map((type) => (
            <FormControlLabel
              control={
                <Radio
                  value={type}
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
              label={t(type)}
              key={type}
              sx={{
                '& .MuiTypography-root': {
                  fontFamily: FONTS.MAIN_TEXT_FAMILY,
                },
              }}
            />
          ))}
        </RadioGroup>
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

export default FilterFullMenuVechileTypeData;
