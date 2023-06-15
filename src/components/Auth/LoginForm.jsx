import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ButtonStyle } from "./Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

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

const LoginForm = ({ onSubmit }) => {
  //파일 이름 바꾸면서 버꿨으니 확인하세요
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const handleFormSubmit = async formData => {
    try {
      console.log(formData.email, formData.password);
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
      console.log(res.data, "제이손입니다");
      const token = res.data.user["token"];
      localStorage.setItem("token", token);

      alert(JSON.stringify(res.data));

      if (res.status === 200) {
        setLoginSuccess(true);
        console.log(loginSuccess);
      } else {
        setLoginSuccess(false);
      }
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response?.data?.message || "오류가 발생했습니다.";
      alert(errorMessage);
      console.log(errorMessage);
    }
  };
  useEffect(() => {
    if (loginSuccess) {
      navigate("/home");
    }
  }, [loginSuccess, navigate]);

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
                // eslint-disable-next-line no-useless-escape
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "유효한 이메일 주소를 입력해주세요.",
            },
          })}
        />
        {errors.email && <StyledError>{errors.email.message}</StyledError>}
      </StyledInputContainer>

      <StyledInputContainer>
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
      </StyledInputContainer>

      <StyledButton type="submit" disabled={!isValid}>
        로그인
      </StyledButton>
    </StyledForm>
  );
};

export default Form;
