import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const imgUpload = async formData => {
  try {
    const res = await axios.post(`${BASE_URL}/image/uploadfile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};
