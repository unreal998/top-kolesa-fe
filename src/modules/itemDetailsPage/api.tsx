import axios, { AxiosResponse } from 'axios';
import { SERVER_URL } from '../../constants';
import { OrderItemProps } from './types';

export async function fetchItemBuy(itemData: OrderItemProps) {
  let response: AxiosResponse<any, any>;
  response = await axios.post(`${SERVER_URL}/order`, itemData);
  return response.data;
}
