import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import FullLogo from "../../assets/images/full-logo.svg";

const bounceAnimation = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, -1em, 0);
  }
`;

const BounceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15%;
  color: #286140;
  white-space: nowrap;
`;

const BounceLetter = styled.span`
  animation: ${bounceAnimation} 0.75s cubic-bezier(0.05, 0, 0.2, 1) infinite
    alternate;
  display: inline-block;
  transform: translate3d(0, 0, 0);
  margin-top: 0.5em;
  font-size: 1.5em;
  font-weight: 600;
  margin-left: 3px;
  &:nth-of-type(1) {
    animation-delay: -0.083333333s;
  }
  &:nth-of-type(3) {
    animation-delay: 0.0833333333s;
  }
  &:nth-of-type(4) {
    animation-delay: 0.1666666667s;
  }
  &:nth-of-type(5) {
    animation-delay: 0.25s;
  }
  &:nth-of-type(6) {
    animation-delay: 0.3333333333s;
  }
  &:nth-of-type(7) {
    animation-delay: 0.4166666667s;
  }
`;

const SplashWrapDiv = styled.div`
  width: 390px;
  height: 100vh;
  background-color: white;
  padding-top: ${props => props.paddingTop};
  box-sizing: border-box;
`;

const SplashImg = styled.img`
  display: block;
  margin: 0 auto;
  width: 140px;
`;

export default function Splash() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          navigate("/home");
        }, 500);
      }, 3000);
    } else {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          navigate("/welcome");
        }, 500);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [navigate, token]);

  const [paddingTop, setPaddingTop] = useState("65%");

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const dynamicPaddingTop = `${windowHeight * 0.3}px`;
      setPaddingTop(dynamicPaddingTop);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <SplashWrapDiv paddingTop={paddingTop} fadeOut={fadeOut}>
      <SplashImg src={FullLogo} alt="" />
      <BounceContainer>
        <BounceLetter>F</BounceLetter>
        <BounceLetter>O</BounceLetter>
        <BounceLetter>O</BounceLetter>
        <BounceLetter>D</BounceLetter>
        <BounceLetter>Z</BounceLetter>
        <BounceLetter>I</BounceLetter>
        <BounceLetter>P</BounceLetter>
      </BounceContainer>
    </SplashWrapDiv>
  );
}
