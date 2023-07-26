import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/common/Header/Header";
import ProfileForm from "../../../components/Profile/ProfileForm/ProfileForm";
import styled from "styled-components";
import { userInfoApi } from "../../../api/user";

const Container = styled.main`
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
      const res = await userInfoApi(token);
      const { image, username, accountname, intro } = res.data.user;
      setUserInfo({ image, username, accountname, intro });
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  return (
    <Container>
      <Header type="default" />
      <ProfileForm userInfo={userInfo} setUserInfo={setUserInfo} />
    </Container>
  );
}
