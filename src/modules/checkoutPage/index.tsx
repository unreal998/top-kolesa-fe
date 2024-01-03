import { Stack } from '@mui/material';
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
import { selectShopItemsList } from '../shopPage/selectors';
import { itemBuyDataBuilder } from '../itemDetailsPage/utils/itemBuyDataBuilder';
import { SHOP_ITEM_TIRES_IMG_PREFIX } from '../../constants';
import { CartStorageData } from '../../shared/types';
import { ShopItemAPI } from '../../shared/types';
import { CartInfo } from './components/CartInfo';
import { ContactInfo } from './components/ContactInfo';
import { DeliveryInfo } from './components/DeliveryInfo';
import { PaymentInfo } from './components/PaymentInfo';
import { Comment } from './components/Comment';

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
  const [checkoutItemDetails, setСheckoutItemDetails] = useState<any>([]);
  const [inputedCityName, setInputedCityName] = useState('');
  const [inputedEmail, setInputedEmail] = useState('');
  const [inputedPhone, setInputedPhone] = useState('');
  const [inputedComment, setInputedComment] = useState('');
  const [inputedFirstName, setInputedFirstName] = useState('');
  const [inputedLastName, setInputedLastName] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

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
          itemBuyDataBuilder(checkoutItemDetails[0], {
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

    const checkoutItemDetails: any = cartItems.map(
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
    checkoutItemDetails.forEach((element: any) => {
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
            margin: '1rem auto',
            gap: '1rem',
          },
          '@media (max-width: 500px)': {
            width: '90%',
          },
        }}>
        <CartInfo
          checkoutItemDetails={checkoutItemDetails}
          setNumberOfTires={setNumberOfTires}
          cartItems={cartItems}
          totalAmount={totalAmount}
          handleOrder={handleOrder}
        />
      </Stack>
    </Stack>
  );
}
