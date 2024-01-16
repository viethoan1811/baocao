import axios from "axios";
import { API } from "../utils/apiURL";

import jwt_decode from "jwt-decode";

export const CreateOrder = async (data) => {
  const res = await axios.post(`${API}/api/v1/order`, data);
  return res.data;
};

export const getDetailOrder = async(id)=>{
  const res = await axios.get(`${API}/api/v1/order/getDetailOrder/user/${id}`)
  return res.data;
}