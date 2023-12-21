import axios, { AxiosResponse } from 'axios';
import { API_KEY, NOVA_POSHTA_API } from '../../constants';

export async function fetchCityByInput(inputValue: string) {
  let response: AxiosResponse<any, any>;
  response = await axios.post(`${NOVA_POSHTA_API}/`, {
    apiKey: `${API_KEY}`,
    modelName: 'Address',
    calledMethod: 'searchSettlements',
    methodProperties: {
      CityName: inputValue,
      Limit: '50',
      Page: '1',
    },
  });
  return response.data;
}

export async function fetchWarehouseByInput(inputValue: string) {
  let response: AxiosResponse<any, any>;
  response = await axios.post(`${NOVA_POSHTA_API}/`, {
    apiKey: `${API_KEY}`,
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: {
      CityName: inputValue,
    },
  });
  return response.data;
}
