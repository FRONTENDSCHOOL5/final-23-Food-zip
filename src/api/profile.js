import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const userProfileApi = async (accountname, token) => {
  try {
    const res = await axios.get(`${BASE_URL}/profile/${accountname}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const profileEdit = async (formData, image, token) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/user`,
      {
        user: {
          username: formData.username,
          accountname: formData.accountname,
          intro: formData.intro,
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
  } catch (err) {
    console.error("프로필 수정 오류 발생 : ", err);
  }
};
