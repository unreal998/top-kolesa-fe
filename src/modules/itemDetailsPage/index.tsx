import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../shopPage/reducer';
import { selectSelectedItemData } from '../shopPage/selectors';

import { Box, Stack, styled } from '@mui/material';

import Tooltips from './components/Tooltips';
import Header from './components/Header';
import BuyOptions from './components/BuyOptions';
import TireImg from './components/TireImg';
import FullInfo from './components/FullInfo';
import TopRated from './components/TopRated';
import Loader from '../../shared/components/Loader';

import { BASE_COLORS } from '../../shared/constants';

const StyledItemBox = styled(Stack)({
  backgroundColor: BASE_COLORS.BACKGROUND_WHITE,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '50px',
  padding: '4rem 2rem',
  borderRadius: '0.75rem',
  width: '80rem',
  margin: 'auto',
  '@media (max-width: 1500px)': {
    padding: '2rem',
    width: '90%',
  },
  '@media (max-width: 1300px)': {
    padding: '2rem 1rem',
    width: '70rem',
  },
  '@media (max-width: 1200px)': {
    gap: '0',
    justifyContent: 'space-around',
    width: '64rem',
  },
  '@media (max-width: 990px)': {
    gap: '0',
    justifyContent: 'space-around',
    width: '95%',
  },
  '@media (max-width: 918px)': {
    flexDirection: 'column',
    width: '90%',
    paddingTop: '5%',
  },
});

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
        <Stack
          padding="5% 1%"
          gap="10px"
          m={'auto'}
          sx={{
            '@media (max-width: 1300px)': {
              padding: '5% 1%',
            },
          }}>
          <StyledItemBox>
            <TireImg />
            <Stack mx={1}>
              <Header />
              <BuyOptions tireId={selectedItemData?.id} />
              <Tooltips />
            </Stack>
          </StyledItemBox>
          <FullInfo />
          <TopRated />
        </Stack>
      )}
    </>
  );
}
