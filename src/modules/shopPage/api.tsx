import axios, { AxiosResponse } from 'axios';
import { SERVER_URL } from '../../constants';
import { FilterParams } from './reducer';

export async function getShopPageItems(params: '' | FilterParams) {
  let response: AxiosResponse<any, any>;
  if (params !== '') {
    const { price, width, profile, diametr, season, brand, studded } = params;
    response = await axios.get(
      `${SERVER_URL}/shop?price=${JSON.stringify(
        JSON.parse(price as string)[0],
      )}-${JSON.stringify(
        JSON.parse(price as string)[1],
      )}&width=${width}&profile=${profile}&diametr=${diametr}&season=${season}&brand=${brand}&studded=${studded}`,
    );
    return response.data;
  } else {
    response = await axios.get(`${SERVER_URL}/shop`);
    return response.data;
  }
}
