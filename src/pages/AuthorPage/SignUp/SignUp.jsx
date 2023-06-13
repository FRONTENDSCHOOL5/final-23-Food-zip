import React from "react";
import styled, { css } from "styled-components";
import Button from "../../../components/common/Button/Button";
import Form from "../../../components/common/Form";
import { ButtonStyle } from "../../../components/common/Button/Button";
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
const StyledButton = styled(ButtonStyle)`
  margin: 100px auto 20px auto;
`;
export default function SignUp() {
  return (
    <>
      <Section className="l-wrapper">
        <SignUpTitle>회원가입</SignUpTitle>
        <Form />
        <StyledButton type="submit" className="btn-login" bgColor="inactive">
          다음
        </StyledButton>
      </Section>
    </>
  );
}
