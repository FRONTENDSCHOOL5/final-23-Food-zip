import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ButtonStyle } from "../common/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
const StyledForm = styled.form`
  margin-top: 40px;
  height: 100%;
`;
const StyledButton = styled(ButtonStyle)`
  margin: 50px auto 20px;
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
  height: 46px;
  border-radius: 4px 4px 0 0;
  padding-top: 8px;
  font-size: 14px;
  margin: 0 auto 36px auto;
  outline: none;
  background: transparent;
  &::placeholder {
    color: #dbdbdb;
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid #286140;
  }
`;
const StyledInputContainer = styled.div`
  position: relative;
`;
const StyledError = styled.small`
  font-size: 12px;
  color: red;
  position: absolute;
  bottom: -18px;
  left: 35px;
`;

const SignUpForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    getValues,
    formState: { errors, isValid }, // Added isValid from formState
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: null,
      password: null,
      passwordConfirm: null,
    },
  });
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const navigate = useNavigate();
  const [abledBtn, setAbledBtn] = useState(true);

  const handleFormSubmit = async data => {
    const isValidEmail = await checkEmailValid(data.email);
    console.log("check", isValidEmail);
    if (isValidEmail) {
      navigate("/signup/profile", {
        state: {
          email: data.email,
          password: data.password,
        },
      });
    } else {
      // Handle invalid email case
      console.log("Invalid email");
    }
  };

  const checkEmailValid = async email => {
    try {
      const res = await axios.post(
        "https://api.mandarin.weniv.co.kr/user/emailvalid",
        {
          user: {
            email: email,
          },
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        },
      );
      const reqMsg = res.data.message;
      console.log(reqMsg === "이미 가입된 이메일 주소 입니다.");
      clearErrors("email");
      if (reqMsg === "이미 가입된 이메일 주소 입니다.") {
        setError("email", {
          type: "manual",
          message: "이미 가입된 이메일 주소 입니다.",
        });
        return false;
      } else {
        clearErrors("email");
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    // Check if form is valid and set abledBtn state accordingly
    setAbledBtn(isValid);
  }, [isValid, setAbledBtn]);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
      <StyledInputContainer>
        <StyledLabel htmlFor="email">이메일</StyledLabel>
        <StyledInput
          id="email"
          type="text"
          autoComplete="off"
          placeholder="이메일을 입력하세요"
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "유효한 이메일 주소를 입력하세요.",
            },
          })}
          // onChange={handleEmailChange}
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
          placeholder="비밀번호를 입력하세요"
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
        <StyledLabel htmlFor="passwordConfirm">비밀번호 확인</StyledLabel>
        <StyledInput
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호를 한 번 더 입력하세요"
          {...register("passwordConfirm", {
            required: "비밀번호 확인은 필수 입력입니다.",
            validate: {
              matchesPreviousPassword: value => {
                const { password } = getValues();
                return password === value || "비밀번호가 일치하지 않습니다.";
              },
            },
          })}
        />
        {errors.passwordConfirm && (
          <StyledError role="alert">
            {errors.passwordConfirm.message}
          </StyledError>
        )}
      </StyledInputContainer>

      <StyledButton
        type="submit"
        className="btn-login"
        bgColor={abledBtn ? "active" : "inactive"}
        disabled={!abledBtn}
      >
        다음
      </StyledButton>
    </StyledForm>
  );
};

export default SignUpForm;
