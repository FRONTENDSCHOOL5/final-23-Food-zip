import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../../components/common/Header/Header";
import ProfileForm from "../../../components/Profile/ProfileForm/ProfileForm";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
  gap: 12px;
  background: #fff;
  height: 100vh;
`;
export default function ProfileEdit() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    image: "",
    username: "",
    accountname: "",
    intro: "",
  });

  useEffect(() => {
    prevUserInfo();
  }, []);

  const prevUserInfo = async () => {
    try {
      const res = await axios.get(
        "https://api.mandarin.weniv.co.kr/user/myinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const { image, username, accountname, intro } = res.data.user;
      setUserInfo({ image, username, accountname, intro });
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  console.log(userInfo);

  const imgUpload = async file => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post(
        "https://api.mandarin.weniv.co.kr/image/uploadfile",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        },
      );
      console.log(res.data);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const editProfile = async userInfo => {
    try {
      const userData = {
        user: {
          ...userInfo,
        },
      };
      const res = await axios.put(
        "https://api.mandarin.weniv.co.kr/user",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        },
      );
      console.log(res.data);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveBtn = async () => {
    await imgUpload(userInfo.image).then(res => {
      const image = res.data.filename
        ? `https://api.mandarin.weniv.co.kr/${res.data.filename}`
        : userInfo.image;
      editProfile({ ...userInfo, image });
      console.log(image);
    });
    navigate("/myprofile");
  };

  return (
    <Container>
      <Header type="save" handleSaveBtn={handleSaveBtn} />
      <ProfileForm userInfo={userInfo} setUserInfo={setUserInfo} />
    </Container>
  );
}
