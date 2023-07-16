import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const recommendListApi = async (accountname, token) => {
  const res = await axios.get(`${BASE_URL}/product/${accountname}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  return res;
};

export const recommendUploadApi = async (
  restaurantname,
  rating,
  address,
  image,
  token,
) => {
  await axios.post(
    `${BASE_URL}/product`,
    {
      product: {
        itemName: restaurantname,
        price: rating,
        link: address,
        itemImage: image,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    },
  );
};

export const getRecommendInfoApi = async (productId, token) => {
  const res = await axios.get(`${BASE_URL}/product/detail/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  return res;
};

export const recommendEditApi = async (productId, token, productInfo) => {
  const res = await axios.put(
    `${BASE_URL}/product/${productId}`,
    {
      product: {
        itemName: productInfo.itemName,
        price: productInfo.price,
        link: productInfo.link,
        itemImage: productInfo.itemImage,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    },
  );
  return res;
};

export const recommendDeleteApi = async (productId, token) => {
  await axios.delete(`${BASE_URL}/product/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
};
