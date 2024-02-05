import axios from 'axios';
import { SERVER_URL } from '../../constants';

export async function fetchFilterData() {
  const filterData = await axios.get(`${SERVER_URL}/filterData`);
  return filterData.data?.tireSizes;
}
