import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ShopHeaderBar } from './laptopShopHeaderBar/ShopHeaderBar';
import { Box, Grid, Pagination, Stack, styled } from '@mui/material';
import { ShopItemCard } from './ShopItemCard';
import { ShopItemTable } from './ShopItemTable';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCardView,
  selectCurrentPageItemList,
  selectIsLoading,
  selectPagesCount,
  selectSortParams,
} from '../selectors';
import { actions } from '../reducer';
import { MobileShopHeaderBar } from './mobileShopHeaderBar/MobileShopHeaderBar';
import { BASE_COLORS, FONTS } from '../../../shared/constants';
import Loader from '../../../shared/components/Loader';
import NoFilterResults from './NoFilterResults';

const StyledGridBox = styled(Grid)({
  '@media (min-width: 2050px)': {
    '& .MuiGrid-item': {
      width: '25%',
    },
  },
  '@media (max-width: 2049px)': {
    '& .MuiGrid-item': {
      width: '33.3%',
    },
  },
  '@media (max-width: 1700px)': {
    '& .MuiGrid-item': {
      width: '50%',
    },
  },
  '@media (max-width: 1150px)': {
    '& .MuiGrid-item': {
      width: '50%',
    },
  },
  '@media (max-width: 1149px)': {
    '& .MuiGrid-item': {
      width: '100%',
    },
  },
  '@media (max-width: 919px)': {
    padding: '20px 2%',
  },
});

export function ShopContainer() {
  const dispatch = useDispatch();
  const pagesCount = useSelector(selectPagesCount());
  const shopItems = useSelector(selectCurrentPageItemList());
  const cardView = useSelector(selectCardView);
  const sortParams = useSelector(selectSortParams());
  const isLoading = useSelector(selectIsLoading);
  const [siblingCount, setSiblingCount] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setSiblingCount(0);
      } else {
        setSiblingCount(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePageChange = useCallback(
    (event: ChangeEvent<unknown>, page: number) => {
      dispatch(actions.setCurrentPage(page));
    },
    [dispatch],
  );

  const sorterShopItems = [...shopItems];
  switch (sortParams.sortBy) {
    case 'priceHigh':
      sorterShopItems.sort((a, b) => b.price_uah - a.price_uah);
      break;
    case 'priceLow':
      sorterShopItems.sort((a, b) => a.price_uah - b.price_uah);
      break;
    case 'rated':
      sorterShopItems.sort((a, b) => b.rate - a.rate);
      break;
    case 'date':
      sorterShopItems.sort((a, b) => b.year - a.year);
      break;
    default:
      break;
  }

  return (
    <Stack
      padding="20px 2%"
      width="150rem"
      margin={'auto'}
      gap="20px"
      alignItems="center"
      sx={{
        '@media (max-width: 919px)': {
          padding: '20px 0',
        },
      }}>
      <ShopHeaderBar />
      <MobileShopHeaderBar />
      {isLoading ? (
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          height={'50vh'}>
          <Loader />
        </Box>
      ) : (
        <>
          <StyledGridBox container spacing={2}>
            {shopItems && shopItems.length > 0 ? (
              sorterShopItems.map((item) => (
                <Grid item={true} key={item.id}>
                  {cardView ? (
                    <ShopItemCard
                      id={item.id}
                      brand={item.brand}
                      name={item.name}
                      width={item.width}
                      height={item.height}
                      diametr={item.diametr}
                      rating={item.rate}
                      price={item.price_uah}
                      imgName={item.image_file}
                      country={item.country}
                      season={item.season}
                      year={item.year}
                    />
                  ) : (
                    <ShopItemTable
                      id={item.id}
                      brand={item.brand}
                      name={item.name}
                      width={item.width}
                      height={item.height}
                      diametr={item.diametr}
                      rating={item.rate}
                      price={item.price_uah}
                      imgName={item.image_file}
                      country={item.country}
                      season={item.season}
                      year={item.year}
                    />
                  )}
                </Grid>
              ))
            ) : (
              <NoFilterResults />
            )}
          </StyledGridBox>
          <Pagination
            onChange={handlePageChange}
            count={pagesCount}
            variant="outlined"
            shape="rounded"
            siblingCount={siblingCount}
            sx={{
              '& .MuiPaginationItem-root': {
                fontFamily: FONTS.MAIN_TEXT_FAMILY,
                fontSize: '1rem',
              },
              '& .Mui-selected': {
                color: '#fff',
                backgroundColor: BASE_COLORS.DEFAULT_BLUE + ' !important',
              },
              '& .MuiPaginationItem-page:hover': {
                backgroundColor: BASE_COLORS.DEFAULT_BLUE + ' !important',
                color: '#fff',
              },
            }}
          />
        </>
      )}
    </Stack>
  );
}
