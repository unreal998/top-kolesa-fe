import React, { useEffect } from 'react';
import { TiresInput } from './components/TiresInput';
import { GoogleMap } from './components/GoogleMap';
import { Box } from '@mui/material';
import { OurServices } from './components/OurServices';
import { useDispatch } from 'react-redux';
import { actions } from './reducer';

export function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getFilterData());
  }, [dispatch]);

  return (
    <Box>
      <TiresInput />
      <OurServices />
      <GoogleMap />
    </Box>
  );
}
