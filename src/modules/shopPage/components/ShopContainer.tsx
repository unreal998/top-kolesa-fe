import React, { ChangeEvent, useCallback } from 'react';
import { Grid, Pagination, Stack } from '@mui/material';
import { ShopItemCard } from './ShopItemCard';
import { ShopItemTable } from './ShopItemTable';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCardView,
  selectCurrentPageItemList,
  selectPagesCount,
  selectSortParams,
} from '../selectors';
import { actions } from '../reducer';
import { MobileShopHeaderBar } from './mobileShopHeaderBar/MobileShopHeaderBar';
import { ShopHeaderBar } from './ShopHeaderBar';

export function ShopContainer() {
  const dispatch = useDispatch();
  const pagesCount = useSelector(selectPagesCount());
  const shopItems = useSelector(selectCurrentPageItemList());
  const cardView = useSelector(selectCardView);
  const sortParams = useSelector(selectSortParams());

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
      width="100%"
      gap="20px"
      alignItems="center"
      sx={{
        '@media (max-width: 919px)': {
          padding: '0',
        },
      }}>
      <ShopHeaderBar />
      <MobileShopHeaderBar />
      <Grid
        container
        spacing={2}
        sx={{
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
        }}>
        {shopItems &&
          sorterShopItems.map((item) => (
            <Grid key={item.id} item={true}>
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
          ))}
      </Grid>
      <Pagination
        onChange={handlePageChange}
        count={pagesCount}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}
