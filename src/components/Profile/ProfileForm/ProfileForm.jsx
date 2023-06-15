import React, { useRef, useState, useCallback } from "react";
import BasicProfileInput from "../../../assets/images/basic-profile-lg.svg";
import ImgButton from "../../../assets/images/upload-file.svg";
import styled from "styled-components";
import { ButtonStyle } from "../../common/Button/Button";

const ProfileInputForm = styled.form`
  width: 322px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const ProfileImg = styled.img`
  width: 110px;
  margin: 30px 0;
  align-self: center;
`;

const ProfileInputImgButton = styled.button`
  position: absolute;
  transform: translate(180px, -70px);
`;
const ProfileInputImg = styled.img`
  width: 36px;
  height: 36px;
`;
const ProfileInput = styled.input`
  display: none;
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
const StartButton = styled(ButtonStyle)`
  margin-top: 18px;
`;

export default function ProfileForm() {
  // const [profileImg, setProfileImg] = useState({ BasicProfileInput });
  // const fileInputRef = (useRef < HTMLInputElement) | (null > null);

  // const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) {
  //     return;
  //   }
  //   console.log(e.target.files[0].name);
  // }, []);
  // const UploadBtn = useCallback(() => {
  //   if (!fileInputRef.current) {
  //     return;
  //   }
  //   fileInputRef.current.click();
  // }, []);
  return (
    <ProfileInputForm>
      <ProfileImg src={BasicProfileInput} alt="기본 프로필" />
      <ProfileInput
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        // ref={fileInputRef}
        // onChange={handleChange}
      />
      <ProfileInputImgButton type="button">
        {/* onClick={UploadBtn} */}
        <ProfileInputImg src={ImgButton} />
      </ProfileInputImgButton>
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
      <StartButton type="submit" bgColor="inactive">
        FOOD ZIP 시작하기
      </StartButton>
    </ProfileInputForm>
  );
}
