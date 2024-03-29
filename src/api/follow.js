import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const followApi = async (accountname, token) => {
  await axios.post(
    `${BASE_URL}/profile/${accountname}/follow`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
};

export const unfollowApi = async (accountname, token) => {
  await axios.delete(`${BASE_URL}/profile/${accountname}/unfollow`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const followerListApi = async (accountname, token, limit, skip) => {
  const query = `?limit=${limit}&skip=${skip}`;
  const res = await axios.get(
    `${BASE_URL}/profile/${accountname}/follower/${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  return res;
};

export const followingListApi = async (accountname, token, limit, skip) => {
  const query = `?limit=${limit}&skip=${skip}`;
  const res = await axios.get(
    `${BASE_URL}/profile/${accountname}/following${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  return res;
};
