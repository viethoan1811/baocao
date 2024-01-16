import axios from "axios";
import { API } from "../utils/apiURL";

import jwt_decode from "jwt-decode";



export const getHistoryOrder = async (id, access_token) => {
  const res = await axios.get(`${API}/api/v1/order/getByUser/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getDetailOrder = async(id)=>{
  const res = await axios.get(`${API}/api/v1/order/getDetailOrder/user/${id}`)
  return res.data;
}