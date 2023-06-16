import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ButtonStyle } from "../common/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useRef, useCallback } from "react";
import debounce from "lodash/debounce";
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

const SignUpForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const onValid = data => console.log(data, "onvalid");
  const onInvalid = data => console.log(data, "onInvalid");

  const navigate = useNavigate();
  const [abledBtn, setAbledBtn] = useState(false);
  const checkEmailValid = async formData => {
    // formData.preventDefault();
    try {
      const res = await axios.post(
        "https://api.mandarin.weniv.co.kr/user/emailvalid",
        {
          user: {
            email: formData,
          },
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        },
      );
      // const json = await res.json();
      console.log(res);

      const reqMsg = res.data.message;
      console.log(reqMsg === "이미 가입된 이메일 주소 입니다.", reqMsg);

      if (reqMsg === "이미 가입된 이메일 주소 입니다.") {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const handleEmailBlur = useCallback(
    debounce(async e => {
      e.preventDefault();
      const email = e.target.value;
      const isEmailValid = await checkEmailValid(email);
      console.log(isEmailValid);
      if (!isEmailValid) {
        // 이메일이 이미 가입된 경우 에러 메시지 표시
        setError("email", {
          type: "manual",
          message: "이미 가입된 이메일 주소입니다.",
        });
      } else {
        clearErrors("email"); // 이메일이 유효한 경우 에러 메시지 제거
      }
      console.log("1 : " + isValid, isEmailValid);
      if (isValid && isEmailValid) {
        console.log("2 : " + isValid, isEmailValid);
        setAbledBtn(true);
      } else {
        console.log("3 : " + isValid, isEmailValid);
        setAbledBtn(false);
      }
      console.log("btn:" + abledBtn);
    }, 1000), // debounce 함수의 시간을 1000ms로 설정
    [setAbledBtn, checkEmailValid, setError, clearErrors],
  );
  const handleFormSubmit = data => {
    navigate("/signup/profile", {
      state: { email: data.email, password: data.password },
    });
  };
  return (
    <StyledForm onSubmit={handleSubmit(handleFormSubmit, onValid, onInvalid)}>
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
          onChange={handleEmailBlur}
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

      <StyledButton
        type="submit"
        className="btn-login"
        bgColor={abledBtn ? "active" : "inactive"}
        disabled={!abledBtn}
        // onClick={handleBtn}
      >
        다음
      </StyledButton>
    </StyledForm>
  );
};

export default SignUpForm;
