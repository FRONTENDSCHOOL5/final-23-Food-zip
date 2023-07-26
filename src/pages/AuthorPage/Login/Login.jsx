import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import LoginForm from "../../../components/Auth/LoginForm";

const Section = styled.section`
  padding-top: 30px;
  width: 390px;
  height: calc(100vh - 30px);
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

const StyledLink = styled(Link)`
  color: #767676;
  font-size: 12px;
`;
export default function Login() {
  return (
    <>
      <h1 className="a11y-hidden">로그인페이지</h1>
      <Section>
        <LoginTitle>로그인</LoginTitle>
        <LoginForm />
        <StyledLink to="/signup">이메일로 회원가입</StyledLink>
      </Section>
    </>
  );
}
