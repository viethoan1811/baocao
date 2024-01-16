import axios from "axios";
import { API } from "../utils/apiURL";

import jwt_decode from "jwt-decode";

export const loginUser = async (data) => {
  const res = await axios.post(`${API}/api/v1/user/login`, data);
  return res.data;
};

export const getDetailsUser = async (id, access_token) => {
  const res = await axios.get(`${API}/api/v1/user/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
export const logoutUser = async () => {
  const res = await axios.post(`${API}/api/v1/user/logout`);
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(`${API}/api/v1/user/register`, data);
  return res.data;
};

export const updateUser = async (data) => {
  const headers = {
    Authorization: `Bearer ${data.access_token}`,
  };
  const userId = data.id;
  delete data.id;
  const res = await axios.post(
    `${API}/api/v1/user/updateProfile/${userId}`,
    data,
    {
      headers,
    }
  );

  return res.data;
};

export const updateAddress = async (data) => {
  const headers = {
    Authorization: `Bearer ${data.access_token}`,
  };
  const userId = data.id;
  delete data.id;
  const res = await axios.post(
    `${API}/api/v1/user/updateAdress/user/${userId}`,
    data,
    {
      headers,
    }
  );

  return res.data;
};
