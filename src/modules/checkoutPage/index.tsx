import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import {
  selectFetchedCityName,
  selectCityListData,
  selectWarehoutListData,
} from './selectors';
import {
  selectSelectedItemData,
  selectShopItemsList,
} from '../shopPage/selectors';
import { itemBuyDataBuilder } from '../itemDetailsPage/utils/itemBuyDataBuilder';
import { useTranslation } from 'react-i18next';
import { SHOP_ITEM_TIRES_IMG_PREFIX } from '../../constants';
import { CartItem } from '../../shared/components/CartItem';
import {
  CartItemData,
  CartStorageData,
  CheckoutItemData,
  ShopItemAPI,
} from '../../shared/types';
import { FILTER_COLORS } from '../../shared/constants';

export function CheckoutPage() {
  const dispatch = useDispatch();
  const cityListData = useSelector(selectCityListData());
  const warehouseData = useSelector(selectWarehoutListData());
  const fetchedCityName = useSelector(selectFetchedCityName());
  const shopItemsList = useSelector(selectShopItemsList());
  const [deliveryState, changeDeliveryState] = useState('post');
  const [numberOfTires, setNumberOfTires] = useState<number>(0);
  const [paymentState, changePaymentState] = useState('cash');
  const [cartItems, setCartItems] = useState([]);
  const [checkoutItemDetails, setСheckoutItemDetails] = useState<
    CheckoutItemData[]
  >([]);
  const [inputedCityName, setInputedCityName] = useState('');
  const [inputedEmail, setInputedEmail] = useState('');
  const [inputedPhone, setInputedPhone] = useState('');
  const [inputedComment, setInputedComment] = useState('');
  const [inputedFirstName, setInputedFirstName] = useState('');
  const [inputedLastName, setInputedLastName] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const { t } = useTranslation();

  const handleCityTextChange = useCallback(
    (e: SyntheticEvent) => {
      const inputTarget = e.target as HTMLInputElement;
      if (inputTarget.value.length > 1) {
        dispatch(actions.fetchCityListByInput(inputTarget.value));
      }
      setInputedCityName(inputTarget.value);
    },
    [dispatch],
  );

  const handleOrder = useCallback(() => {
    if (checkoutItemDetails) {
      dispatch(
        actions.fetchBuyItemAction(
          itemBuyDataBuilder(checkoutItemDetails, {
            city: inputedCityName,
            address: selectedWarehouse,
            email: inputedEmail,
            comment: inputedComment,
            phone: inputedPhone,
            userName: `${inputedFirstName} ${inputedLastName}`,
          }),
        ),
      );
    }
  }, [
    dispatch,
    checkoutItemDetails,
    inputedCityName,
    selectedWarehouse,
    inputedEmail,
    inputedComment,
    inputedPhone,
    inputedFirstName,
    inputedLastName,
  ]);

  const handleWarehouseTextChange = useCallback(
    (e: SyntheticEvent) => {
      const inputTarget = e.target as HTMLInputElement;
      dispatch(actions.fetchWarehouseListByInput(fetchedCityName));
      setSelectedWarehouse(inputTarget.value);
    },
    [fetchedCityName, dispatch],
  );

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItem') || '[]');

    const checkoutItemDetails: CheckoutItemData[] = cartItems.map(
      (cartItem: CartStorageData) => {
        const item = shopItemsList.find(
          (item: ShopItemAPI) => item.id === cartItem.tireId,
        );
        return {
          ...cartItem,
          ...item,
          fullName: `${item?.brand} ${item?.name} ${item?.width}/${item?.height} R${item?.diametr}`,
          price: item?.price_uah,
          article: item?.id,
          image: item
            ? `${SHOP_ITEM_TIRES_IMG_PREFIX}${item.image_file}`
            : './imgs/noPhotoImg.jpg',
        };
      },
    );
    setCartItems(cartItems);
    setСheckoutItemDetails(checkoutItemDetails);
    let totalAmountSumm = 0;
    checkoutItemDetails.forEach((element) => {
      totalAmountSumm += element?.price;
    });
    setTotalAmount(totalAmountSumm);
  }, [shopItemsList]);

  const optionsData = useMemo(() => {
    return cityListData ? cityListData.map((option) => option.title) : [];
  }, [cityListData]);

  const optionsWarehouseData = useMemo(() => {
    return warehouseData ? warehouseData.map((option) => option.title) : [];
  }, [warehouseData]);

  return (
    <Stack direction="row" justifyContent="center" gap="5%" padding="2% 10%">
      <Stack gap="10px" width="40%">
        <Stack gap="5px">
          <Typography variant="h6"> {t('contactDestails')} </Typography>
          <Stack gap="10px">
            <TextField
              label={t('name')}
              required={true}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputedFirstName(e.target.value)
              }
            />
            <TextField
              label={t('secondName')}
              required={true}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputedLastName(e.target.value)
              }
            />
            <TextField
              label={t('number')}
              required={true}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputedPhone(e.target.value)
              }
            />
            <TextField
              label={t('email')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputedEmail(e.target.value)
              }
            />
          </Stack>
        </Stack>
        <Stack>
          <Typography variant="h6"> {t('delivery')} </Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="post"
              name="radio-buttons-group"
              onChange={(e, value) => changeDeliveryState(value)}>
              <FormControlLabel
                value="self"
                control={<Radio />}
                label={t('pickup')}
              />
              {deliveryState === 'self' && (
                <FormControl sx={{ ml: '20px' }}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={t('headerAddress')}
                    name="radio-buttons-group"
                    onChange={(e, value) => {
                      setInputedCityName('м. Вінниця');
                      setSelectedWarehouse(value);
                    }}>
                    <FormControlLabel
                      value={t('headerAddress')}
                      control={<Radio />}
                      label={t('headerAddress')}
                    />
                    <FormControlLabel
                      value={t('headerAddress2')}
                      control={<Radio />}
                      label={t('headerAddress2')}
                    />
                  </RadioGroup>
                </FormControl>
              )}
              <FormControlLabel
                value="post"
                control={<Radio />}
                label={t('novaPoshta')}
              />
            </RadioGroup>
          </FormControl>
          {deliveryState === 'post' && (
            <Stack gap="10px">
              <Autocomplete
                freeSolo
                disableClearable
                disablePortal
                options={optionsData}
                onSelect={(e) => handleCityTextChange(e)}
                renderInput={(params: any) => (
                  <TextField {...params} label={t('city')} />
                )}
              />
              <Autocomplete
                freeSolo
                disableClearable
                disablePortal
                onSelect={(e) => handleWarehouseTextChange(e)}
                options={optionsWarehouseData}
                renderInput={(params: any) => (
                  <TextField {...params} label={t('warehouse')} />
                )}
              />
            </Stack>
          )}
        </Stack>
        <Stack>
          <Typography variant="h6"> {t('pay')} </Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="cash"
              name="radio-buttons-group"
              onChange={(e, value) => changePaymentState(value)}>
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label={t('cash')}
              />
              <FormControlLabel
                value="card"
                control={<Radio />}
                label={t('transfer')}
              />
            </RadioGroup>
          </FormControl>
        </Stack>
        <Stack gap="15px">
          <Typography variant="h6">{t('addComment')}</Typography>
          <TextField
            multiline
            label=""
            rows={4}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputedComment(e.target.value)
            }
          />
        </Stack>
      </Stack>
      <Stack width="40%">
        <Stack>
          <Typography variant="h6" padding="0 15px">
            Your order
          </Typography>
          {checkoutItemDetails?.map((cartItem: CartItemData, index: any) => (
            <CartItem
              index={index}
              cartItemData={cartItem}
              setNumberOfTires={setNumberOfTires}
              cartItems={cartItems}
              containerStyles={{
                border: 'none',
                margin: 0,
              }}
            />
          ))}
          <Stack margin="0 0 0 15px" bgcolor={FILTER_COLORS.BORDER}>
            <Typography variant="body1">
              Total amount: {totalAmount} uah
            </Typography>
            <Button
              sx={{ width: '100%' }}
              variant="contained"
              onClick={handleOrder}>
              {' '}
              {t('buy')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
