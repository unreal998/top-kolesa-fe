import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorageItem from '../../hooks/useLocalStorageWatcher';
import { actions } from './reducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFetchedCityName,
  selectCityListData,
  selectWarehoutListData,
} from './selectors';

import { Box, Stack } from '@mui/material';

import { itemBuyDataBuilder } from '../itemDetailsPage/utils/itemBuyDataBuilder';
import { CartInfo } from './components/CartInfo';
import { ContactInfo } from './components/ContactInfo';
import { DeliveryInfo } from './components/DeliveryInfo';
import { PaymentInfo } from './components/PaymentInfo';
import { Comment } from './components/Comment';
import EmptyCart from '../../shared/components/header/EmptyCart';

export function CheckoutPage() {
  const dispatch = useDispatch();
  const cityListData = useSelector(selectCityListData());
  const warehouseData = useSelector(selectWarehoutListData());
  const fetchedCityName = useSelector(selectFetchedCityName());
  const cartItems = useLocalStorageItem('cartItem');
  const history = useNavigate();
  const [deliveryState, changeDeliveryState] = useState('post');
  const [paymentState, changePaymentState] = useState('cash');
  const [checkoutItemDetails, setCheckoutItemDetails] = useState<any>([]);
  const [inputedCityName, setInputedCityName] = useState('');
  const [inputedEmail, setInputedEmail] = useState('');
  const [inputedPhone, setInputedPhone] = useState('');
  const [inputedComment, setInputedComment] = useState('');
  const [inputedFirstName, setInputedFirstName] = useState('');
  const [inputedLastName, setInputedLastName] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  useEffect(() => {
    if (cartItems.length === 0) {
      const timer = setTimeout(() => {
        history(`/shop`, { replace: true });
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [history, cartItems]);

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

  const optionsData = useMemo(() => {
    return cityListData ? cityListData.map((option) => option.title) : [];
  }, [cityListData]);

  const optionsWarehouseData = useMemo(() => {
    return warehouseData ? warehouseData.map((option) => option.title) : [];
  }, [warehouseData]);

  return (
    <>
      {cartItems.length > 0 ? (
        <Stack
          direction="row"
          justifyContent="center"
          m={'3% auto 5%'}
          gap={'3%'}
          maxWidth={'70rem'}
          height={'72.2rem'}
          sx={{
            '@media (max-width: 918px)': {
              flexDirection: 'column',
              gap: '0',
              height: 'auto',
            },
          }}>
          <Stack
            gap="1%"
            width="45%"
            sx={{
              '@media (max-width: 918px)': {
                width: '80%',
                margin: '1rem auto',
                gap: '1rem',
              },
              '@media (max-width: 500px)': {
                width: '90%',
              },
            }}>
            <ContactInfo
              setInputedFirstName={setInputedFirstName}
              setInputedLastName={setInputedLastName}
              setInputedPhone={setInputedPhone}
              setInputedEmail={setInputedEmail}
            />
            <DeliveryInfo
              changeDeliveryState={changeDeliveryState}
              deliveryState={deliveryState}
              setInputedCityName={setInputedCityName}
              setSelectedWarehouse={setSelectedWarehouse}
              optionsData={optionsData}
              handleCityTextChange={handleCityTextChange}
              handleWarehouseTextChange={handleWarehouseTextChange}
              optionsWarehouseData={optionsWarehouseData}
            />
            <PaymentInfo changePaymentState={changePaymentState} />
            <Comment setInputedComment={setInputedComment} />
          </Stack>
          <Stack
            width="45%"
            sx={{
              '@media (max-width: 918px)': {
                width: '80%',
                margin: '0 auto',
              },
              '@media (max-width: 500px)': {
                width: '90%',
              },
            }}>
            <CartInfo handleOrder={handleOrder} />
          </Stack>
        </Stack>
      ) : (
        <Box display={'flex'} alignItems={'center'} height={'70vh'}>
          <EmptyCart />
        </Box>
      )}
    </>
  );
}
