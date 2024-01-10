import axios, { AxiosResponse } from 'axios';
import { SERVER_URL } from '../../constants';

export async function fetchOrderData(orderId: string) {
  let response: AxiosResponse<any, any>;
  response = await axios.get(`${SERVER_URL}/orderData?id=${orderId}`);
  return response.data;
}
