import React from "react";
import styled, { css } from "styled-components";
import Button from "../../../components/common/Button/Button";
import Form from "../../../components/common/Form";
import SignUpForm from "../../../components/Auth/SignUpForm";
import axios from "axios";
const Section = styled.section`
  padding-top: 30px;
  width: 390px;
  height: 100vh;
  margin: auto;
  text-align: center;
  background: #fff;
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
      <Section className="l-wrapper">
        <SignUpTitle>회원가입</SignUpTitle>
        <SignUpForm />
      </Section>
    </>
  );
}
