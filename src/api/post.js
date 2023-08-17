import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const feed = async ({ token, limit = 10, skip = 0 }) => {
  const query = `?limit=${limit}&skip=${skip}`;
  const res = await axios.get(`${BASE_URL}/post/feed/${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  return res;
};

export const postUploadApi = async (content, image, token) => {
  await axios.post(
    `${BASE_URL}/post`,
    {
      post: {
        content: content,
        image: image,
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

export const postInfoApi = async (postId, token) => {
  const res = await axios.get(`${BASE_URL}/post/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  return res;
};

export const postEditApi = async (postId, token, content, image) => {
  const res = await axios.put(
    `${BASE_URL}/post/${postId}`,
    {
      post: {
        content: content,
        image: image,
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

export const postDeleteApi = async (postId, token) => {
  await axios.delete(`${BASE_URL}/post/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
};

export const postReportApi = async (postId, token) => {
  await axios.post(
    `${BASE_URL}/post/${postId}/report`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    },
  );
};

export const postLikeApi = async (postId, token) => {
  await axios.post(
    `${BASE_URL}/post/${postId}/heart`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    },
  );
};

export const postUnlikeApi = async (postId, token) => {
  await axios.delete(`${BASE_URL}/post/${postId}/unheart`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
};

export const userPostListApi = async (accountname, token, limit, skip) => {
  const query = `?limit=${limit}&skip=${skip}`;
  const res = await axios.get(
    `${BASE_URL}/post/${accountname}/userpost/${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    },
  );
  return res;
};
