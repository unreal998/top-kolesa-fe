import { Box, Stack } from '@mui/material';
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
  selectCreatedOrderId,
} from './selectors';
import { selectShopItemsList } from '../shopPage/selectors';
import { itemBuyDataBuilder } from '../itemDetailsPage/utils/itemBuyDataBuilder';
import { SHOP_ITEM_TIRES_IMG_PREFIX } from '../../constants';
import {
  CartItemData,
  CartStorageData,
  CheckoutItemData,
} from '../../shared/types';
import { ShopItemAPI } from '../../shared/types';
import { CartInfo } from './components/CartInfo';
import { ContactInfo } from './components/ContactInfo';
import { DeliveryInfo } from './components/DeliveryInfo';
import { PaymentInfo } from './components/PaymentInfo';
import { Comment } from './components/Comment';
import EmptyCart from '../../shared/components/header/EmptyCart';
import { useNavigate } from 'react-router-dom';

export function CheckoutPage() {
  const dispatch = useDispatch();
  const cityListData = useSelector(selectCityListData());
  const warehouseData = useSelector(selectWarehoutListData());
  const fetchedCityName = useSelector(selectFetchedCityName());
  const shopItemsList = useSelector(selectShopItemsList());
  const [deliveryState, changeDeliveryState] = useState('post');
  const [paymentState, changePaymentState] = useState('cash');
  const [checkoutItemsDetails, setCheckoutItemsDetails] = useState<
    CheckoutItemData[]
  >([]);
  const [cartItems, updateCartItems] = useState<CartStorageData[]>([]);
  const [cartItemDetails, setCartItemDetails] = useState<CartItemData[]>([]);
  const [inputedCityName, setInputedCityName] = useState('');
  const [inputedEmail, setInputedEmail] = useState('');
  const [inputedPhone, setInputedPhone] = useState('');
  const [inputedComment, setInputedComment] = useState('');
  const [inputedFirstName, setInputedFirstName] = useState('');
  const [inputedLastName, setInputedLastName] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [pickup, setPickup] = useState<boolean>(true);
  const createdOrderId = useSelector(selectCreatedOrderId());
  const history = useNavigate();

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

  const isRequiredFieldsPassed = useCallback(() => {
    if (deliveryState === 'post') {
      return (
        !!inputedPhone &&
        !!inputedFirstName &&
        !!inputedCityName &&
        !!selectedWarehouse
      );
    } else {
      return !!inputedPhone && !!inputedFirstName;
    }
  }, [
    deliveryState,
    inputedPhone,
    inputedFirstName,
    inputedCityName,
    selectedWarehouse,
  ]);

  const handleOrder = useCallback(() => {
    if (checkoutItemsDetails) {
      dispatch(
        actions.fetchBuyItemAction(
          itemBuyDataBuilder(checkoutItemsDetails, {
            city: inputedCityName,
            address: selectedWarehouse,
            email: inputedEmail,
            comment: inputedComment,
            phone: inputedPhone,
            userName: `${inputedFirstName} ${inputedLastName}`,
            paymentType: paymentState,
          }),
        ),
      );
    }
  }, [
    dispatch,
    checkoutItemsDetails,
    inputedCityName,
    selectedWarehouse,
    inputedEmail,
    inputedComment,
    inputedPhone,
    inputedFirstName,
    inputedLastName,
    paymentState,
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
    if (createdOrderId !== '') {
      localStorage.removeItem('cartItem');
      history(`/order?id=${createdOrderId}`);
    }
  }, [createdOrderId]);

  useEffect(() => {
    const localStorageCartItems = JSON.parse(
      localStorage.getItem('cartItem') || '[]',
    );

    const cartItemDetails: CartItemData[] = localStorageCartItems.map(
      (cartItem: CartStorageData) => {
        const item = shopItemsList.find(
          (item: ShopItemAPI) => item.id === cartItem.tireId,
        );
        if (item) {
          return {
            ...cartItem,
            name: item.name,
            fullName: `${item.brand} ${item.name} ${item.width}/${item.height} R${item.diametr}`,
            price: item.price_uah,
            article: item.id,
            image: item
              ? `${SHOP_ITEM_TIRES_IMG_PREFIX}${item.image_file}`
              : './imgs/noPhotoImg.jpg',
          };
        } else {
          return {
            ...cartItem,
            fullName: `unknown/unknown Runknown`,
            name: '',
            price: NaN,
            article: NaN,
            image: './imgs/noPhotoImg.jpg',
          };
        }
      },
    );
    const checkoutItemsDetails: CheckoutItemData[] = localStorageCartItems.map(
      (cartItem: CartStorageData) => {
        const item = shopItemsList.find(
          (item: ShopItemAPI) => item.id === cartItem.tireId,
        );
        if (item) {
          return {
            ...cartItem,
            ...item,
            name: item.name,
            fullName: `${item.brand} ${item.name} ${item.width}/${item.height} R${item.diametr}`,
            price: item.price_uah,
            article: item.id,
            image: item
              ? `${SHOP_ITEM_TIRES_IMG_PREFIX}${item.image_file}`
              : './imgs/noPhotoImg.jpg',
          };
        } else {
          return {
            ...cartItem,
            fullName: `unknown/unknown Runknown`,
            name: '',
            price: NaN,
            article: NaN,
            image: './imgs/noPhotoImg.jpg',
          };
        }
      },
    );
    setCheckoutItemsDetails(checkoutItemsDetails);
    setCartItemDetails(cartItemDetails);
    let totalAmountSumm = 0;
    cartItemDetails.forEach((cartItem: CartStorageData) => {
      const item = shopItemsList.find((item) => item.id === cartItem.tireId);
      totalAmountSumm += item ? item.price_uah * cartItem.numberOfTires : 0;
    });
    setTotalAmount(totalAmountSumm);
  }, [shopItemsList, cartItems]);

  const optionsData = useMemo(() => {
    return cityListData ? cityListData.map((option) => option.title) : [];
  }, [cityListData]);

  const optionsWarehouseData = useMemo(() => {
    return warehouseData ? warehouseData.map((option) => option.title) : [];
  }, [warehouseData]);

  const handlePickup = () => {
    setPickup(true);
  };

  const handleDelivery = () => {
    setPickup(false);
  };

  return (
    <>
      {checkoutItemsDetails.length > 0 ? (
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
              handlePickup={handlePickup}
              handleDelivery={handleDelivery}
            />
            <PaymentInfo
              changePaymentState={changePaymentState}
              pickup={pickup}
            />
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
            <CartInfo
              isBuyButtonDisabled={!isRequiredFieldsPassed()}
              updateCartItems={updateCartItems}
              cartItems={cartItemDetails}
              totalAmount={totalAmount}
              handleOrder={handleOrder}
            />
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
