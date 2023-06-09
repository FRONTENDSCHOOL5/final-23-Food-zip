import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  StyledButton,
  StyledError,
  StyledForm,
  StyledInput,
  StyledInputContainerDiv,
  StyledLabel,
} from "./LoginFormStyle";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const handleFormSubmit = async formData => {
    try {
      const res = await axios.post(
        "https://api.mandarin.weniv.co.kr/user/login",
        {
          user: {
            email: formData.email,
            password: formData.password,
          },
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        },
      );
      const token = res.data.user["token"];
      const accountname = res.data.user["accountname"];
      const _id = res.data.user["_id"];
      localStorage.setItem("token", token);
      localStorage.setItem("_id", _id);
      localStorage.setItem("accountname", accountname);

      if (res.status === 200) {
        setLoginSuccess(true);
      } else {
        setLoginSuccess(false);
        alert(
          "일시적인 오류로 서비스 접속에 실패했습니다. 잠시 후 다시 시도해 주세요.",
        );
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "이메일 또는 비밀번호가 일치하지 않습니다.";
      alert(errorMessage);
    }
  };
  useEffect(() => {
    if (loginSuccess) {
      navigate("/home");
    }
  }, [loginSuccess, navigate]);

  return (
    <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
      <StyledInputContainerDiv>
        <StyledLabel htmlFor="email">이메일</StyledLabel>
        <StyledInput
          id="email"
          type="text"
          autoComplete="off"
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
            pattern: {
              value:
                // eslint-disable-next-line no-useless-escape
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "유효한 이메일 주소를 입력해주세요.",
            },
          })}
        />
        {errors.email && <StyledError>{errors.email.message}</StyledError>}
      </StyledInputContainerDiv>

      <StyledInputContainerDiv>
        <StyledLabel htmlFor="password">비밀번호</StyledLabel>
        <StyledInput
          id="password"
          type="password"
          autoComplete="off"
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
            minLength: {
              value: 6,
              message: "비밀번호는 최소 6자 이상이어야 합니다.",
            },
          })}
        />
        {errors.password && (
          <StyledError>{errors.password.message}</StyledError>
        )}
      </StyledInputContainerDiv>

      <StyledButton
        type="submit"
        disabled={!isValid}
        bgColor={isValid ? "active" : "inactive"}
      >
        로그인
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
