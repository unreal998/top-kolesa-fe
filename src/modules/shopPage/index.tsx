import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { actions as mainActions } from '../mainPage/reducer';
import { selectIsFullMenuOpen } from './selectors';
import { selectFilterData } from '../mainPage/selectors';

import { Box, Dialog } from '@mui/material';

import { ShopContainer } from './components/ShopContainer';
import FilterShortMenuContainer from './components/FilterMenu/FilterShortMenu/FilterShortMenuContainer';
import FilterFullMenuContainer from './components/FilterMenu/FilterFullMenu/FilterFullMenuContainer';

export function ShopPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const isFullMenuOpen = useSelector(selectIsFullMenuOpen);
  const filtersParams = useSelector(selectFilterData());
  const [isInitialized, setIsInitialized] = useState<boolean>(true);

  console.log('isInitialized', isInitialized);

  useEffect(() => {
    if (searchParams.size > 0) {
      dispatch(
        actions.getShopItems({
          price: searchParams.get('price') || undefined,
          width: searchParams.get('width') || undefined,
          profile: searchParams.get('profile') || undefined,
          diametr: searchParams.get('diametr') || undefined,
          season: searchParams.get('season') || undefined,
          brand: searchParams.get('brand') || undefined,
          studded: searchParams.get('studded') || undefined,
        }),
      );
    } else {
      dispatch(actions.getShopItems(''));
    }
    dispatch(mainActions.getFilterData());
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (isInitialized) {
      const minPrice = Math.min(...filtersParams.prices);
      const maxPrice = Math.max(...filtersParams.prices);
      dispatch(actions.initializePriceRange([minPrice, maxPrice]));
    }
  }, [dispatch, filtersParams.prices, isInitialized]);

  useEffect(() => {
    if (filtersParams.prices.length > 0) {
      setIsInitialized(false);
    }
  }, [filtersParams.prices]);

  const handleCloseMenu = () => {
    dispatch(actions.toggleFullMenu());
  };

  return (
    <Box
      padding="0 30px"
      display="flex"
      alignItems="flex-start"
      maxWidth={'170rem'}
      m={'0 auto'}
      sx={{
        '@media (max-width: 918px)': {
          padding: '0',
        },
      }}>
      <Box position="relative">
        <FilterShortMenuContainer />
        {isFullMenuOpen && (
          <Dialog
            open={isFullMenuOpen}
            onClose={handleCloseMenu}
            aria-labelledby="filter-menu-dialog"
            sx={{
              '& .MuiDialog-paper': {
                width: '885px',
                height: '649px',
                maxWidth: '100%',
                maxHeight: '100%',
              },
            }}>
            <FilterFullMenuContainer />
          </Dialog>
        )}
      </Box>
      <ShopContainer />
    </Box>
  );
}
