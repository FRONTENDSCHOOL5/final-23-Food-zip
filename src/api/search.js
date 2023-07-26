import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const userSearch = async (keyword, token) => {
  const res = await axios.get(
    `${BASE_URL}/user/searchuser/?keyword=${keyword}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  return res;
};
