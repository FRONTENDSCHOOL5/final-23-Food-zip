import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const userInfoApi = async token => {
  const res = await axios.get(`${BASE_URL}/user/myinfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
