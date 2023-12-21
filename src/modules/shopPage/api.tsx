import axios, { AxiosResponse } from 'axios';
import { SERVER_URL } from '../../constants';

export async function getShopPageItems(params: any) {
  let response: AxiosResponse<any, any>;
  if (params !== '') {
    const { price, width, profile, diametr, season, brand } = params;
    response = await axios.get(
      `${SERVER_URL}/shop?price=${JSON.stringify(
        JSON.parse(price)[0],
      )}-${JSON.stringify(
        JSON.parse(price)[1],
      )}&width=${width}&profile=${profile}&diametr=${diametr}&season=${season}&brand=${brand}`,
    );
    return response.data;
  } else {
    response = await axios.get(`${SERVER_URL}/shop`);
    return response.data;
  }
}
