import React from "react";
import styled from "styled-components";
import Header from "../../../components/common/Header/Header";
import ProfileForm from "../../../components/Profile/ProfileForm/ProfileForm";

export default function ProfileEdit() {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 48px;
    gap: 12px;
    background: #fff;
    height: 100vh;
  `;
  return (
    <Container>
      <Header type="save" />
      <ProfileForm />
    </Container>
  );
}
