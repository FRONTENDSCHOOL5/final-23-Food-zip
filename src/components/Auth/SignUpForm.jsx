import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ButtonStyle } from "../common/Button/Button";
import { useNavigate } from "react-router-dom";
import BasicProfileInput from "../../assets/images/basic-profile-lg.svg";
import ImgButton from "../../assets/images/upload-file.svg";
import axios from "axios";
import { useState, useRef } from "react";
// import Button from "../../../components/common/Button/Button";
// import { ButtonStyle } from "../../../components/common/Button/Button";
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

const StyledForm = styled.form`
  margin-top: 40px;
`;

const StyledButton = styled(ButtonStyle)`
  margin: 100px auto 20px auto;
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

const StyledError = styled.small`
  font-size: 12px;
  color: red;
  position: absolute;
  bottom: -18px;
  left: 35px;
`;

async function checkEmailValid(email) {
  const url = "https://mandarin.api.weniv.co.kr";
  const emailValidReqPath = "/user/emailvalid";
  const reqData = {
    user: {
      email: email,
    },
  };

  try {
    const res = await fetch(url + emailValidReqPath, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(reqData),
    });

    const json = await res.json();
    console.log(json);

    const reqMsg = json.message;
    console.log(reqMsg == "이미 가입된 이메일 주소 입니다.", reqMsg);

    if (reqMsg === "이미 가입된 이메일 주소 입니다.") {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

const Form = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const handleFormSubmit = async formData => {
    try {
      console.log(formData.email, formData.password);
      const res = await axios.post(
        "https://api.mandarin.weniv.co.kr/user/",
        {
          user: {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            accountname: formData.accountname,
            intro: formData.intro,
            image: formData.image,
          },
        },
        {
          "Content-type": "application/json",
        },
      );
      console.log(JSON.stringify(res.data));
      alert(JSON.stringify(res.data));

      // 로그인 페이지로 이동함.
      navigate("/signup");
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response.data.message);
    }
  };

  const handleEmailBlur = async e => {
    const email = e.target.value;
    const isEmailValid = await checkEmailValid(email);

    if (!isEmailValid) {
      // 이메일이 이미 가입된 경우 에러 메시지 표시
      errors.email = {
        message: "이미 가입된 이메일 주소입니다.",
        type: "manual",
      };
    }
  };

  const [imgUrl, setImgUrl] = useState("");
  // const fileInputRef = useRef(null);

  const handleUploadImg = () => {
    if (fileInputRef.current && fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      const fileUrl = URL.createObjectURL(file);
      console.log(fileUrl);

      const reader = new FileReader();

      reader.onload = e => {
        setImgUrl(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // const handleFormSubmit = async formData => {
  //   try {
  //     console.log(formData.email, formData.password);
  //     const res = await axios.post(
  //       "https://api.mandarin.weniv.co.kr/user/",
  //       {
  //         user: {
  //           // username: formData.username,
  //           email: formData.email,
  //           password: formData.password,
  //           // accountname: formData.accountname,
  //           // intro: formData.intro,
  //           // image: formData.image,
  //         },
  //       },
  //       {
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //       },
  //     );
  //     console.log(JSON.stringify(res.data));
  //     alert(JSON.stringify(res.data));

  //     // 로그인 페이지로 이동함.
  //     navigate("/home");
  //   } catch (err) {
  //     const errorMessage =
  //       err.response?.data?.message || "오류가 발생했습니다.";
  //     alert(errorMessage);
  //     console.log(errorMessage);
  //   }
  // };

  return (
    <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
      <StyledInputContainer>
        <StyledLabel htmlFor="email">이메일</StyledLabel>
        <StyledInput
          id="email"
          type="text"
          autoComplete="off"
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
          // onBlur={handleEmailBlur}
        />
        {errors.email && (
          <StyledError role="alert">{errors.email.message}</StyledError>
        )}
      </StyledInputContainer>

      <StyledInputContainer>
        <StyledLabel htmlFor="password">비밀번호</StyledLabel>
        <StyledInput
          id="password"
          type="password"
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
            pattern: {
              value: /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
              message: "비밀번호 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.password && (
          <StyledError role="alert">{errors.password.message}</StyledError>
        )}
      </StyledInputContainer>

      <StyledInputContainer>
        <StyledLabel htmlFor="username">사용자 이름</StyledLabel>
        <StyledInput
          id="username"
          type="text"
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
      </StyledInputContainer>

      <StyledInputContainer>
        <StyledLabel htmlFor="accountname">계정 ID</StyledLabel>
        <StyledInput
          id="accountname"
          type="text"
          {...register("accountname", {
            pattern: {
              value: /^[0-9a-zA-Z._]+$/,
              message: "영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.",
            },
          })}
        />
        {errors.accountname && (
          <StyledError role="alert">{errors.accountname.message}</StyledError>
        )}
      </StyledInputContainer>

      <StyledInputContainer>
        <StyledLabel htmlFor="intro">소개</StyledLabel>
        <StyledInput id="intro" type="text" {...register("intro")} />
      </StyledInputContainer>

      <ProfileImg src={BasicProfileInput} alt="기본 프로필" />
      <ProfileInput
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        ref={fileInputRef}
        // onChange={handleUploadImg}
      />
      <ProfileInputImgButton type="button">
        <ProfileInputImg src={ImgButton} />
      </ProfileInputImgButton>

      <StyledButton
        type="submit"
        className="btn-login"
        bgColor={isValid ? "active" : "inactive"}
        disabled={!isValid}
      >
        다음
      </StyledButton>
    </StyledForm>
  );
};

export default Form;

//회원가입 부분입니다. 코드가 더러우니 잘 나눠서 보셔야 해요 react-hook-form 식으로 변경 부탁드립니다.
