import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { actions as mainActions } from '../mainPage/reducer';
import { selectIsFullMenuOpen } from './selectors';
import { selectFilterData } from '../mainPage/selectors';

import { Box, Dialog } from '@mui/material';

import { ShopContainer } from './components/ShopContainer';
import FilterShortMenuContainer from './components/filterMenu/filterShortMenu/FilterShortMenuContainer';
import FilterFullMenuContainer from './components/filterMenu/filterFullMenu/FilterFullMenuContainer';

export function ShopPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const isFullMenuOpen = useSelector(selectIsFullMenuOpen);
  const filtersParams = useSelector(selectFilterData());

  useEffect(() => {
    if (searchParams.size > 0) {
      dispatch(
        actions.getShopItems({
          price: searchParams.get('price'),
          width: searchParams.get('width'),
          profile: searchParams.get('profile'),
          diametr: searchParams.get('diametr'),
          season: searchParams.get('season'),
          brand: searchParams.get('brand'),
        }),
      );
    } else {
      dispatch(actions.getShopItems(''));
    }
    dispatch(mainActions.getFilterData());
  }, [dispatch, searchParams]);

  useEffect(() => {
    const minPrice = Math.min(...filtersParams.prices);
    const maxPrice = Math.max(...filtersParams.prices);
    dispatch(actions.initializePriceRange([minPrice, maxPrice]));
  }, [dispatch, filtersParams.prices]);

  const handleCloseMenu = () => {
    dispatch(actions.toggleFullMenu());
  };

  return (
    <Box
      padding="0 30px"
      display="flex"
      alignItems="flex-start"
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
