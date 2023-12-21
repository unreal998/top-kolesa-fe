import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../shopPage/reducer';
import { selectSelectedItemData } from '../shopPage/selectors';

import { Box, Stack } from '@mui/material';

import Tooltips from './components/Tooltips';
import Header from './components/Header';
import BuyOptions from './components/BuyOptions';
import TireImg from './components/TireImg';
import FullInfo from './components/FullInfo';
import TopRated from './components/TopRated';
import Loader from '../../shared/components/Loader';

import { BASE_COLORS } from '../../shared/constants';

export function ItemDetailsPage() {
  const dispatch = useDispatch();
  const selectedItemData = useSelector(selectSelectedItemData());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const selectedItemId = searchParams.get('id');
    dispatch(actions.getShopItems(''));
    dispatch(actions.setSelectedItemId(selectedItemId || ''));
  }, [dispatch]);

  useEffect(() => {
    if (selectedItemData) {
      setLoading(false);
    }
  }, [selectedItemData]);

  return (
    <>
      {loading ? (
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'50vh'}>
          <Loader />
        </Box>
      ) : (
        <Stack padding="0 15% 2%" gap="10px">
          <Stack
            bgcolor={BASE_COLORS.BACKGROUND_WHITE}
            direction="row"
            justifyContent="center"
            alignItems={'center'}
            gap="50px"
            padding="50px"
            borderRadius={2}>
            <TireImg />
            <Stack width={'50%'}>
              <Header />
              <BuyOptions tireId={selectedItemData?.id} />
              <Tooltips />
            </Stack>
          </Stack>
          <FullInfo />
          <TopRated />
        </Stack>
      )}
    </>
  );
}
