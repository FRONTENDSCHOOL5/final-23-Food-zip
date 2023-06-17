import React, { useRef, useState } from "react";
import BasicProfileInput from "../../../assets/images/basic-profile-lg.svg";
import ImgButton from "../../../assets/images/upload-file.svg";
import styled from "styled-components";
import { ButtonStyle } from "../../common/Button/Button";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileInputForm = styled.form`
  width: 322px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const ProfileImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin: 30px 0;
  align-self: center;
`;

const ProfileInputImgButton = styled.button`
  position: absolute;
  transform: translate(180px, -110px);
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
  position: relative;
`;

const ProfileFormInput = styled.input`
  width: 100%;
  display: block;
  margin: 10px 0 8px;
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
const StyledError = styled.small`
  font-size: 12px;
  color: red;
  position: absolute;
  bottom: -10px;
`;
const StyledInputContainer = styled.div`
  position: relative;
`;

const StyledLabel = styled.label`
  display: block;
  text-align: left;
  padding: 0 35px;
  font-size: 16px;
  color: #767676;
  pointer-events: none;
`;

const StyledInput = styled.input`
  display: block;
  width: 322px;
  box-sizing: border-box;
  border: none;
  box-shadow: 0 1px 0 0 #677880;
  height: 48px;
  border-radius: 4px 4px 0 0;
  padding: 0 px;
  font-size: 16px;
  margin: 0 auto 36px auto;
  outline: none;
  background: transparent;
`;

export default function ProfileForm() {
  // 프로필 이미지 설정
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgProfile, setImgProfile] = useState(null);
  const [accountName, setAccountName] = useState("");
  const fileInputRef = useRef(null);
  const location = useLocation();
  const data = location.state;
  // console.log(data); // 회원가입 페이지에서 넘겨온 이메일,비밀번호 데이터

  // 이미지 업로드 함수
  const handleImageChange = async event => {
    const formData = new FormData();
    const file = event.target.files[0];
    let imgUrl = "";
    formData.append("image", file);
    const res = await fetch(
      "https://api.mandarin.weniv.co.kr/image/uploadfile",
      {
        method: "POST",
        body: formData,
      },
    );
    const json = await res.json();
    // 화면에 선택한 이미지 파일 보여줌
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    imgUrl = "https://api.mandarin.weniv.co.kr/" + json.filename;
    setImgProfile(imgUrl);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const handleFormSubmit = async formData => {
    const username = formData.username;
    const email = data.email;
    const password = data.password;
    const accountname = formData.accountname;
    const intro = formData.intro;
    const image = imgProfile;
    console.log(intro);
    setAccountName(accountname);
    if (location.pathname === "/signup/profile") {
      try {
        const res = await axios.post(
          "https://api.mandarin.weniv.co.kr/user/",
          {
            user: {
              username: username,
              email: email,
              password: password,
              accountname: accountname,
              intro: intro,
              image: image,
            },
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          },
        );
        console.log(JSON.stringify(res.data));
        // 로그인 페이지로 이동함.
        navigate("/login");
      } catch (err) {
        alert(err.response.data.message);
        console.log(err.response.data.message);
      }
    }
  };
  return (
    <ProfileInputForm onSubmit={handleSubmit(handleFormSubmit)}>
      <label htmlFor="profileImg"></label>
      <ProfileImg src={selectedImage || BasicProfileInput} alt="기본 프로필" />
      <ProfileInput
        id="profileImg"
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <ProfileInputImgButton type="button" onClick={handleButtonClick}>
        <ProfileInputImg src={ImgButton} />
      </ProfileInputImgButton>

      <ProfileFormLabel>
        사용자 이름
        <ProfileFormInput
          id="username"
          type="text"
          placeholder="2~10자 이내여야 합니다."
          {...register("username", {
            required: "사용자 이름은 필수 입력입니다.",
            minLength: {
              value: 2,
              message: "사용자 이름은 최소 2자 이상이어야 합니다.",
            },
            maxLength: {
              value: 10,
              message: "사용자 이름은 최대 10자까지 허용됩니다.",
            },
          })}
        />
        {errors.username && (
          <StyledError role="alert">{errors.username.message}</StyledError>
        )}
      </ProfileFormLabel>

      <ProfileFormLabel>
        계정 ID
        <ProfileFormInput
          id="accountname"
          type="text"
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
          {...register("accountname", {
            required: "계정 ID는 필수 입력입니다.",
            pattern: {
              value: /^[0-9a-zA-Z._]+$/,
              message: "영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.",
            },
          })}
        />
        {errors.accountname && (
          <StyledError role="alert">{errors.accountname.message}</StyledError>
        )}
      </ProfileFormLabel>
      <ProfileFormLabel>
        소개
        <ProfileFormInput
          id="intro"
          type="text"
          placeholder="자신과 선호하는 음식에 대해 소개해주세요!"
          {...register("intro")}
        />
      </ProfileFormLabel>
      {/* 경로에 따른 submit 버튼 활성화 */}
      {location.pathname === "/signup/profile" && (
        <StartButton type="submit" bgColor={isValid ? "active" : "inactive"}>
          FOOD ZIP 시작하기
        </StartButton>
      )}
    </ProfileInputForm>
  );
}
