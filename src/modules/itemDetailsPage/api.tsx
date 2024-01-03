import axios, { AxiosResponse } from 'axios';
import { SERVER_URL } from '../../constants';
import { OrderItemProps } from './types';

export async function fetchItemBuy(itemData: OrderItemProps[]) {
  const response: AxiosResponse<any, any> = await axios.post(
    `${SERVER_URL}/order`,
    itemData,
  );
  return response.data;
}
