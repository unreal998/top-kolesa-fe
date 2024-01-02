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
import {
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
import { ShopItemAPI } from '../shopPage/reducer';
import { SHOP_ITEM_TIRES_IMG_PREFIX } from '../../constants';
import { CartItem } from '../../shared/components/header/CartItem';
import { CartItemData, CartStorageData } from '../../shared/types';
import { FILTER_COLORS } from '../../shared/constants';

export function CheckoutPage() {
  const dispatch = useDispatch();
  const cityListData = useSelector(selectCityListData());
  const warehouseData = useSelector(selectWarehoutListData());
  const fetchedCityName = useSelector(selectFetchedCityName());
  const selectedItemData = useSelector(selectSelectedItemData());
  const shopItemsList = useSelector(selectShopItemsList());
  const [deliveryState, changeDeliveryState] = useState('self');
  const [numberOfTires, setNumberOfTires] = useState<number>(0);
  const [paymentState, changePaymentState] = useState('cash');
  const [cartItems, setCartItems] = useState([]);
  const [cartItemDetails, setCartItemDetails] = useState<CartItemData[]>([]);
  const [selectedCityName, setSelectedCityName] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const { t } = useTranslation();

  const handleCityTextChange = useCallback(
    (e: SyntheticEvent) => {
      const inputTarget = e.target as HTMLInputElement;
      if (inputTarget.value.length > 1) {
        dispatch(actions.fetchCityListByInput(inputTarget.value));
      }
      setSelectedCityName(inputTarget.value);
    },
    [dispatch],
  );

  const handleOrder = useCallback(() => {
    if (selectedItemData) {
      dispatch(
        actions.fetchBuyItemAction(itemBuyDataBuilder(selectedItemData)),
      );
    }
  }, [dispatch, selectedItemData]);

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

    const cartItemDetails: CartItemData[] = cartItems.map(
      (cartItem: CartStorageData) => {
        const item = shopItemsList.find(
          (item: ShopItemAPI) => item.id === cartItem.tireId,
        );
        return {
          ...cartItem,
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
    setCartItemDetails(cartItemDetails);
    let totalAmountSumm = 0;
    cartItemDetails.forEach((element) => {
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
            <TextField label={t('name')} required={true} />
            <TextField label={t('secondName')} required={true} />
            <TextField label={t('number')} required={true} />
            <TextField label={t('email')} />
          </Stack>
        </Stack>
        <Stack>
          <Typography variant="h6"> {t('delivery')} </Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="self"
              name="radio-buttons-group"
              onChange={(e, value) => changeDeliveryState(value)}>
              <FormControlLabel
                value="self"
                control={<Radio />}
                label={t('pickup')}
              />
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
          <TextField multiline label="" rows={4} />
        </Stack>
      </Stack>
      <Stack width="40%">
        <Stack>
          <Typography variant="h6" padding="0 15px">
            Your order
          </Typography>
          {cartItemDetails?.map((cartItem: CartItemData, index: any) => (
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
