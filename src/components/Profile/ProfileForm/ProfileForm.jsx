import React from "react";
import BasicProfileInput from "../../../assets/images/basic-profile-lg.svg";
import ImgButton from "../../../assets/images/upload-file.svg";
import styled from "styled-components";

const ProfileFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  padding: 30px 34px;
  position: relative;
  background: #fff;
  height: 100vh;
`;
const ProfileInputImg = styled.img`
  margin-bottom: 30px;
`;
const ProfileInputImgButton = styled.img`
  position: absolute;
  width: 36px;
  height: 36px;
  transform: translate(40px, 70px);
`;
const ProfileInputForm = styled.form`
  width: 322px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const ProfileFormLabel = styled.label`
  color: #767676;
`;
const ProfileFormInput = styled.input`
  width: 100%;
  display: block;
  margin-top: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #dbdbdb;
  font-size: 14px;
  &::placeholder {
    color: #dbdbdb;
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid #286140;
  }
`;
export default function ProfileForm() {
  return (
    <ProfileFormBlock>
      <ProfileInputImg src={BasicProfileInput} alt="기본 프로필" />
      <ProfileInputImgButton src={ImgButton} />
      <ProfileInputForm>
        <ProfileFormLabel>
          사용자 이름
          <ProfileFormInput
            type="text"
            placeholder="2~10자 이내여야 합니다."
            required
          />
        </ProfileFormLabel>
        <ProfileFormLabel>
          계정 ID
          <ProfileFormInput
            type="text"
            placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
          />
        </ProfileFormLabel>
        <ProfileFormLabel>
          소개
          <ProfileFormInput
            type="text"
            placeholder="자신과 선호하는 음식에 대해 소개해주세요!"
          />
        </ProfileFormLabel>
      </ProfileInputForm>
    </ProfileFormBlock>
  );
}
