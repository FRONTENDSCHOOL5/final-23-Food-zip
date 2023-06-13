import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "../../../components/common/Button/Button";
import { ButtonStyle } from "../../../components/common/Button/Button";
import Form from "../../../components/common/Form";

const Section = styled.section`
  padding-top: 30px;
  width: 390px;
  height: 100dvh;
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
const StyledButton = styled(ButtonStyle)`
  margin: 100px auto 20px auto;
`;
const StyledLink = styled(Link)`
  color: #767676;
  font-size: 12px;
`;
export default function Login() {
  return (
    <Section className="l-wrapper">
      <LoginTitle>로그인</LoginTitle>
      <Form />
      <StyledButton type="submit" className="btn-login" bgColor="inactive">
        로그인
      </StyledButton>

      <StyledLink to="/signup" className="join-email">
        이메일로 회원가입
      </StyledLink>
    </Section>
  );
}
