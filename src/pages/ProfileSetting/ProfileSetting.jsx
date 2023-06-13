import React from "react";
import styled from "styled-components";
import { ButtonStyle } from "../../components/common/Button/Button";
import ProfileForm from "../../components/Profile/ProfileForm/ProfileForm";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  gap: 12px;
  background: #fff;
  height: 100vh;
`;
const Title = styled.h1`
  font-size: 24px;
`;
const SubText = styled.p`
  font-size: 14px;
  color: #767676;
`;
const StartButton = styled(ButtonStyle)`
  margin-top: 18px;
`;
export default function ProfileSetting() {
  return (
    <Container>
      <Title>프로필 설정</Title>
      <SubText>나중에 언제든지 변경할 수 있습니다.</SubText>
      <ProfileForm />
      <StartButton type="submit" bgColor="inactive">
        FOOD ZIP 시작하기
      </StartButton>
    </Container>
  );
}
