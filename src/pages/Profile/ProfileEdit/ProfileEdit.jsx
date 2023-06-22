import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      navigate("/error");
      return false;
    }
  };

  return (
    <Container>
      <Header type="save" />
      <ProfileForm userInfo={userInfo} setUserInfo={setUserInfo} />
    </Container>
  );
}
