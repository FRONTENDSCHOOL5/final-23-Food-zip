import React from "react";
import styled from "styled-components";
import FullLogo from "../../assets/images/full-logo.svg";

const SplashWrapDiv = styled.div`
  width: 390px;
  height: 820px;
  background-color: white;
  padding-top: 256px;
  box-sizing: border-box;
`;

const SplashImg = styled.img`
  display: block;
  margin: 0 auto;
`;

export default function Splash() {
  return (
    <SplashWrapDiv>
      <SplashImg src={FullLogo} alt="" />
    </SplashWrapDiv>
  );
}
