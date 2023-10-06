import axios from "axios";
import { SERVER_URL } from "../../constants";

export async function getShopPageItems(pageNumber: number) {
    const response = await axios.get(`${SERVER_URL}/shop?page=${pageNumber}`)
    return response.data
}