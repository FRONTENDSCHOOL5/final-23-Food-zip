import React, { useEffect, useRef, useState } from "react";
import BasicProfileInput from "../../../assets/images/basic-profile-lg.svg";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ProfileInputForm,
  ProfileImgDiv,
  ProfileInputImgButton,
  ProfileImg,
  ProfileInput,
  ProfileFormLabel,
  ProfileFormInput,
  StartButton,
  StyledError,
} from "./ProfileFormStyle";
import { imgUpload } from "../../../api/imgUpload";
import { BASE_URL } from "../../../api/baseUrl";
import { accountValid, signup } from "../../../api/auth";
import { profileEdit } from "../../../api/profile";

export default function ProfileForm({ userInfo, setUserInfo }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(null);
  const fileInputRef = useRef(null);
  const data = location.state;
  useEffect(() => {
    if (location.pathname === "/myprofile/edit") {
      setValue("image", userInfo?.image || BasicProfileInput);
      setValue("username", userInfo?.username || null);
      setValue("accountname", userInfo?.accountname || null);
      setValue("intro", userInfo?.intro || null);
    } else if (location.pathname === "/signup/profile") {
      setValue("image", BasicProfileInput);
      setValue("username", null);
      setValue("accountname", null);
      setValue("intro", null);
    }
  }, [location.pathname, userInfo]);

  const handleImageChange = async event => {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("image", file);
    await imgUpload(formData).then(res => {
      const imgUrl = `${BASE_URL}/` + res.data.filename;
      setProfileImg(imgUrl);
    });
  };

  const checkAccountValid = async (newAccountName, currentAccountName) => {
    if (newAccountName === currentAccountName) {
      return true;
    }
    try {
      const res = await accountValid(newAccountName);
      if (res.data.message === "사용 가능한 계정ID 입니다.") {
        return true;
      } else if (res.data.message === "이미 가입된 계정ID 입니다.") {
        return "이미 가입된 계정ID 입니다.";
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async formData => {
    if (location.pathname === "/signup/profile") {
      await signup(formData, data, profileImg).then(navigate("/login"));
    } else if (location.pathname === "/myprofile/edit") {
      try {
        setProfileImg(userInfo?.image || BasicProfileInput);
        const image = profileImg || userInfo?.image;
        const res = await profileEdit(formData, image, token);
        localStorage.setItem("_id", res.data.user._id);
        localStorage.setItem("accountname", formData.accountname);
        navigate("/myprofile");
      } catch (err) {
        console.error("프로필 수정 에러", err);
      }
    }
  };
  return (
    <ProfileInputForm onSubmit={handleSubmit(handleFormSubmit)}>
      <ProfileImgDiv>
        <label>
          <ProfileInput
            id="profileImg"
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </label>

        <ProfileInputImgButton
          type="button"
          onClick={() => fileInputRef.current.click()}
        >
          <ProfileImg
            src={profileImg || userInfo?.image || BasicProfileInput}
            alt="기본 프로필"
          />
        </ProfileInputImgButton>
      </ProfileImgDiv>
      <ProfileFormLabel>
        사용자 이름
        <ProfileFormInput
          id="username"
          type="text"
          defaultValue={userInfo?.username || ""}
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
          defaultValue={userInfo?.accountname || ""}
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
          {...register("accountname", {
            required: "계정 ID는 필수 입력입니다.",
            pattern: {
              value: /^[0-9a-zA-Z._]+$/,
              message: "영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.",
            },
            validate: {
              uniqueAccount: async value => {
                const result = await checkAccountValid(
                  value,
                  userInfo?.accountname,
                );
                return result === true || result;
              },
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
          defaultValue={userInfo?.intro || ""}
          type="text"
          placeholder="자신과 선호하는 음식에 대해 소개해주세요!"
          {...register("intro")}
        />
      </ProfileFormLabel>

      {location.pathname === "/signup/profile" ? (
        <StartButton type="submit" bgColor={isValid ? "active" : "inactive"}>
          FOOD ZIP 시작하기
        </StartButton>
      ) : (
        <StartButton type="submit" bgColor={isValid ? "active" : "inactive"}>
          변경사항 저장하기
        </StartButton>
      )}
    </ProfileInputForm>
  );
}
