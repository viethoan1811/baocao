import axios from "axios";
import { API } from "../utils/apiUrl";
import { axiosJWT } from "./UserService";

export const getPay = async (access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const res = await axiosJWT.get(`${API}/api/v1/order/getAll`, {
    headers,
  });
  return res.data;
};

export const getDetilsPay = async (id, access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const res = await axiosJWT.get(`${API}/api/v1/order/getById/${id}`, {
    headers,
  });
  return res.data;
};

export const updatePay = async (id, data,access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const res = await axios.put(`${API}/api/v1/order/update/${id}`, data, {
    headers,
  });
  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await axios.delete(`${API}/api/v1/order/${id}`);
  return res.data;
};
export const deleteOrderByCode = async (code,id) => {
  const res = await axios.put(`${API}/api/v1/order/deleteByCode/${code}`,{productIdToRemove: id});
  return res.data;
};

export const getOrderDetailByCode = async (code) => {
  try {
    // const headers = {
    //   Authorization: `Bearer ${access_token}`,
    // };
    const res = await axiosJWT.get(`${API}/api/v1/order/getByCode/${code}`);
    return res.data;
  } catch (error) {
      console.log(error)
  }
}