import { t } from 'i18next';

import {
  Box,
  ClickAwayListener,
  IconButton,
  Link,
  ListItem,
  SxProps,
  Theme,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import {
  BASE_COLORS,
  FILTER_COLORS,
  FONTS,
  TOOLTIP_TIMEOUT,
} from '../../constants';
import { CartItemData } from '../../types';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedItemData } from '../../../modules/shopPage/selectors';

const StyledCartItem = styled(Box)({
  borderBottom: `1px solid ${BASE_COLORS.DEFAULT_BLUE}`,
  cursor: 'default',
  margin: '0 10px',
  paddingTop: '10px',
  position: 'relative',
  width: '100%',
});

const StyledIconButton = styled(IconButton)({
  padding: 0,
  position: 'absolute',
  top: 10,
  right: 10,
  '&:hover': {
    '& .MuiSvgIcon-root': {
      color: FILTER_COLORS.BUTTON_RESET_FILTER,
    },
  },
});

type CartItemProps = {
  index: number;
  cartItemData: CartItemData;
  updateCartItems: (data: CartItemData[]) => void;
  cartItems: CartItemData[];
  containerStyles?: SxProps<Theme>;
};

export const CartItem: React.FC<CartItemProps> = ({
  index,
  cartItemData,
  cartItems,
  containerStyles,
  updateCartItems,
}) => {
  const selectedItemData = useSelector(selectSelectedItemData());
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const handleIncreaseQuantity = useCallback(
    (tireId: number) => {
      if (cartItemData.numberOfTires === selectedItemData?.in_stock) {
        setTooltipOpen(true);
        setTimeout(() => {
          setTooltipOpen(false);
        }, TOOLTIP_TIMEOUT);
        return;
      } else {
        const updatedCartItems = cartItems.map((item: CartItemData) =>
          item.tireId === tireId
            ? { ...item, numberOfTires: item.numberOfTires + 1 }
            : item,
        );
        localStorage.setItem('cartItem', JSON.stringify(updatedCartItems));
        updateCartItems(updatedCartItems);
      }
    },
    [cartItems],
  );

  const handleDecreaseQuantity = useCallback(
    (tireId: number) => {
      const updatedCartItems = cartItems.map((item: CartItemData) =>
        item.tireId === tireId
          ? {
              ...item,
              numberOfTires: Math.max(1, item.numberOfTires - 1),
            }
          : item,
      );
      localStorage.setItem('cartItem', JSON.stringify(updatedCartItems));
      updateCartItems(updatedCartItems);
    },
    [cartItems],
  );

  const handleDeleteItem = useCallback(
    (tireId: number) => {
      const updatedCartItems = cartItems.filter(
        (item: CartItemData) => item.tireId !== tireId,
      );

      if (updatedCartItems.length === 0) {
        localStorage.removeItem('cartItem');
      } else {
        localStorage.setItem('cartItem', JSON.stringify(updatedCartItems));
      }
      updateCartItems(updatedCartItems);
    },
    [cartItems],
  );

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  return (
    <ListItem key={index} disablePadding>
      <StyledCartItem
        sx={{
          ...containerStyles,
        }}>
        <StyledIconButton onClick={() => handleDeleteItem(cartItemData.tireId)}>
          <DeleteIcon
            sx={{
              height: '20px',
              width: '20px',
              padding: 0,
              transition: 'all 0.1s ',
            }}
          />
        </StyledIconButton>
        <Box display={'flex'} flexDirection={'column'} mb={1}>
          <Link
            href={`/item?id=${cartItemData.article?.toString()}`}
            color={'inherit'}
            sx={{ textDecoration: 'none', display: 'inline' }}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              fontFamily={FONTS.BOLD_TEXT_FAMILY}
              fontSize={'1.2rem'}
              mb={1}
              p={'0 10% 0 2.5%'}>
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
              justifyContent={'center'}
              flexDirection={'column'}
              width={'100%'}>
              <Typography
                variant="h6"
                fontWeight={600}
                fontFamily={FONTS.BOLD_TEXT_FAMILY}
                color={BASE_COLORS.DEFAULT_BLUE}>
                {`${cartItemData.price * cartItemData.numberOfTires} ${t(
                  'uah',
                )}`}
              </Typography>
              <ClickAwayListener onClickAway={handleTooltipClose}>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={handleTooltipClose}
                  open={tooltipOpen}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={t('maxCountTires')}>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    width={'7rem'}>
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
                </Tooltip>
              </ClickAwayListener>
            </Box>
          </Box>
        </Box>
      </StyledCartItem>
    </ListItem>
  );
};
