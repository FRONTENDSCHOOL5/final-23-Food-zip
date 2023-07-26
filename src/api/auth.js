import axios from "axios";
import { BASE_URL } from "./baseUrl";
const defaultImg = "https://api.mandarin.weniv.co.kr/1687267818879.png";
export const signup = async (formData, data, profileImg) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/user`,
      {
        user: {
          username: formData.username,
          email: data.email,
          password: data.password,
          accountname: formData.accountname,
          intro: formData.intro,
          image: profileImg || defaultImg,
        },
      },
      {
        headers: {
          "Content-type": "application/json",
        },
      },
    );
    return res;
  } catch (err) {
    alert(err.response.data.message);
    console.log(err.response.data.message);
  }
};
export const login = async formData => {
  try {
    const res = await axios.post(
      `${BASE_URL}/user/login`,
      {
        user: {
          email: formData.email,
          password: formData.password,
        },
      },
      {
        headers: {
          "Content-type": "application/json",
        },
      },
    );
    return res;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message ||
      "이메일 또는 비밀번호가 일치하지 않습니다.";
    alert(errorMessage);
  }
};

export const EmailValid = async email => {
  const res = await axios.post(
    `${BASE_URL}/user/emailvalid`,
    {
      user: {
        email: email,
      },
    },
    {
      headers: {
        "Content-type": "application/json",
      },
    },
  );
  return res;
};

export const accountValid = async accountname => {
  const res = await axios.post(
    `${BASE_URL}/user/accountnamevalid`,
    {
      user: { accountname: accountname },
    },
    {
      headers: {
        "Content-type": "application/json",
      },
    },
  );
  return res;
};
