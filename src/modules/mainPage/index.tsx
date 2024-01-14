import React, { useEffect, useState } from 'react';
import { TiresInput } from './components/TiresInput';
import { GoogleMap } from './components/GoogleMap';
import { Box } from '@mui/material';
import { OurServices } from './components/OurServices';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { selectFilterData } from './selectors';
import Loader from '../../shared/components/Loader';

export function MainPage() {
  const dispatch = useDispatch();
  /*   const filtersParams = useSelector(selectFilterData());
  const [isLoading, setIsLoading] = useState(true); */

  useEffect(() => {
    dispatch(actions.getFilterData());
  }, [dispatch]);

  /* useEffect(() => {
    const allDataLoaded = Object.values(filtersParams).every(
      (array) => array.length > 0,
    );
    if (allDataLoaded) {
      setIsLoading(false);
    }
  }, [filtersParams]); */

  return (
    <Box>
      <TiresInput />
      <OurServices />
      <GoogleMap />
    </Box>
  );
}
