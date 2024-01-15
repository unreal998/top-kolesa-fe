import React, { useEffect, useState } from 'react';
import { TiresInput } from './components/TiresInput';
import { GoogleMap } from './components/GoogleMap';
import { Box } from '@mui/material';
import { OurServices } from './components/OurServices';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { selectFilterData } from './selectors';
import Loader from '../../shared/components/Loader';
import { BASE_COLORS } from '../../shared/constants';

export function MainPage() {
  const dispatch = useDispatch();
  const filtersParams = useSelector(selectFilterData());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(actions.getFilterData());
  }, [dispatch]);

  useEffect(() => {
    const allDataLoaded = Object.values(filtersParams).every(
      (array) => array.length > 0,
    );
    if (allDataLoaded) {
      setIsLoading(false);
    }
  }, [filtersParams]);

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
            backgroundColor: BASE_COLORS.BACKGROUND_WHITE,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
          <Loader />
        </Box>
      )}
      <Box>
        <TiresInput />
        <OurServices />
        <GoogleMap />
      </Box>
    </>
  );
}
