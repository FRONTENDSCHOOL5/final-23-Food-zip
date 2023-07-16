import React, { useEffect, useState } from "react";
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
} from "./SignUpFormStyle";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: null,
      password: null,
      passwordConfirm: null,
    },
  });

  const navigate = useNavigate();
  const [abledBtn, setAbledBtn] = useState(true);

  const handleFormSubmit = async data => {
    const isValidEmail = await checkEmailValid(data.email);
    if (isValidEmail) {
      navigate("/signup/profile", {
        state: {
          email: data.email,
          password: data.password,
        },
      });
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
      console.log("이메일", res);
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
    setAbledBtn(isValid);
  }, [isValid, setAbledBtn]);

  return (
    <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
      <StyledInputContainerDiv>
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
        />
        {errors.email && (
          <StyledError role="alert">{errors.email.message}</StyledError>
        )}
      </StyledInputContainerDiv>

      <StyledInputContainerDiv>
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
      </StyledInputContainerDiv>
      <StyledInputContainerDiv>
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
      </StyledInputContainerDiv>

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
