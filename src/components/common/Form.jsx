import React, { useState } from "react";
import styled from "styled-components";
const StyledForm = styled.form`
  margin-top: 40px;
`;

const StyledInputContainer = styled.div`
  position: relative;
`;

const StyledLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 35px;
  transform: translateY(-50%);
  padding: 0 4px;
  font-size: 16px;
  color: #767676;
  pointer-events: none;
  transition: 0.5s;
  z-index: 1;
`;

const StyledInput = styled.input`
  display: block;
  width: 322px;
  box-sizing: border-box;
  border: none;
  box-shadow: 0 1px 0 0 #677880;
  height: 48px;
  transition: all 0.2s;
  border-radius: 4px 4px 0 0;
  padding: 0 16px;
  font-size: 16px;
  margin: 0 auto 25px auto;
  outline: none;
  background: transparent;
  z-index: -1;

  &:focus ~ ${StyledLabel}, &:valid ~ ${StyledLabel} {
    top: -5px;
    color: #286140;
    font-size: 12px;
  }
`;

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  return (
    <StyledForm>
      <StyledInputContainer>
        <StyledInput
          value={email}
          onChange={handleEmailChange}
          onFocus={handleEmailFocus}
          className="input-style"
          id="user-ID"
          type="email"
          required
        />
        <StyledLabel
          htmlFor="user-ID"
          style={{
            top: email || emailFocused ? "-5px" : "50%",
            fontSize: email || emailFocused ? "12px" : "16px",
          }}
        >
          이메일
        </StyledLabel>
      </StyledInputContainer>

      <StyledInputContainer>
        <StyledInput
          value={password}
          onChange={handlePasswordChange}
          onFocus={handlePasswordFocus}
          className="input-style"
          id="user-PW"
          type="password"
          required
        />
        <StyledLabel
          htmlFor="user-PW"
          style={{
            top: password || passwordFocused ? "-5px" : "50%",
            fontSize: password || passwordFocused ? "12px" : "16px",
          }}
        >
          비밀번호
        </StyledLabel>
      </StyledInputContainer>
    </StyledForm>
  );
}
