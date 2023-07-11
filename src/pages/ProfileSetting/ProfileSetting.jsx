import React from "react";
import ProfileForm from "../../components/Profile/ProfileForm/ProfileForm";
import { Container, Title, SubText } from "./ProfileSettingStyle";

export default function ProfileSetting() {
  return (
    <Container>
      <Title>프로필 설정</Title>
      <SubText>나중에 언제든지 변경할 수 있습니다.</SubText>
      <ProfileForm />
    </Container>
  );
}
