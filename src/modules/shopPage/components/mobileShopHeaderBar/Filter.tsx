import {
  Autocomplete,
  AutocompleteChangeReason,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  SwipeableDrawer,
  TextField,
  Typography,
} from '@mui/material';
import {
  BASE_COLORS,
  FILTER_COLORS,
  FONTS,
} from '../../../../shared/constants';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { SyntheticEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { inputLabelClasses } from '@mui/material/InputLabel';
import styled from '@emotion/styled';
import { actions } from '../../reducer';
import { useDispatch, useSelector } from 'react-redux';
import TiresFilter from '../../../mainPage/components/TiresFilter';
import { useNavigate } from 'react-router-dom';
import { selectFilterData } from '../../../mainPage/selectors';

type FieldType =
  | 'width'
  | 'profile'
  | 'diametr'
  | 'season'
  | 'brand'
  | 'studed';

type AutocompleteOptionType = {
  id: FieldType;
  options: string[] | number[];
  label: string;
  onChange: (
    event: SyntheticEvent,
    value: unknown,
    reason: AutocompleteChangeReason,
  ) => void;
};

const StyledAutocomplete = styled(Autocomplete)({
  //LABEL COLOR/FONTS
  '&:hover': {
    [`& .${inputLabelClasses.root}.${inputLabelClasses.shrink}`]: {
      color: BASE_COLORS.DEFAULT_BLUE,
    },
  },
  [`& .${inputLabelClasses.root}`]: {
    color: 'defaultColor',
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
    fontSize: '16px',
    [`&.${inputLabelClasses.focused}`]: {
      color: BASE_COLORS.DEFAULT_BLUE,
    },
  },
  //INPUT COLOR/FONTS
  '& .MuiOutlinedInput-root': {
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
    fontSize: '16px',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: BASE_COLORS.DEFAULT_BLUE,
      color: BASE_COLORS.DEFAULT_BLUE,
      fontSize: '16px',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: BASE_COLORS.DEFAULT_BLUE,
    },
    '&.Mui-focused .MuiInputLabel-root': {
      color: BASE_COLORS.DEFAULT_BLUE,
    },
  },
  '& .MuiAutocomplete-clearIndicator': {
    color: FILTER_COLORS.BUTTON_RESET_FILTER,
  },

  //OPTION COLOR/FONTS
  '& + .MuiAutocomplete-popper .MuiAutocomplete-option': {
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
    fontSize: '16px',
  },
  '& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover': {
    backgroundColor: FILTER_COLORS.DEFAULT_BLUE_INACTIVE,
  },
  "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']:hover":
    {
      backgroundColor: `${FILTER_COLORS.DEFAULT_BLUE_INACTIVE} !important`,
      color: `${FILTER_COLORS.TEXT_MAIN} !important`,
      fontSize: '16px',
    },
  "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']": {
    backgroundColor: `${BASE_COLORS.DEFAULT_BLUE} !important`,
    color: `${BASE_COLORS.BACKGROUND_WHITE}`,
    fontSize: '16px',
  },
});

