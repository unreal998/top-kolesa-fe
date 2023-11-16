import axios, { AxiosResponse } from "axios";
import { SERVER_URL } from "../../constants";

export async function fetchItemBuy() {
  let response: AxiosResponse<any, any>;
  response = await axios.post(`${SERVER_URL}/order`, {})
  return response.data;
}
