import {
  Box,
  IconButton,
  Link,
  ListItem,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { BASE_COLORS, FILTER_COLORS, FONTS } from '../constants';
import { t } from 'i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { CartItemData } from '../types';

type CartItemProps = {
  index: number;
  cartItemData: CartItemData;
  setNumberOfTires: (count: number) => void;
  cartItems: CartItemData[];
  containerStyles?: SxProps<Theme>;
};

export const CartItem = ({
  index,
  cartItemData,
  setNumberOfTires,
  cartItems,
  containerStyles,
}: CartItemProps) => {
  const handleIncreaseQuantity = (tireId: number) => {
    const updatedCartItems = cartItems.map((item: CartItemData) =>
      item.tireId === tireId
        ? { ...item, numberOfTires: item.numberOfTires + 1 }
        : item,
    ).length;
    localStorage.setItem('cartItem', JSON.stringify(updatedCartItems));
    setNumberOfTires(updatedCartItems);
  };

  const handleDecreaseQuantity = (tireId: number) => {
    const updatedCartItems = cartItems.map((item: CartItemData) =>
      item.tireId === tireId
        ? {
            ...item,
            numberOfTires: Math.max(1, item.numberOfTires - 1),
          }
        : item,
    ).length;
    localStorage.setItem('cartItem', JSON.stringify(updatedCartItems));
    setNumberOfTires(updatedCartItems);
  };

  const handleDeleteItem = (tireId: number) => {
    const updatedCartItems = cartItems.filter(
      (item: CartItemData) => item.tireId !== tireId,
    ).length;
    localStorage.setItem('cartItem', JSON.stringify(updatedCartItems));
    setNumberOfTires(updatedCartItems);
  };

  return (
    <ListItem key={index} disablePadding>
      <Box
        sx={{
          borderBottom: `1px solid ${BASE_COLORS.DEFAULT_BLUE}`,
          cursor: 'default',
          margin: '0 10px',
          paddingTop: '10px',
          position: 'relative',
          width: '100%',
          ...containerStyles,
        }}>
        <IconButton
          sx={{
            padding: 0,
            position: 'absolute',
            top: 10,
            right: 10,
            '&:hover': {
              '& .MuiSvgIcon-root': {
                color: FILTER_COLORS.BUTTON_RESET_FILTER,
              },
            },
          }}>
          <DeleteIcon
            onClick={() => handleDeleteItem(cartItemData.tireId)}
            sx={{
              height: '20px',
              width: '20px',
              padding: 0,
              transition: 'all 0.1s ',
            }}
          />
        </IconButton>
        <Box display={'flex'} flexDirection={'column'} mb={1}>
          <Link
            href={`/item?id=${cartItemData.article?.toString()}`}
            color={'inherit'}
            sx={{ textDecoration: 'none', display: 'inline' }}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              fontFamily={FONTS.BOLD_TEXT_FAMILY}
              mb={1}
              p={'0 15px'}>
              {cartItemData.fullName}
            </Typography>
          </Link>
          <Box display={'flex'} gap={'4%'}>
            <Box
              component="img"
              sx={{
                width: '100px',
                height: '100px',
              }}
              alt={cartItemData.name}
              src={cartItemData.image}
            />
            <Box
              display={'flex'}
              justifyContent={'space-around'}
              flexDirection={'column'}
              width={'100%'}>
              <Typography
                variant="h6"
                fontWeight={600}
                fontFamily={FONTS.BOLD_TEXT_FAMILY}
                color={BASE_COLORS.DEFAULT_BLUE}>
                {`${(cartItemData.price * cartItemData.numberOfTires) / 4} ${t(
                  'uah',
                )}`}
              </Typography>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                width={'40%'}>
                <IconButton
                  onClick={() => {
                    handleIncreaseQuantity(cartItemData.tireId);
                  }}>
                  <AddCircleOutlineIcon
                    sx={{
                      color: BASE_COLORS.DEFAULT_BLUE,
                    }}
                  />
                </IconButton>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  fontFamily={FONTS.BOLD_TEXT_FAMILY}>
                  {cartItemData.numberOfTires}
                </Typography>
                <IconButton
                  onClick={() => {
                    handleDecreaseQuantity(cartItemData.tireId);
                  }}>
                  <RemoveCircleOutlineIcon
                    sx={{
                      color: BASE_COLORS.DEFAULT_BLUE,
                    }}
                  />
                </IconButton>
              </Box>
              <Typography
                variant="subtitle2"
                fontWeight={500}
                fontFamily={FONTS.MAIN_TEXT_FAMILY}
                color={FILTER_COLORS.TEXT_MAIN}>
                {t('article')}: {cartItemData.article}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ListItem>
  );
};
