import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "../../../components/common/Button/Button";
import Form from "../../../components/common/Form";

const Section = styled.section`
  padding-top: 30px;
  width: 390px;
  height: 100%;
  margin: auto;
  text-align: center;
  background: #fff;
`;
const LoginH1 = css`
  font-size: 24px;
`;
const LoginTitle = styled.h2`
  ${LoginH1}
  color: black;
`;
const StyledButton = styled(Button)`
  margin: 30px auto 20px auto;
`;
// const StyledLink = styled(a)`
//   color: #767676;
//   font-size: 12px;
// `;
export default function Login() {
  return (
    <Section className="l-wrapper">
      <LoginTitle>로그인</LoginTitle>
      <Form />
      <StyledButton
        type="submit"
        className="btn-login"
        bgColor="inactive"
        content="로그인"
      />
      <a href="#" className="join-email">
        이메일로 회원가입
      </a>
    </Section>
  );
}
