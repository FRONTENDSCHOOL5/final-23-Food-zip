import React from "react";
import styled, { css } from "styled-components";
import SignUpForm from "../../../components/Auth/SignUpForm";

const Section = styled.section`
  padding-top: 30px;
  width: 390px;
  height: 100vh;
  margin: auto;
  text-align: center;
  background: #fff;
  box-sizing: border-box;
`;
const SignUpH2 = css`
  font-size: 24px;
`;
const SignUpTitle = styled.h2`
  ${SignUpH2}
  color: black;
`;

export default function SignUp() {
  return (
    <>
      <h1 className="a11y-hidden">회원가입페이지</h1>
      <Section className="l-wrapper">
        <SignUpTitle>회원가입</SignUpTitle>
        <SignUpForm />
      </Section>
    </>
  );
}