export function Filter() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useNavigate();
  const filtersParams = useSelector(selectFilterData());
  const [width, setWidthValue] = useState('');
  const [profile, setProfileValue] = useState('');
  const [diametr, setDiametrValue] = useState('');
  const [season, setSeasonValue] = useState('');
  const [brand, setBrandValue] = useState('');
  const [studed, setStudedValue] = useState('');
  const [openFilter, setOpenFilter] = useState({
    left: false,
  });

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      event.stopPropagation();
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpenFilter({ left: open });
    };

  const handleSearchButton = useCallback(() => {
    dispatch(actions.setSelectedWidth(width));
    dispatch(actions.setSelectedProfile(profile));
    dispatch(actions.setSelectedDiametr(diametr));
    dispatch(actions.setSeasonChange([season]));
    dispatch(actions.setBrandChange([brand]));
    dispatch(actions.setStuddedChange([studed]));
    history(
      `shop/?price=${JSON.stringify([
        Math.min.apply(null, filtersParams.prices),
        Math.max.apply(null, filtersParams.prices),
      ])}&width=${JSON.stringify(width)}&profile=${JSON.stringify(
        profile,
      )}&diametr=${JSON.stringify(diametr)}&season=${JSON.stringify(
        season === t('summer')
          ? 'summer'
          : season === t('winter')
          ? 'winter'
          : 'all-season',
      )}&brand=${JSON.stringify(brand)}&studed=${JSON.stringify(studed)}`,
      { replace: true },
    );
    setOpenFilter({ left: false });
  }, [
    brand,
    diametr,
    filtersParams.prices,
    history,
    profile,
    season,
    t,
    width,
    dispatch,
    studed,
  ]);

  function handleCleareAllFilters() {
    dispatch(actions.setClearSelectedWidth());
    dispatch(actions.setClearSelectedProfile());
    dispatch(actions.setClearSelectedDiametr());
    dispatch(actions.setResetSeason());
    dispatch(actions.setResetBrand());
    dispatch(actions.setResetStudded());
    setWidthValue('');
    setProfileValue('');
    setDiametrValue('');
    setSeasonValue('');
    setBrandValue('');
    setStudedValue('');
  }

  const handleAutocompleteChange = useCallback(
    (type: FieldType) =>
      (
        event: SyntheticEvent,
        value: unknown,
        reason: AutocompleteChangeReason,
      ) => {
        if (typeof value !== 'string') return;
        switch (type) {
          case 'width':
            setWidthValue(value);
            break;
          case 'profile':
            setProfileValue(value);
            break;
          case 'diametr':
            setDiametrValue(value);
            break;
          case 'season':
            setSeasonValue(value);
            break;
          case 'brand':
            setBrandValue(value);
            break;
          case 'studed':
            setStudedValue(value);
            break;
          default:
            break;
        }
      },
    [],
  );

  const getValueForAutocomplete = (id: string) => {
    switch (id) {
      case 'width':
        return width;
      case 'profile':
        return profile;
      case 'diametr':
        return diametr;
      case 'season':
        return season;
      case 'brand':
        return brand;
      case 'studed':
        return studed;
      default:
        return '';
    }
  };

  const sortOptions = useCallback((options: (string | number)[]) => {
    const optionsCopy = [...options];
    return optionsCopy.sort((a, b) => {
      const aStr = a.toString();
      const bStr = b.toString();
      return isNaN(Number(a)) || isNaN(Number(b))
        ? aStr.localeCompare(bStr)
        : Number(a) - Number(b);
    });
  }, []);

  const autocompleteOptions: AutocompleteOptionType[] = [
    {
      id: 'width',
      options: filtersParams?.width.slice(1),
      label: t('width'),
      onChange: handleAutocompleteChange('width'),
    },
    {
      id: 'profile',
      options: filtersParams?.height.slice(1),
      label: t('profile'),
      onChange: handleAutocompleteChange('profile'),
    },
    {
      id: 'diametr',
      options: filtersParams?.diametr.slice(1),
      label: t('diametr'),
      onChange: handleAutocompleteChange('diametr'),
    },
    {
      id: 'season',
      options: [t('summer'), t('winter'), t('all-season')],
      label: t('season'),
      onChange: handleAutocompleteChange('season'),
    },
    {
      id: 'brand',
      options: filtersParams?.brands,
      label: t('brand'),
      onChange: handleAutocompleteChange('brand'),
    },
    {
      id: 'studed',
      options: [t('studded'), t('studless')],
      label: t('studded'),
      onChange: handleAutocompleteChange('studed'),
    },
  ];

  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        variant="text"
        sx={{
          padding: '0px',
          margin: '0px',
          '@media (max-width: 918px)': {
            minWidth: 0,
          },
        }}>
        <MenuIcon
          fontSize="large"
          sx={{
            color: 'white',
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{ color: 'white', marginTop: '0.2rem', paddingLeft: '0.4rem' }}>
          {t('filters')}
        </Typography>
      </Button>
      <SwipeableDrawer
        anchor={'left'}
        open={openFilter.left}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}>
        <Box
          width={'50vw'}
          role="presentation"
          sx={{ '@media (max-width: 600px)': { width: '100vw' } }}
          m={'5%'}>
          <List>
            {autocompleteOptions.map(({ id, options, label, onChange }) => (
              <ListItem>
                <StyledAutocomplete
                  key={id}
                  disablePortal
                  onChange={onChange}
                  options={
                    id === 'width' || id === 'brand'
                      ? sortOptions(options)
                      : options
                  }
                  value={getValueForAutocomplete(id)}
                  renderInput={(params) => (
                    <TextField
                      label={t(label)}
                      {...params}
                      InputLabelProps={{
                        ...params.InputLabelProps,
                        children: undefined,
                      }}
                    />
                  )}
                  sx={{
                    width: '90%',
                  }}
                />
              </ListItem>
            ))}
            <Box display={'flex'} width={'91%'} justifyContent={'space-around'}>
              <Button
                variant="contained"
                onClick={handleCleareAllFilters}
                sx={{
                  mt: '1rem',
                  width: '40%',
                  height: '50px',
                  fontFamily: FONTS.BOLD_TEXT_FAMILY,
                  fontWeight: 'bold',
                  color: FILTER_COLORS.TEXT_MAIN,
                  background: FILTER_COLORS.SHORT_MENU_RESET_BUTTON_BACKGROUND,
                  fontSize: '1rem',
                  '&:hover': {
                    background:
                      FILTER_COLORS.SHORT_MENU_RESET_BUTTON_BACKGROUND,
                  },
                }}>
                {t('resetFilter')}
              </Button>
              <Button
                variant="contained"
                onClick={handleSearchButton}
                sx={{
                  mt: '1rem',
                  width: '40%',
                  height: '50px',
                  fontFamily: FONTS.BOLD_TEXT_FAMILY,
                  fontWeight: 'bold',
                  background: BASE_COLORS.DEFAULT_BLUE,
                  fontSize: '1.4rem',
                  '&:hover': {
                    background: BASE_COLORS.DEFAULT_BLUE,
                  },
                }}>
                {t('searchButton')}
              </Button>
            </Box>
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
